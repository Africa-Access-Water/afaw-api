function userContactConfirmationEmail(name) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Thank You for Contacting Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to <strong>Africa Access Water (AfAW)</strong>.</p>
            <p>We are a non-profit organization committed to improving livelihoods through sustainable, solar-powered water infrastructure in rural African communities.</p>
            <p>We have received your message and will respond shortly. If your inquiry is urgent, feel free to reply directly to this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p>Best regards,</p>
            <p><strong>Africa Access Water Team</strong></p>
            <p>
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a><br />
              Phone: +260 211 231 174<br />
              Email: <a href="mailto:info@africaaccesswater.org" style="color: #3498db;">info@africaaccesswater.org</a>
            </p>
            <p style="margin-top: 20px;">
              <em>“Invest in Water, Invest in Livelihoods.”</em><br/>
              <small>Registered 501(c)(3) Nonprofit | Zambia & USA</small>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function passwordResetEmail(name, resetUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Africa Access Water Password</title>
      <style>
        .button {
          background-color: #3498db;
          border: none;
          border-radius: 4px;
          color: white !important;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <p>Hello${name ? ' <strong>' + name + '</strong>' : ''},</p>
            <p>We received a request to reset your password for your <strong>Africa Access Water (AfAW)</strong> account. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click the button below:</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 30px 0;">
            <a href="${resetUrl}" class="button" style="background-color: #3498db; border: none; border-radius: 4px; color: white !important; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
              Reset Password
            </a>
          </td>
        </tr>
        <tr>
          <td style="color: #666666; font-size: 14px; line-height: 1.5; padding: 20px 0;">
            <p>If the button above doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #3498db;">
              ${resetUrl}
            </p>
            <p>This password reset link will expire in 1 hour for security reasons.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p>Best regards,</p>
            <p><strong>Africa Access Water Team</strong></p>
            <p>
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a><br />
              Phone: +260 211 231 174<br />
              Email: <a href="mailto:info@africaaccesswater.org" style="color: #3498db;">info@africaaccesswater.org</a>
            </p>
            <p style="margin-top: 20px;">
              <em>"Invest in Water, Invest in Livelihoods."</em><br/>
              <small>Registered 501(c)(3) Nonprofit | Zambia & USA</small>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function adminContactNotificationEmail(name, email, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>New Contact Submission - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <p>You’ve received a new contact submission via the website:</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/> ${message}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p>This message was sent from the <a href="https://africaaccesswater.org" style="color: #3498db;">Africa Access Water</a> website contact form.</p>
            <p><strong>System Notification</strong></p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}



function donorDonationConfirmationEmail(name, amount, currency, projectName) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Arial, sans-serif; background:#f9f9f9; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" 
             style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" 
                 alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color:#333; font-size:16px; line-height:1.6;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for your generous donation of 
              <strong>${amount} ${currency}</strong> 
              towards <strong>${projectName}</strong>.</p>
            <p>Your contribution is directly helping communities gain access to 
              clean and sustainable water.</p>
            <p>We’re truly grateful for your support ❤️.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:30px; border-top:1px solid #ddd; color:#666; font-size:14px;">
            <p>Africa Access Water Team</p>
            <p><a href="https://africaaccesswater.org" style="color:#3498db;">africaaccesswater.org</a></p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function adminDonationNotificationEmail(name, email, amount, currency, projectName) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Arial, sans-serif; background:#f9f9f9; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" 
             style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" 
                 alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color:#333; font-size:16px; line-height:1.6;">
            <p><strong>New Donation Received</strong></p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Amount:</strong> ${amount} ${currency}</p>
            <p><strong>Project:</strong> ${projectName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:30px; border-top:1px solid #ddd; color:#666; font-size:14px;">
            <p>This is an automated system notification.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ============================================================================
// RECURRING DONATION EMAIL TEMPLATES
// ============================================================================

/**
 * Helper function to format frequency for display
 */
function formatFrequency(interval) {
  const frequencyMap = {
    'day': 'daily',
    'week': 'weekly',
    'month': 'monthly',
    'year': 'yearly'
  };
  return frequencyMap[interval] || interval;
}

/**
 * Email to donor when subscription amount is updated
 */
function subscriptionAmountUpdatedEmail(donorName, oldAmount, newAmount, currency, interval, status) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription Updated - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #3498db;">Subscription Updated</h2>
            <p>Dear <strong>${donorName}</strong>,</p>
            <p>This is to confirm that your recurring donation amount has been updated.</p>
            <p><strong>Subscription Details:</strong></p>
            <ul>
              <li><strong>Previous Amount:</strong> ${currency} ${oldAmount}</li>
              <li><strong>New Amount:</strong> ${currency} ${newAmount}</li>
              <li><strong>Frequency:</strong> ${formatFrequency(interval)}</li>
              <li><strong>Status:</strong> ${status}</li>
            </ul>
            <p>This change will take effect on your next billing cycle.</p>
            <p>If you have any questions or did not authorize this change, please contact us immediately.</p>
            <p>Thank you for your continued support!</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p>Best regards,</p>
            <p><strong>Africa Access Water Team</strong></p>
            <p>
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a><br />
              Phone: +260 211 231 174<br />
              Email: <a href="mailto:info@africaaccesswater.org" style="color: #3498db;">info@africaaccesswater.org</a>
            </p>
            <p style="margin-top: 20px;">
              <em>"Invest in Water, Invest in Livelihoods."</em><br/>
              <small>Registered 501(c)(3) Nonprofit | Zambia & USA</small>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Email to admin when subscription amount is updated
 */
function adminSubscriptionAmountUpdatedEmail(donorName, donorEmail, oldAmount, newAmount, currency, interval, subscriptionId, stripeSubscriptionId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription Amount Updated - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #2ecc71;">Subscription Amount Updated</h2>
            <p>A recurring donation subscription amount has been updated in Stripe.</p>
            <p><strong>Donor Details:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${donorName || 'Unknown'}</li>
              <li><strong>Email:</strong> ${donorEmail || 'Unknown'}</li>
              <li><strong>Previous Amount:</strong> ${currency} ${oldAmount}</li>
              <li><strong>New Amount:</strong> ${currency} ${newAmount}</li>
              <li><strong>Frequency:</strong> ${formatFrequency(interval)}</li>
              <li><strong>Subscription ID:</strong> ${subscriptionId}</li>
              <li><strong>Stripe Subscription ID:</strong> ${stripeSubscriptionId}</li>
            </ul>
            <p>This change was synced from Stripe Dashboard to the database automatically.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p><strong>System Notification</strong></p>
            <p>This is an automated notification from the Africa Access Water donation system.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Email to donor when subscription is cancelled
 */
function subscriptionCancelledEmail(donorName, amount, currency, interval) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription Cancelled - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #3498db;">Subscription Cancelled</h2>
            <p>Dear <strong>${donorName}</strong>,</p>
            <p>This is to confirm that your recurring donation subscription has been cancelled.</p>
            <p><strong>Subscription Details:</strong></p>
            <ul>
              <li><strong>Amount:</strong> ${currency} ${amount}</li>
              <li><strong>Frequency:</strong> ${formatFrequency(interval)}</li>
              <li><strong>Status:</strong> Cancelled</li>
            </ul>
            <p>Your previous donations have made a real difference in bringing clean water to communities in need. Thank you for your past support!</p>
            <p><strong>Want to continue supporting our mission?</strong></p>
            <ul>
              <li>Set up a new recurring donation</li>
              <li>Make a one-time donation</li>
              <li>Explore other ways to get involved</li>
            </ul>
            <p>If you cancelled by mistake or have any questions, please don't hesitate to contact us.</p>
            <p>With gratitude,</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p><strong>Africa Access Water Team</strong></p>
            <p>
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a><br />
              Phone: +260 211 231 174<br />
              Email: <a href="mailto:info@africaaccesswater.org" style="color: #3498db;">info@africaaccesswater.org</a>
            </p>
            <p style="margin-top: 20px;">
              <em>"Invest in Water, Invest in Livelihoods."</em><br/>
              <small>Registered 501(c)(3) Nonprofit | Zambia & USA</small>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Email to admin when subscription is cancelled
 */
function adminSubscriptionCancelledEmail(donorName, donorEmail, amount, currency, interval, subscriptionId, stripeSubscriptionId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription Cancelled - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #e74c3c;">Subscription Cancelled</h2>
            <p>A recurring donation subscription has been cancelled.</p>
            <p><strong>Donor Details:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${donorName || 'Unknown'}</li>
              <li><strong>Email:</strong> ${donorEmail || 'Unknown'}</li>
              <li><strong>Amount:</strong> ${currency} ${amount}</li>
              <li><strong>Frequency:</strong> ${formatFrequency(interval)}</li>
              <li><strong>Subscription ID:</strong> ${subscriptionId}</li>
              <li><strong>Stripe Subscription ID:</strong> ${stripeSubscriptionId}</li>
            </ul>
            <p>Consider reaching out to understand why they cancelled and how we can improve donor retention.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p><strong>System Notification</strong></p>
            <p>This is an automated notification from the Africa Access Water donation system.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Donor Refund Confirmation Email
 * Sent to donor when their donation is refunded
 * 
 * @param {string} donorName - Name of the donor
 * @param {string} refundedAmount - Amount refunded
 * @param {string} originalAmount - Original donation amount
 * @param {string} currency - Currency code (e.g., 'USD')
 * @param {string} chargeId - Stripe charge ID
 * @returns {string} HTML email template
 */
function donorRefundConfirmationEmail(donorName, refundedAmount, originalAmount, currency, chargeId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Refund Confirmation - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #3498db; margin-bottom: 20px;">Refund Confirmation</h2>
            <p>Dear <strong>${donorName}</strong>,</p>
            <p>We're writing to confirm that your refund has been processed successfully.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #3498db;">
              <p style="margin: 8px 0;"><strong>Refund Amount:</strong> ${currency.toUpperCase()} ${refundedAmount}</p>
              <p style="margin: 8px 0;"><strong>Original Donation:</strong> ${currency.toUpperCase()} ${originalAmount}</p>
              <p style="margin: 8px 0;"><strong>Transaction ID:</strong> ${chargeId}</p>
              <p style="margin: 8px 0;"><strong>Refund Type:</strong> Full Refund</p>
            </div>

            <h3 style="color: #2c3e50; font-size: 18px; margin-top: 25px;">What happens next?</h3>
            <p>The refund will appear in your account within <strong>5-10 business days</strong>, depending on your financial institution.</p>
            
            <p style="margin-top: 20px;">If you have any questions about this refund or would like to make another donation in the future, please don't hesitate to contact us.</p>
            <p>Thank you for your support of our mission to provide clean water access to communities in need!</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; line-height: 1.5;">
            <p>Best regards,</p>
            <p><strong>Africa Access Water Team</strong></p>
            <p>
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a><br />
              Phone: +260 211 231 174<br />
              Email: <a href="mailto:info@africaaccesswater.org" style="color: #3498db;">info@africaaccesswater.org</a>
            </p>
            <p style="margin-top: 20px;">
              <em>"Invest in Water, Invest in Livelihoods."</em><br/>
              <small>Registered 501(c)(3) Nonprofit | Zambia & USA</small>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Admin Refund Notification Email
 * Sent to admins when a refund is processed
 * 
 * @param {string} donorName - Name of the donor
 * @param {string} donorEmail - Email of the donor
 * @param {string} refundedAmount - Amount refunded
 * @param {string} originalAmount - Original donation amount
 * @param {string} currency - Currency code (e.g., 'USD')
 * @param {number} donationId - Donation ID
 * @param {string} chargeId - Stripe charge ID
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @param {number} projectId - Project ID (optional)
 * @returns {string} HTML email template
 */
function adminRefundNotificationEmail(donorName, donorEmail, refundedAmount, originalAmount, currency, donationId, chargeId, paymentIntentId, projectId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Refund Alert - Africa Access Water</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://africaaccesswater.org/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
          </td>
        </tr>
        <tr>
          <td style="color: #333333; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #e74c3c; margin-bottom: 20px;">🔔 Refund Alert</h2>
            <p>A refund has been processed in the system.</p>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0; font-size: 18px;">Donor Information</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${donorName || 'Unknown'}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${donorEmail || 'N/A'}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #e74c3c;">
              <h3 style="color: #721c24; margin-top: 0; font-size: 18px;">Refund Details</h3>
              <p style="margin: 8px 0;"><strong>Donation ID:</strong> ${donationId}</p>
              <p style="margin: 8px 0;"><strong>Refund Amount:</strong> ${currency.toUpperCase()} ${refundedAmount}</p>
              <p style="margin: 8px 0;"><strong>Original Amount:</strong> ${currency.toUpperCase()} ${originalAmount}</p>
              <p style="margin: 8px 0;"><strong>Refund Type:</strong> Full Refund</p>
              ${projectId ? `<p style="margin: 8px 0;"><strong>Project ID:</strong> ${projectId}</p>` : ''}
            </div>

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0066cc;">
              <h3 style="color: #004085; margin-top: 0; font-size: 18px;">Stripe Information</h3>
              <p style="margin: 8px 0;"><strong>Charge ID:</strong> <code style="background: #fff; padding: 2px 6px; border-radius: 3px;">${chargeId}</code></p>
              <p style="margin: 8px 0;"><strong>Payment Intent:</strong> <code style="background: #fff; padding: 2px 6px; border-radius: 3px;">${paymentIntentId || 'N/A'}</code></p>
            </div>

            <p style="color: #666; font-style: italic; margin-top: 25px;">This is an automated notification from the donation management system.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; border-top: 1px solid #dddddd; color: #666666; font-size: 14px; text-align: center;">
            <p><strong>Africa Access Water</strong> - Admin Dashboard</p>
            <p style="margin-top: 10px;">
              <a href="https://africaaccesswater.org" style="color: #3498db; text-decoration: none;">www.africaaccesswater.org</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

module.exports = {
  userContactConfirmationEmail,
  adminContactNotificationEmail,
  donorDonationConfirmationEmail,
  adminDonationNotificationEmail,
  passwordResetEmail,
  subscriptionAmountUpdatedEmail,
  adminSubscriptionAmountUpdatedEmail,
  subscriptionCancelledEmail,
  adminSubscriptionCancelledEmail,
  donorRefundConfirmationEmail,
  adminRefundNotificationEmail,
};

