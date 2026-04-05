const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not your real password)
  },
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// Root route
app.get('/', (req, res) => {
  res.send('JAAXL Backend API — Operational');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JAAXL backend is running' });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address.',
    });
  }

  try {
    // Email to YOU (notification)
    const notificationMail = {
      from: `"JAAXL Website" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: `[JAAXL Contact] ${subject}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">
              New Contact Request
            </h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">via JAAXL Website</p>
          </div>
          <div style="padding: 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #ffffff; font-size: 16px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #ffffff; font-size: 16px;"><a href="mailto:${email}" style="color: #ffffff;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #ffffff; font-size: 16px;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px 0;">Message</p>
              <div style="background: #111111; border: 1px solid #222; border-radius: 8px; padding: 20px; color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: #ffffff; color: #000000; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${name}</a>
            </div>
          </div>
          <div style="padding: 24px 40px; background: #111111; border-top: 1px solid #222; text-align: center;">
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">JAAXL — Creative Software Studio</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to the user
    const autoReplyMail = {
      from: `"JAAXL Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message — JAAXL`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">JAAXL</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">Creative Software Studio</p>
          </div>
          <div style="padding: 40px;">
            <h2 style="font-size: 20px; font-weight: 400; color: #ffffff; margin: 0 0 16px 0;">Thanks for reaching out, ${name}!</h2>
            <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
              We've received your message and will get back to you within <strong style="color: #ffffff;">24–48 hours</strong>. 
              In the meantime, feel free to explore our work or connect with us on social media.
            </p>
            <div style="background: #111111; border: 1px solid #222; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px 0;">Your message</p>
              <p style="color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">— The JAAXL Team</p>
          </div>
          <div style="padding: 24px 40px; background: #111111; border-top: 1px solid #222; text-align: center;">
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">
              © ${new Date().getFullYear()} JAAXL. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(notificationMail);
    await transporter.sendMail(autoReplyMail);

    console.log(`[Contact] Email sent from ${name} <${email}>`);

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('[Contact] Email send error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// ─── Start Server (Skip when deploying on Vercel) ─────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 JAAXL backend running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}

module.exports = app;
