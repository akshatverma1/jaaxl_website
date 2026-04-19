const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
require('dotenv').config();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

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
  res.send('JAQYI Backend API — Operational');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JAQYI backend is running' });
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
      from: `"JAQYI Website" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: `[JAQYI Contact] ${subject}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">
              New Contact Request
            </h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">via JAQYI Website</p>
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
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">JAQYI — Creative Software Studio</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to the user
    const autoReplyMail = {
      from: `"JAQYI Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message — JAQYI`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">JAQYI</h1>
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
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">— The JAQYI Team</p>
          </div>
          <div style="padding: 24px 40px; background: #111111; border-top: 1px solid #222; text-align: center;">
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">
              © ${new Date().getFullYear()} JAQYI. All rights reserved.
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

// Job Application submission
app.post('/api/careers/apply', upload.single('resume'), async (req, res) => {
  try {
    const rawAnswers = req.body.answers;
    if (!rawAnswers) {
      return res.status(400).json({ success: false, message: 'Answers are required.' });
    }
    
    let answers;
    try {
      answers = JSON.parse(rawAnswers);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid answers format.' });
    }

    const { fullName, email } = answers;
    const resumeFile = req.file; // From multer

    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    // Build the formatted HTML for the answers
    let answersHtml = '<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">';
    for (const [key, value] of Object.entries(answers)) {
      answersHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #222; color: rgba(255,255,255,0.6); font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 30%; vertical-align: top;">
            ${key}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #222; color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap; vertical-align: top;">
            ${value || '—'}
          </td>
        </tr>
      `;
    }
    answersHtml += '</table>';

    // Email to Admin
    const notificationMail = {
      from: `"JAQYI Website" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: `[JAQYI Careers] New Sales Person Application: ${fullName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">
              New Job Application
            </h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">Role: Sales Person</p>
          </div>
          <div style="padding: 40px;">
            <h2 style="font-size: 20px; font-weight: 400; color: #ffffff; margin: 0 0 24px 0;">Applicant Responses</h2>
            <div style="background: #111111; border: 1px solid #222; border-radius: 8px; padding: 10px;">
              ${answersHtml}
            </div>
            ${resumeFile ? '<p style="margin-top: 24px; color: #4ade80;">Resume attached to this email.</p>' : '<p style="margin-top: 24px; color: #f87171;">No resume attached.</p>'}
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Regarding your application for Sales Person at JAQYI" style="display: inline-block; background: #ffffff; color: #000000; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">Email ${fullName}</a>
            </div>
          </div>
        </div>
      `,
      attachments: resumeFile ? [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer
        }
      ] : []
    };

    // Auto-reply to candidate
    const autoReplyMail = {
      from: `"JAQYI Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: \`Application Received - JAQYI Careers\`,
      html: \`
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #111111; padding: 32px 40px; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff;">JAQYI</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">Careers</p>
          </div>
          <div style="padding: 40px;">
            <h2 style="font-size: 20px; font-weight: 400; color: #ffffff; margin: 0 0 16px 0;">Application Received!</h2>
            <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
              Hi \${fullName},<br><br>
              Thank you for applying for the <strong>Sales Person</strong> position at JAQYI. We have successfully received your application responses and resume.<br><br>
              Our team will review your application and try to get back to you soon. We appreciate your interest in joining us!
            </p>
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">— The JAQYI Team</p>
          </div>
        </div>
      \`
    };

    await transporter.sendMail(notificationMail);
    await transporter.sendMail(autoReplyMail);

    console.log('[Careers] Application submitted by ${fullName} <${email}>');

    return res.status(200).json({
      success: true,
      message: 'Your application has been submitted successfully!',
    });
  } catch (error) {
    console.error('[Careers] Apply error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
    });
  }
});

// ─── Start Server (Skip when deploying on Vercel) ─────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 JAQYI backend running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}

module.exports = app;
