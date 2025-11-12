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

module.exports = {
  userContactConfirmationEmail,
  adminContactNotificationEmail,
  donorDonationConfirmationEmail,
  adminDonationNotificationEmail,
  passwordResetEmail,
};

