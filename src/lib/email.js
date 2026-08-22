/**
 * CareerBuild Email Helper Utility
 * Dedicated Nodemailer SMTP Implementation
 */

import nodemailer from "nodemailer";

export async function sendOtpEmail({ email, otpCode }) {
  console.log(`[CareerBuild Email Helper] Sending 6-digit OTP (${otpCode}) to ${email}`);

  const targetRecipient = email.toLowerCase().trim();

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CareerBuild Verification Code</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 40px 16px;">
          <tr>
            <td align="center">
              <!-- Container Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
                
                <!-- Gradient Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 32px 40px; text-align: left;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); border-radius: 10px; padding: 6px 12px; margin-bottom: 16px;">
                            <span style="color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Security Verification</span>
                          </div>
                          <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; tracking: -0.5px; line-height: 1.2;">
                            CareerBuild
                          </h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 40px 40px 32px 40px;">
                    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 12px 0; letter-spacing: -0.3px;">
                      Password Reset Request
                    </h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
                      Hello,<br>
                      We received a request to reset the password associated with your CareerBuild account (<strong style="color: #0f172a;">${targetRecipient}</strong>). Use the 6-digit verification code below to complete your request:
                    </p>

                    <!-- Hero OTP Display Card -->
                    <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 16px; padding: 28px 20px; text-align: center; margin-bottom: 28px;">
                      <span style="display: block; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Your 6-Digit Verification Code</span>
                      <div style="font-family: 'SF Mono', 'Roboto Mono', Monaco, Consolas, monospace; font-size: 38px; font-weight: 900; color: #4f46e5; letter-spacing: 10px; line-height: 1; padding: 6px 0 10px 10px;">
                        ${otpCode}
                      </div>
                      <div style="display: inline-flex; align-items: center; gap: 6px; background-color: #eef2ff; border-radius: 20px; padding: 4px 14px; margin-top: 6px;">
                        <span style="color: #4f46e5; font-size: 12px; font-weight: 600;">⏱️ Valid for 10 minutes</span>
                      </div>
                    </div>

                    <!-- Security Alert Note -->
                    <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 16px; margin-bottom: 28px;">
                      <p style="color: #b45309; font-size: 13px; line-height: 1.5; margin: 0; font-weight: 500;">
                        <strong>Security Tip:</strong> If you did not request a password reset, please ignore this email or contact our security team. Your account password remains unchanged.
                      </p>
                    </div>

                    <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;">
                      Best regards,<br>
                      <strong style="color: #0f172a;">The CareerBuild Engineering Team</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer Section -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0 0 8px 0;">
                      This is an automated operational email sent to ${targetRecipient}. Please do not reply to this message.
                    </p>
                    <p style="color: #94a3b8; font-size: 12px; margin: 0; font-weight: 500;">
                      © ${new Date().getFullYear()} CareerBuild AI. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Nodemailer SMTP Delivery (If SMTP_HOST and SMTP_USER are defined)
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const port = parseInt(process.env.SMTP_PORT || "587", 10);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: process.env.SMTP_SECURE === "true" || port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Explicitly set sender display name as "CareerBuild" <smtp_user>
      const fromAddress = {
        name: "CareerBuild",
        address: process.env.SMTP_USER,
      };

      const info = await transporter.sendMail({
        from: fromAddress,
        to: targetRecipient,
        subject: `${otpCode} is your CareerBuild verification code`,
        html: htmlContent,
      });

      console.log(`[Nodemailer SMTP] Successfully sent OTP email to ${targetRecipient}. MessageId: ${info.messageId}`);
      return { success: true, provider: "nodemailer", messageId: info.messageId };
    } catch (err) {
      console.error("[Nodemailer SMTP Error] Failed to send email via Nodemailer:", err.message);
    }
  }

  // Fallback Simulation for Development & Testing
  console.log(`[DEV OTP LOG] Target Email: ${targetRecipient} -> OTP Code: ${otpCode}`);
  return {
    success: true,
    provider: "dev_console",
    message: `OTP ${otpCode} sent to ${targetRecipient}`,
  };
}
