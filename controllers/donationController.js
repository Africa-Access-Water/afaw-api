/**
 * ============================================================================
 * DONATION CONTROLLER
 * ============================================================================
 * 
 * Handles all donation-related operations including:
 * - One-time donations via Stripe Checkout
 * - Recurring subscriptions (daily, weekly, monthly, yearly)
 * - Stripe webhook events (payment success, failure, subscription changes)
 * - Email notifications to donors and admins
 * - PDF receipt generation
 * - Project donation total tracking
 * 
 * @module controllers/donationController
 */

// ============================================================================
// DEPENDENCIES
// ============================================================================

const Donor = require("../models/donorModel");
const Donation = require("../models/donationModel");
const Subscription = require("../models/subscriptionModel");
const Project = require("../models/projectModel");
const config = require('../config/config');
const stripe = require("stripe")(config.stripe.secretKey);
const { sendMail } = require("../services/mailService");
const {
  donorDonationConfirmationEmail,
  adminDonationNotificationEmail,
  subscriptionAmountUpdatedEmail,
  adminSubscriptionAmountUpdatedEmail,
  subscriptionCancelledEmail,
  adminSubscriptionCancelledEmail,
} = require("../utils/emailTemplates");
const { generateDonationReceiptPDFBuffer } = require("./pdfController");
const knex = require("../config/db");

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Handle successful donation/subscription payment
 * Called after payment is completed in Stripe
 * Sends confirmation emails and PDF receipts to donors and admins
 * 
 * @param {Object} session - Stripe session or mock session object
 * @param {string} session.id - Session ID (starts with "recurring-" for recurring payments)
 * @param {Object} session.customer_details - Customer information
 * @param {number} session.amount_total - Amount in cents
 * @param {string} session.currency - Currency code (e.g., 'usd')
 * @param {Object} session.metadata - Additional metadata (projectId, donationId)
 */
async function handleDonationSuccess(session) {
  try {
    const donorEmail = session.customer_details?.email;
    const donorName = session.customer_details?.name || "Donor";
    const donationId = session.metadata?.donationId;
    const amount = (session.amount_total / 100).toFixed(2);
    const currency = session.currency.toUpperCase();
    const projectId = session.metadata?.projectId;

    console.log("🔔 Donation Session Received:", {
      sessionId: session.id,
      donorEmail,
      donorName,
      donationId,
      amount,
      currency,
      projectId,
    });

    // Determine if this is a recurring donation (session ID starts with "recurring-")
    const isRecurring = session.id.startsWith("recurring-");
    
    // Update donation status in database (one-time donations only)
    // Recurring donations are already created with status='completed'
    if (!isRecurring) {
      await Donation.updateBySessionId(session.id, {
        status: "completed",
        stripe_payment_intent: session.payment_intent,
      });
    }

    // Update project donation totals (one-time donations only)
    // Recurring donations update project totals in their respective webhook handlers
    let project = null;
    if (projectId && !isRecurring) {
      project = await Project.addDonation(projectId, amount);
      console.log("📌 Project updated:", project);
    } else if (projectId) {
      project = await Project.findById(projectId);
    }

     // Send confirmation email to donor with PDF receipt
     if (donorEmail) {
       console.log(`📧 Sending confirmation email to donor: ${donorEmail}`);

       // Prepare donation data for PDF receipt generation
       const donationData = {
         id: donationId,
         name: donorName,
         email: donorEmail,
         amount: parseFloat(amount),
         method: "stripe",
         transaction_id: session.payment_intent,
         created_at: new Date().toISOString(),
         message: project ? `Donation for ${project.name}` : "General donation"
       };

       // Generate PDF receipt (returns null if generation fails - non-blocking)
       const pdfBuffer = await generateDonationReceiptPDFBuffer(donationData);
       if (pdfBuffer) {
         console.log("✅ PDF receipt generated successfully");
       }

       // Prepare email with HTML content and optional PDF attachment
       const emailOptions = {
         from: `"Africa Access Water" <${config.email.user}>`,
         to: donorEmail,
         subject: `Thank you for your donation of ${currency} ${amount}`,
         html: donorDonationConfirmationEmail(
           donorName,
           amount,
           currency,
           project ? project.name : "our mission"
         )
       };

       // Attach PDF receipt if successfully generated
       if (pdfBuffer) {
         emailOptions.attachments = [
           {
             filename: `Donation-Receipt-${donationData.id}.pdf`,
             content: pdfBuffer,
             contentType: 'application/pdf'
           }
         ];
       }

       await sendMail(emailOptions);
     } else {
       console.warn("⚠️ No donor email found in session");
     }

    // Send notification to admins
    console.log("📧 Sending admin notification to:", config.adminEmails);
    const projectName = project ? project.name : "our mission";
    await sendMail({
      from: `"Africa Access Water" <${config.email.user}>`,
      to: config.adminEmails,
      subject: `New Donation Received: ${currency} ${amount}`,
      html: adminDonationNotificationEmail(
        donorName,
        donorEmail,
        amount,
        currency,
        projectName
      ),
    });

    console.log("✅ Donation success handled:", session.id);
  } catch (err) {
    console.error("❌ Error in handleDonationSuccess:", err);
  }
}

