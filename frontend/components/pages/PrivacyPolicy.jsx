"use client";
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jaqyi.com/privacy-policy#webpage",
  "url": "https://jaqyi.com/privacy-policy",
  "name": "Privacy Policy — JAQYI",
  "isPartOf": { "@id": "https://jaqyi.com/#website" },
  "about": { "@id": "https://jaqyi.com/#organization" },
  "description": "Privacy Policy for JAQYI — Learn how we collect, use, and protect your personal information.",
  "inLanguage": "en-IN",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://jaqyi.com/privacy-policy" }
    ]
  }
};

const Section = ({ title, children }) => (
  <div className="legal-section">
    <h2 className="legal-h2">{title}</h2>
    {children}
  </div>
);

const PrivacyPolicy = () => (
  <div className="legal-page">
    <Header />

    <main className="legal-main">
      <div className="legal-container">
        {/* Breadcrumb */}
        <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Privacy Policy</span>
        </nav>

        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">
            <strong>JAQYI</strong> &nbsp;|&nbsp; Last updated: <time dateTime="2026-05-04">May 4, 2026</time>
          </p>
          <p className="legal-intro">
            JAQYI ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy
            explains what information we collect when you visit <a href="https://jaqyi.com">jaqyi.com</a>,
            use our services, or contact us — and how we use, store, and protect that information.
          </p>
        </header>

        <Section title="1. Information We Collect">
          <p>We collect information in the following ways:</p>
          <ul className="legal-list">
            <li><strong>Contact &amp; Inquiry Data:</strong> When you fill out our contact form or send us an email, we collect your name, email address, phone number, company name, and the content of your message.</li>
            <li><strong>Project &amp; Business Data:</strong> If you engage us for services, we may collect additional business information required to deliver those services (e.g., project briefs, requirements documents).</li>
            <li><strong>Usage Data:</strong> We may collect anonymised analytics data (page views, session duration, referral source) to improve our website. This data does not identify you personally.</li>
            <li><strong>Cookies:</strong> We use essential cookies to ensure the website functions correctly. We do not use tracking cookies or third-party ad-tracking pixels.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="legal-list">
            <li>Respond to your inquiries and provide project quotations.</li>
            <li>Deliver the web development, app development, AI automation, or digital marketing services you have engaged us for.</li>
            <li>Send project updates, invoices, and other communications related to your engagement with us.</li>
            <li>Improve our website, services, and user experience.</li>
            <li>Comply with our legal and contractual obligations.</li>
          </ul>
          <p>We do <strong>not</strong> sell, rent, or trade your personal information to any third party for marketing purposes.</p>
        </Section>

        <Section title="3. Data Sharing">
          <p>We may share your information only in the following limited circumstances:</p>
          <ul className="legal-list">
            <li><strong>Service Providers:</strong> We use trusted third-party tools (e.g., email hosting, cloud infrastructure) that process data on our behalf under strict confidentiality obligations.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental authority.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred to the successor entity.</li>
          </ul>
        </Section>

        <Section title="4. Data Retention">
          <p>
            We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected,
            or as required by law. Contact inquiry data is retained for up to 2 years. Project data is retained for
            the duration of the engagement plus 3 years for legal and accounting purposes.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="legal-list">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Erasure:</strong> Request deletion of your data, subject to legal retention requirements.</li>
            <li><strong>Objection:</strong> Object to the processing of your data in certain circumstances.</li>
            <li><strong>Portability:</strong> Request transfer of your data in a structured, machine-readable format.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:akshat@jaqyi.com">akshat@jaqyi.com</a>.</p>
        </Section>

        <Section title="6. Cookies">
          <p>
            Our website uses only essential cookies necessary for basic functionality (e.g., remembering your preferences
            during a session). We do not use advertising cookies. By using our website, you consent to the use of
            these essential cookies. You can disable cookies in your browser settings, but this may affect website functionality.
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            We implement industry-standard technical and organisational measures to protect your personal data against
            unauthorised access, alteration, disclosure, or destruction. These include HTTPS encryption, secure data
            storage, and access controls. However, no method of transmission over the internet is 100% secure.
          </p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>
            Our website may contain links to third-party websites (e.g., LinkedIn, X/Twitter). We are not responsible
            for the privacy practices of those websites. We encourage you to review their privacy policies before
            providing any personal information.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            Our services are not directed at individuals under the age of 18. We do not knowingly collect personal
            data from children. If you believe we have inadvertently collected data from a child, please contact us
            and we will delete it promptly.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date
            at the top of this page. We encourage you to review this policy periodically to stay informed about how
            we protect your information.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <address className="legal-address">
            <strong>JAQYI Software Studio</strong><br />
            Industrial Estate, Sector-C, Indore, Madhya Pradesh 452001, India<br />
            Email: <a href="mailto:akshat@jaqyi.com">akshat@jaqyi.com</a><br />
            Phone: <a href="tel:+919109621850">+91 9109621850</a>
          </address>
        </Section>

        <div className="legal-footer-nav">
          <Link href="/terms-of-service" className="legal-link">Terms of Service →</Link>
          <Link href="/" className="legal-link">← Back to Home</Link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
