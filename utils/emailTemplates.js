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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
            <img src="https://africaaccesswater.org/assets/img/afaw-logo-africa.png" alt="Africa Access Water Logo" width="150" />
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
};