// ============================================================================
// EXPORTED CONTROLLER FUNCTIONS
// ============================================================================

/**
 * Create Stripe Checkout Session
 * Handles both one-time donations and recurring subscriptions
 * 
 * @route POST /api/donations/create-checkout-session
 * @access Public
 * 
 * @param {Object} req.body
 * @param {string} req.body.name - Donor name
 * @param {string} req.body.email - Donor email
 * @param {number} req.body.project_id - Project ID to donate to
 * @param {number} req.body.amount - Donation amount in dollars
 * @param {string} req.body.currency - Currency code (e.g., 'usd')
 * @param {boolean} req.body.recurring - Whether this is a recurring donation
 * @param {string} req.body.interval - Frequency (day, week, month, year) - required if recurring
 * 
 * @returns {Object} { url: string } - Stripe checkout session URL
 */
exports.createCheckoutSession = async (req, res) => {
  try {
    const { name, email, project_id, amount, currency, interval, recurring } = req.body;

    // Step 1: Find or create donor in database
    let donor = await Donor.findByEmail(email);
    let donorId;

    if (!donor) {
      donorId = await Donor.create({ name, email });
      donor = { id: donorId, name, email };
    } else {
      donorId = donor.id;
    }

    // Step 2: Create or retrieve Stripe customer
    let customer;
    if (!donor.stripe_customer_id) {
      // Create new Stripe customer if donor doesn't have one
      customer = await stripe.customers.create({
        name: donor.name,
        email: donor.email,
      });
      // Store Stripe customer ID in our database
      await Donor.updateStripeCustomerId(donorId, customer.id);
    } else {
      // Retrieve existing Stripe customer
      customer = await stripe.customers.retrieve(donor.stripe_customer_id);
    }

    // Step 3: Create initial database record (status = 'initiated')
    // This tracks the donation/subscription before payment is completed
    let donationId;

    if (recurring) {
      // Create subscription record for recurring donations
      donationId = await Subscription.create({
        donor_id: donorId,
        project_id,
        amount,
        currency,
        interval,
        status: "initiated",
      });
    } else {
      // Create donation record for one-time donations
      donationId = await Donation.create({
        donor_id: donorId,
        project_id,
        amount,
        currency,
        status: "initiated",
      });
    }

    // Step 4: Configure Stripe Checkout session
    const sessionConfig = {
      customer: customer.id,
      payment_method_types: ["card"],
      mode: recurring ? "subscription" : "payment", // subscription mode creates recurring payments
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: recurring ? "Recurring Donation" : "One-Time Donation",
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents
            recurring: recurring ? { interval } : undefined, // e.g., { interval: 'month' }
          },
          quantity: 1,
        },
      ],
      metadata: {
        projectId: project_id,
        donationId: donationId,
        donorId: donorId
      },
      success_url: `${config.clientUrl}/donation/success?session_id={CHECKOUT_SESSION_ID}&project_id=${project_id}`,
      cancel_url: `${config.clientUrl}/donation/failure`,
    };

    // IMPORTANT: payment_intent_data is only for one-time payments
    // Adding it to subscriptions will cause an error
    if (!recurring) {
      sessionConfig.payment_intent_data = {
        metadata: {
          donationId,
          projectId: project_id,
          donorId
        },
      };
    }

    // Step 5: Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

     // Step 6: Update database record with Stripe session ID
     // This links our database record to the Stripe session
     if (recurring) {
      await Subscription.updateById(donationId, {
        stripe_checkout_session_id: session.id,
      });
    } else {
      await Donation.updateById(donationId, {
        stripe_checkout_session_id: session.id,
      });
    }

    // Step 7: Return checkout URL to frontend
    return res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create Recurring Subscription (Shortcut)
 * Convenience endpoint that wraps createCheckoutSession with recurring=true
 * 
 * @route POST /api/donations/create-subscription
 * @access Public
 * 
 * @param {Object} req.body - Same as createCheckoutSession
 * @returns {Object} { url: string } - Stripe checkout session URL
 */
