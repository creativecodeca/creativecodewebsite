import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends a security alert email to the administrator.
 * 
 * @param event - Description of the suspicious activity
 * @param details - Additional details (IP, request info, etc.)
 */
export async function sendSecurityAlert(event: string, details: any) {
  const adminEmail = 'francodomenicandreacchi@gmail.com';
  
  // Use environment variables for SMTP configuration
  // These should be set in .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const detailString = typeof details === 'object' 
    ? JSON.stringify(details, null, 2) 
    : details;

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ SMTP credentials not configured. Security alert logged to console instead:');
      console.warn(`Event: ${event}`);
      console.warn(`Details: ${detailString}`);
      return;
    }

    await transporter.sendMail({
      from: `"Creative Code Security" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🚨 SECURITY ALERT: Suspicious API Usage Detected`,
      text: `
Security alert from Creative-Code-Website:

Event: ${event}

Details:
${detailString}

Timestamp: ${new Date().toISOString()}
      `,
      html: `
<h2>🚨 Security Alert Detected</h2>
<p><strong>Event:</strong> ${event}</p>
<p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
<hr />
<p><strong>Details:</strong></p>
<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
${detailString}
</pre>
      `,
    });
    
    console.log(`✅ Security alert email sent for: ${event}`);
  } catch (error) {
    console.error('❌ Failed to send security alert email:', error);
    // Fallback log
    console.warn('CRITICAL ALERT LOG:', { event, details, timestamp: new Date().toISOString() });
  }
}