exports.createSubscription = async (req, res) => {
  req.body.recurring = true;
  req.body.interval = req.body.interval || "month"; // Default to monthly
  console.log("Creating subscription with body:", req.body);
  return exports.createCheckoutSession(req, res);
};

// ============================================================================
// STRIPE WEBHOOK HANDLER
// ============================================================================

/**
 * Stripe Webhook Handler
 * Processes all Stripe webhook events for donations and subscriptions
 * 
 * @route POST /api/donations/stripe/webhook
 * @access Stripe only (verified via signature)
 * 
 * Webhook Events Handled:
 * - checkout.session.completed: Payment/subscription created successfully
 * - checkout.session.expired: User abandoned checkout
 * - payment_intent.payment_failed: One-time payment failed
 * - invoice.payment_succeeded: Recurring payment succeeded
 * - invoice.payment_failed: Recurring payment failed (with retry logic)
 * - customer.subscription.updated: Subscription amount or status changed
 * - customer.subscription.deleted: Subscription was cancelled
 * 
 * @important Webhook signature is verified to prevent unauthorized requests
 */
exports.stripeWebhookHandler = async (req, res) => {
  // Step 1: Verify webhook signature to ensure request is from Stripe
  const sig = req.headers["stripe-signature"];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe.webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Step 2: Process webhook event based on type
  try {
    switch (event.type) {
      // ----------------------------------------------------------------
      // EVENT: checkout.session.completed
      // Triggered when user successfully completes payment/subscription
      // ----------------------------------------------------------------
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log(`📥 checkout.session.completed - Mode: ${session.mode}, Session ID: ${session.id}`);

        try {
          // Handle subscription creation (recurring donations)
          if (session.mode === "subscription") {
            // Retrieve full subscription details from Stripe
            const stripeSubscription = await stripe.subscriptions.retrieve(
              session.subscription
            );
            
            // Extract next billing date from subscription
            // (stored as Unix timestamp, needs conversion)
            const currentPeriodEnd = stripeSubscription.current_period_end || 
                                    stripeSubscription.items?.data?.[0]?.current_period_end;
            
            console.log(`📊 Subscription data - current_period_end: ${currentPeriodEnd}, status: ${stripeSubscription.status}`);
            
            // Validate that billing date exists (critical for recurring payments)
            if (!currentPeriodEnd) {
              console.error(`❌ No current_period_end found in subscription: ${JSON.stringify(stripeSubscription)}`);
              throw new Error("Subscription missing current_period_end");
            }
            
            // Convert Unix timestamp to JavaScript Date object
            const nextBillingDate = new Date(currentPeriodEnd * 1000);
            
            console.log(`📅 Next billing date calculated: ${nextBillingDate.toISOString()}`);
            
            // Update subscription record in database with Stripe details
            const updatedSubscription = await Subscription.updateBySessionId(session.id, {
              stripe_subscription_id: stripeSubscription.id,
              status: "active",
              next_billing_date: nextBillingDate
            });
            
            console.log(`📝 Update result: ${updatedSubscription ? 1 : 0} row(s) updated`);
            
            if (!updatedSubscription) {
              console.error(`❌ Failed to find subscription with session ID: ${session.id}`);
            } else {
              console.log(`✅ Subscription activated with next billing date: ${nextBillingDate.toISOString()}`);
              
              // IMPORTANT: Create first donation record for initial subscription payment
              // This handles the first payment, subsequent payments handled by invoice.payment_succeeded
              const subscription = await Subscription.findBySessionId(session.id);
              if (subscription) {
                console.log(`💰 Creating first donation record for subscription #${subscription.id}`);
                
                // Prepare donation data for first payment
                const donationData = {
                  donor_id: subscription.donor_id,
                  amount: subscription.amount,
                  currency: subscription.currency,
                  status: "completed",
                  interval: subscription.interval,
                  stripe_subscription_id: stripeSubscription.id,
                  project_id: subscription.project_id
                };
                
                // Create donation record in database
                const donationId = await Donation.create(donationData);
                console.log(`✅ Created first donation record #${donationId}`);
                
                // Update project total with first payment amount
                // This ensures project funding totals are accurate from first payment
                if (subscription.project_id) {
                  await Project.addDonation(subscription.project_id, parseFloat(subscription.amount));
                  console.log(`📌 Project total updated: +$${subscription.amount}`);
                }
                
                // Send confirmation email with PDF receipt for first payment
                // We create a mock session object to match the handleDonationSuccess interface
                const mockSession = {
                  id: `recurring-${donationId}`, // Prefix identifies this as recurring
                  customer_details: {
                    email: subscription.donor_email,
                    name: subscription.donor_name
                  },
                  amount_total: Math.round(parseFloat(subscription.amount) * 100), // Convert to cents
                  currency: subscription.currency,
                  payment_intent: session.payment_intent || `sub_${stripeSubscription.id}`,
                  metadata: {
                    projectId: subscription.project_id,
                    donationId: donationId
                  }
                };
                
                await handleDonationSuccess(mockSession);
                console.log(`✅ First payment confirmation email sent`);
              }
            }
          } 
          // Handle one-time payment completion
          else if (session.mode === "payment") {
            // Update donation status and link payment intent
            await Donation.updateBySessionId(session.id, {
              stripe_payment_intent: session.payment_intent,
              status: "completed",
            });
            console.log("Donation Success");
            
            // Send confirmation email with PDF receipt
            await handleDonationSuccess(session);
          }
        } catch (error) {
          console.error(`❌ Error in checkout.session.completed: ${error.message}`);
          console.error(error.stack);
          throw error;
        }
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: checkout.session.expired
      // Triggered when user abandons checkout without completing payment
      // ----------------------------------------------------------------
      case "checkout.session.expired": {
        const session = event.data.object;
        try {
          // Mark both donation and subscription records as expired
          await Donation.updateBySessionId(session.id, { status: "expired" });
          await Subscription.updateBySessionId(session.id, { status: "expired" });
          console.log(`⏰ Session ${session.id} expired automatically`);
        } catch (error) {
          console.error(`Failed to expire session ${session.id}:`, error);
        }
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: payment_intent.payment_failed
      // Triggered when a one-time payment fails
      // ----------------------------------------------------------------
      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        const donationId = intent.metadata.donationId;
        console.log(`🔄 Payment intent failed for donation: ${JSON.stringify(intent, null, 2)}`);
        if (donationId) {
          await Donation.updateById(donationId, { status: "failed" });
        }
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: invoice.payment_succeeded
      // Triggered when recurring subscription payment succeeds
      // IMPORTANT: Skips first invoice to avoid duplicates (handled by checkout.session.completed)
      // ----------------------------------------------------------------
      case "invoice.payment_succeeded": {
        let invoice = event.data.object;
        
        console.log(`📥 invoice.payment_succeeded - Invoice: ${invoice.id}`);
        
        // Extract subscription ID from invoice (can be in multiple places)
        let subscriptionId = typeof invoice.subscription === 'string' 
          ? invoice.subscription 
          : invoice.subscription?.id;
        
        // Fallback 1: Check line items for subscription ID
        if (!subscriptionId && invoice.lines?.data?.[0]?.subscription) {
          const lineSub = invoice.lines.data[0].subscription;
          subscriptionId = typeof lineSub === 'string' ? lineSub : lineSub?.id;
        }
        
        // Fallback 2: Look up subscription by customer ID if not found above
        if (!subscriptionId && invoice.billing_reason && invoice.billing_reason.includes('subscription') && invoice.customer) {
          try {
            const donor = await Donor.findByStripeCustomerId(invoice.customer);
            if (donor) {
              const subscription = await Subscription.findActiveByDonorId(donor.id);
              if (subscription) {
                subscriptionId = subscription.stripe_subscription_id;
              }
            }
          } catch (err) {
            console.error(`❌ Failed to look up subscription by customer:`, err);
          }
        }
        
        // Skip if no subscription ID found (one-time payments don't have subscriptions)
        if (!subscriptionId) {
          console.log(`ℹ️  Skipping - This is a one-time payment, not a subscription`);
          break;
        }
        
        // CRITICAL: Skip first invoice to prevent duplicate donation entries
        // First payment is already handled by checkout.session.completed event
        if (invoice.billing_reason === 'subscription_create') {
          console.log(`ℹ️  Skipping first invoice - already handled by checkout.session.completed`);
          break;
        }
        
        try {
          // Look up subscription in database using Stripe subscription ID
          const subscription = await Subscription.findByStripeId(subscriptionId);
          if (!subscription) {
            console.error(`❌ Subscription not found: ${subscriptionId}`);
            break;
          }
          
          // Create new donation record for this recurring payment
          const donationData = {
            donor_id: subscription.donor_id,
            amount: (invoice.amount_paid / 100).toFixed(2), // Convert cents to dollars
            currency: invoice.currency,
            status: "completed",
            interval: subscription.interval,
            stripe_payment_intent: invoice.payment_intent,
            stripe_subscription_id: subscriptionId,
            project_id: subscription.project_id
          };
          
          const donationId = await Donation.create(donationData);
          console.log(`✅ Recurring payment: $${donationData.amount} - Donation #${donationId}`);
          
          // Update project funding total with new payment
          if (subscription.project_id) {
            await Project.addDonation(subscription.project_id, parseFloat(donationData.amount));
          }
          
          // Update subscription with next billing date and ensure active status
          const nextBillingDate = new Date(invoice.lines.data[0].period.end * 1000);
          await Subscription.updateById(subscription.id, { 
            status: "active",
            next_billing_date: nextBillingDate
          });
          
          // Send confirmation email with PDF receipt
          const mockSession = {
            id: `recurring-${donationId}`, // Prefix identifies this as recurring
            customer_details: {
              email: subscription.donor_email,
              name: subscription.donor_name
            },
            amount_total: invoice.amount_paid, // Already in cents from Stripe
            currency: invoice.currency,
            payment_intent: invoice.payment_intent,
            metadata: {
              projectId: subscription.project_id,
              donationId: donationId
            }
          };
          
          await handleDonationSuccess(mockSession);
        } catch (error) {
          console.error(`❌ Error in invoice.payment_succeeded: ${error.message}`);
          console.error(error.stack);
          throw error;
        }
        
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: invoice.payment_failed
      // Triggered when recurring subscription payment fails
      // Implements retry logic and auto-cancellation after 5 attempts
      // ----------------------------------------------------------------
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log(`❌ Recurring payment failed for subscription: ${invoice.subscription}`);
        
        // Look up subscription in database
        const subscription = await Subscription.findByStripeId(invoice.subscription);
        if (!subscription) {
          console.error(`❌ Subscription not found: ${invoice.subscription}`);
          break;
        }
        
        // Mark subscription as past_due (Stripe will retry automatically)
        await Subscription.updateById(subscription.id, { status: "past_due" });
        console.log(`⚠️ Updated subscription ${subscription.id} status to past_due`);
        
        // Track attempt count for retry logic
        const attemptCount = invoice.attempt_count || 1;
        const isRetry = attemptCount > 1;
        
        // Auto-cancel subscription after 5 failed payment attempts
        if (attemptCount >= 5) {
          console.log(`🚫 Auto-canceling subscription after ${attemptCount} failed attempts`);
          
          // Cancel subscription in Stripe
          await stripe.subscriptions.cancel(invoice.subscription);
          
          // Update subscription status in database
          await Subscription.updateById(subscription.id, { status: "canceled" });
          
          // Notify donor about cancellation due to repeated payment failures
          if (subscription.donor_email) {
            console.log(`📧 Sending subscription cancellation notification to: ${subscription.donor_email}`);
            
            const cancellationEmailOptions = {
              from: `"Africa Access Water" <${config.email.user}>`,
              to: subscription.donor_email,
              subject: "Subscription Cancelled - Payment Failed",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #e74c3c;">Subscription Cancelled</h2>
                  <p>Dear ${subscription.donor_name || 'Valued Donor'},</p>
                  <p>We're writing to inform you that your recurring donation subscription has been cancelled due to repeated payment failures.</p>
                  <p><strong>What happened?</strong></p>
                  <p>After 5 failed attempts to process your payment of <strong>${invoice.currency.toUpperCase()} ${(invoice.amount_due / 100).toFixed(2)}</strong>, we've automatically cancelled your subscription to prevent further failed charges.</p>
                  <p><strong>What you can do:</strong></p>
                  <ul>
                    <li>Update your payment method and create a new subscription</li>
                    <li>Contact us if you believe this was an error</li>
                    <li>Make a one-time donation instead</li>
                  </ul>
                  <p>We truly appreciate your support and hope you'll consider resubscribing once your payment method is updated.</p>
                  <p>Thank you for your understanding!</p>
                  <p>Best regards,<br>Africa Access Water Team</p>
                </div>
              `
            };
            
            await sendMail(cancellationEmailOptions);
            console.log(`✅ Subscription cancellation notification sent to ${subscription.donor_email}`);
          }
        }
        
        // Send payment failure notification to donor (only if not cancelled yet)
        if (subscription.donor_email && attemptCount < 5) {
          console.log(`📧 Sending payment failure notification to: ${subscription.donor_email} (attempt ${attemptCount})`);
          
          // Customize subject line based on retry attempt
          const subject = isRetry 
            ? `Payment Still Failed - Attempt ${attemptCount}`
            : "Payment Failed - Action Required";
          
          // Provide retry information to donor
          const retryInfo = isRetry 
            ? `<p><strong>This was attempt #${attemptCount}</strong> - Stripe will continue retrying automatically.</p>`
            : `<p>Stripe will automatically retry this payment in a few days.</p>`;
          
          const emailOptions = {
            from: `"Africa Access Water" <${config.email.user}>`,
            to: subscription.donor_email,
            subject: subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #e74c3c;">Payment Failed</h2>
                <p>Dear ${subscription.donor_name || 'Valued Donor'},</p>
                <p>We encountered an issue processing your recurring donation of <strong>${invoice.currency.toUpperCase()} ${(invoice.amount_due / 100).toFixed(2)}</strong>.</p>
                ${retryInfo}
                <p><strong>What happened?</strong></p>
                <ul>
                  <li>Your payment method may have expired</li>
                  <li>Insufficient funds in your account</li>
                  <li>Your bank may have declined the transaction</li>
                </ul>
                <p><strong>What you can do:</strong></p>
                <ul>
                  <li>Update your payment method in your account</li>
                  <li>Ensure sufficient funds are available</li>
                  <li>Contact your bank if the issue persists</li>
                </ul>
                <p>If you continue to experience issues, please contact us.</p>
                <p>Thank you for your continued support!</p>
                <p>Best regards,<br>Africa Access Water Team</p>
              </div>
            `
          };
          
          await sendMail(emailOptions);
          console.log(`✅ Payment failure notification sent to ${subscription.donor_email}`);
        }
        
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: customer.subscription.updated
      // Triggered when subscription details change (amount, status, etc.)
      // ----------------------------------------------------------------
      case "customer.subscription.updated": {
        const stripeSubscription = event.data.object;
        
        try {
          // Look up subscription in database
          const subscription = await Subscription.findByStripeId(stripeSubscription.id);
          if (!subscription) {
            console.error(`❌ Subscription not found: ${stripeSubscription.id}`);
            break;
          }
          
          // Extract new amount from Stripe subscription object
          // Amount is nested in items.data[0].price.unit_amount
          const newAmount = stripeSubscription.items?.data?.[0]?.price?.unit_amount;
          if (!newAmount) {
            console.error(`❌ Could not extract amount from subscription update`);
            break;
          }
          
          // Convert amounts for comparison (cents to dollars)
          const newAmountDecimal = (newAmount / 100).toFixed(2);
          const oldAmount = parseFloat(subscription.amount).toFixed(2);
          
          // Skip if amount hasn't changed (could be status-only update)
          if (newAmountDecimal === oldAmount) {
            break;
          }
          
          // Update subscription in database with new amount and status
          await Subscription.updateById(subscription.id, { 
            amount: newAmountDecimal,
            status: stripeSubscription.status
          });
          console.log(`✅ Subscription amount updated: $${oldAmount} → $${newAmountDecimal}`);
          
          // Notify donor about subscription amount change
          if (subscription.donor_email) {
            const emailOptions = {
              from: `"Africa Access Water" <${config.email.user}>`,
              to: subscription.donor_email,
              subject: "Your Recurring Donation Amount Has Been Updated",
              html: subscriptionAmountUpdatedEmail(
                subscription.donor_name || 'Valued Donor',
                oldAmount,
                newAmountDecimal,
                subscription.currency.toUpperCase(),
                subscription.interval,
                stripeSubscription.status
              )
            };
            
            await sendMail(emailOptions);
          }
          
          // Notify admins about subscription amount change
          if (config.adminEmails && config.adminEmails.length > 0) {
            const adminEmailOptions = {
              from: `"Africa Access Water" <${config.email.user}>`,
              to: config.adminEmails,
              subject: `Subscription Amount Updated - ${subscription.donor_name || 'Unknown Donor'}`,
              html: adminSubscriptionAmountUpdatedEmail(
                subscription.donor_name,
                subscription.donor_email,
                oldAmount,
                newAmountDecimal,
                subscription.currency.toUpperCase(),
                subscription.interval,
                subscription.id,
                stripeSubscription.id
              )
            };
            
            await sendMail(adminEmailOptions);
          }
        } catch (error) {
          console.error(`❌ Error in customer.subscription.updated: ${error.message}`);
          console.error(error.stack);
          throw error;
        }
        
        break;
      }

      // ----------------------------------------------------------------
      // EVENT: customer.subscription.deleted
      // Triggered when a subscription is cancelled by user or admin
      // ----------------------------------------------------------------
      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object;
        console.log(`🔔 Subscription deleted event received for: ${stripeSubscription.id}`);
        
        // Look up subscription in database
        const subscription = await Subscription.findByStripeId(stripeSubscription.id);
        if (!subscription) {
          console.error(`❌ Subscription not found in database: ${stripeSubscription.id}`);
          break;
        }
        
        // Update subscription status to 'cancelled' in database
        await Subscription.updateById(subscription.id, { status: "cancelled" });
        console.log(`✅ Updated subscription ${subscription.id} status to 'cancelled'`);
        
        // Notify donor about subscription cancellation
        if (subscription.donor_email) {
          console.log(`📧 Sending subscription cancellation notification to: ${subscription.donor_email}`);
          
          const emailOptions = {
            from: `"Africa Access Water" <${config.email.user}>`,
            to: subscription.donor_email,
            subject: "Your Recurring Donation Has Been Cancelled",
            html: subscriptionCancelledEmail(
              subscription.donor_name || 'Valued Donor',
              subscription.amount,
              subscription.currency.toUpperCase(),
              subscription.interval
            )
          };
          
          await sendMail(emailOptions);
          console.log(`✅ Subscription cancellation notification sent to ${subscription.donor_email}`);
        }
        
        // Notify admins about the cancellation for tracking
        if (config.adminEmails && config.adminEmails.length > 0) {
          console.log(`📧 Notifying admins about subscription cancellation`);
          
          const adminEmailOptions = {
            from: `"Africa Access Water" <${config.email.user}>`,
            to: config.adminEmails,
            subject: `Subscription Cancelled - ${subscription.donor_name || 'Unknown Donor'}`,
            html: adminSubscriptionCancelledEmail(
              subscription.donor_name,
              subscription.donor_email,
              subscription.amount,
              subscription.currency.toUpperCase(),
              subscription.interval,
              subscription.id,
              stripeSubscription.id
            )
          };
          
          await sendMail(adminEmailOptions);
          console.log(`✅ Admin notification sent about subscription cancellation`);
        }
        
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge webhook receipt to Stripe
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handling error:", err);
    res.status(500).send("Webhook handler failed");
  }
};

// ============================================================================
// QUERY ENDPOINTS (GET)
// ============================================================================

/**
 * Get All Donations
 * Retrieves all donation records with donor information
 * 
 * @route GET /api/donations
 * @access Admin (typically protected by middleware)
 * 
 * @returns {Array} Array of donation objects with donor details
 */
exports.getDonations = async (req, res) => {
  try {
    // Extract possible filter parameters from query string
    const { donor_id, status, name, currency, project_id, stripe_subscription_id, ...rest } = req.query;

    // Helper function to apply filters to donation/subscription records
    const filterFn = (item) => {
      // Filter by donor ID
      if (donor_id && item.donor_id != donor_id) return false;
      
      // Filter by status (completed, pending, failed, etc.)
      if (status && item.status != status) return false;
      
      // Filter by donor name (case-insensitive partial match)
      if (name && item.name && !item.name.toLowerCase().includes(name.toLowerCase())) return false;
      
      // Filter by currency (USD, EUR, etc.)
      if (currency && item.currency != currency) return false;
      
      // Filter by project ID
      if (project_id && item.project_id != project_id) return false;
      
      // Generic filter for any additional query parameters
      for (const key in rest) {
        if (item[key] && item[key] != rest[key]) return false;
      }
      
      return true;
    };

    // Fetch all one-time donations from database
    let donations = await Donation.findAll();
    
    // Fetch all recurring subscriptions from database
    let subscriptions = await Subscription.findAll();

    // Apply filters to both datasets
    donations = donations.filter(filterFn);
    subscriptions = subscriptions.filter(filterFn);

    // Combine donations and subscriptions with type indicator
    const allDonations = [
      ...donations.map((d) => ({ ...d, type: "one-time" })),
      ...subscriptions.map((s) => ({ ...s, type: "subscription" })),
    ];

    // Sort by creation date (most recent first)
    allDonations.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    res.json(allDonations);
  } catch (error) {
    console.error("Get donations error:", error);
    res.status(500).json({ error: "Unable to fetch donations and subscriptions" });
  }
};

/**
 * Get All Donors
 * Retrieves all donor records
 * 
 * @route GET /api/donors
 * @access Admin (typically protected by middleware)
 * 
 * @returns {Array} Array of donor objects
 */
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.findAll();
    res.json(donors);
  } catch (error) {
    console.error("Get all donors error:", error);
    res.status(500).json({ error: "Unable to fetch donors" });
  }
};

/**
 * Get Project with Donations
 * Retrieves a project with all associated donations
 * 
 * @route GET /api/projects/:id/donations
 * @access Public
 * 
 * @param {number} id - Project ID from URL params
 * @returns {Object} Project object with donations array
 */
exports.getProjectWithDonations = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch project with associated donations
    const project = await Project.findWithDonations(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

