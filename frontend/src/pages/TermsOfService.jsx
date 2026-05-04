import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageSEO from '../components/SEO/PageSEO';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jaqyi.com/terms-of-service#webpage",
  "url": "https://jaqyi.com/terms-of-service",
  "name": "Terms of Service — JAQYI",
  "isPartOf": { "@id": "https://jaqyi.com/#website" },
  "about": { "@id": "https://jaqyi.com/#organization" },
  "description": "Terms of Service for JAQYI — the conditions governing use of our website and services.",
  "inLanguage": "en-IN",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
      { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://jaqyi.com/terms-of-service" }
    ]
  }
};

const Section = ({ title, children }) => (
  <div className="legal-section">
    <h2 className="legal-h2">{title}</h2>
    {children}
  </div>
);

const TermsOfService = () => (
  <div className="legal-page">
    <PageSEO
      title="Terms of Service | JAQYI — Web Development & AI Agency"
      description="Read JAQYI's Terms of Service. These terms govern your use of our website and the services we provide, including web development, app development, and AI automation."
      canonical="https://jaqyi.com/terms-of-service"
      keywords={['JAQYI terms of service', 'terms and conditions', 'service agreement', 'JAQYI legal']}
      schema={schema}
    />
    <Header />

    <main className="legal-main">
      <div className="legal-container">
        {/* Breadcrumb */}
        <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Terms of Service</span>
        </nav>

        <header className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-meta">
            <strong>JAQYI</strong> &nbsp;|&nbsp; Last updated: <time dateTime="2026-05-04">May 4, 2026</time>
          </p>
          <p className="legal-intro">
            Please read these Terms of Service ("Terms") carefully before using the website at{' '}
            <a href="https://jaqyi.com">jaqyi.com</a> or engaging JAQYI ("we", "us", "our") for any services.
            By accessing our website or entering into a service agreement with us, you agree to be bound by these Terms.
          </p>
        </header>

        <Section title="1. Acceptance of Terms">
          <p>
            By using our website or engaging our services, you confirm that you are at least 18 years old, have the legal
            authority to enter into agreements, and agree to comply with these Terms. If you do not agree, please do not
            use our website or services.
          </p>
        </Section>

        <Section title="2. Services">
          <p>JAQYI provides the following professional services:</p>
          <ul className="legal-list">
            <li>Custom web development (websites, web applications, SaaS platforms, ERP/CRM systems)</li>
            <li>Mobile app development (iOS, Android, Flutter, React Native)</li>
            <li>AI &amp; automation solutions (chatbots, ML models, business process automation)</li>
            <li>Digital marketing (SEO, PPC, social media management, content marketing)</li>
          </ul>
          <p>
            The specific scope, deliverables, timelines, and pricing for each engagement are defined in a separate
            Statement of Work (SOW) or service agreement signed between JAQYI and the client.
          </p>
        </Section>

        <Section title="3. Payments &amp; Pricing">
          <ul className="legal-list">
            <li><strong>Quotations:</strong> All price quotations provided are valid for 30 days from the date of issue.</li>
            <li><strong>Payment Schedule:</strong> Payments are typically structured as milestones (e.g., 50% upfront, 50% on delivery) as agreed in the SOW.</li>
            <li><strong>Currency:</strong> Payments may be made in Indian Rupees (INR) or US Dollars (USD) as agreed. All quoted prices are exclusive of applicable taxes (GST for Indian clients).</li>
            <li><strong>Late Payments:</strong> Invoices unpaid within 15 days of the due date may attract a late fee of 2% per month on the outstanding amount.</li>
            <li><strong>Refunds:</strong> Payments for completed milestones are non-refundable. For disputes regarding incomplete work, please contact us at <a href="mailto:akshat@jaqyi.com">akshat@jaqyi.com</a>.</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <ul className="legal-list">
            <li><strong>Client Ownership:</strong> Upon full payment of all invoices, the client receives full ownership of all custom deliverables created specifically for their project (code, designs, content).</li>
            <li><strong>JAQYI IP:</strong> Any pre-existing tools, libraries, frameworks, or reusable components developed by JAQYI prior to or independently of the engagement remain the intellectual property of JAQYI. We grant clients a non-exclusive, perpetual licence to use such components within their project.</li>
            <li><strong>Third-Party Libraries:</strong> Projects may include open-source libraries and third-party tools. Their use is governed by their respective licences.</li>
            <li><strong>Portfolio Rights:</strong> We reserve the right to showcase completed work in our portfolio and marketing materials unless the client explicitly requests confidentiality in writing.</li>
          </ul>
        </Section>

        <Section title="5. Client Responsibilities">
          <p>The client agrees to:</p>
          <ul className="legal-list">
            <li>Provide accurate, complete, and timely information, content, and feedback required to complete the project.</li>
            <li>Designate a primary point of contact who has authority to approve designs, content, and deliverables.</li>
            <li>Ensure all content provided (text, images, logos, data) does not infringe any third-party intellectual property rights.</li>
            <li>Make payments according to the agreed schedule.</li>
            <li>Review and approve deliverables within 7 business days of submission. Failure to respond within this period constitutes approval.</li>
          </ul>
        </Section>

        <Section title="6. Project Timelines &amp; Delays">
          <p>
            We commit to delivering projects within the timelines agreed in the SOW. However, timelines may be affected by:
          </p>
          <ul className="legal-list">
            <li>Delays in client feedback or content provision.</li>
            <li>Changes to project scope requested after work has commenced.</li>
            <li>Third-party dependencies outside our control (e.g., payment gateway approvals, App Store reviews).</li>
          </ul>
          <p>We will communicate any anticipated delays promptly and in writing.</p>
        </Section>

        <Section title="7. Confidentiality">
          <p>
            Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement.
            This includes business strategies, technical specifications, pricing, and client data. This obligation
            survives the termination of the engagement for a period of 2 years.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, JAQYI's total liability to the client for any claim arising from
            our services shall not exceed the total fees paid by the client in the 3 months preceding the claim.
          </p>
          <p>
            We are not liable for any indirect, incidental, special, consequential, or punitive damages, including
            loss of profit, loss of data, or loss of business, even if advised of the possibility of such damages.
          </p>
        </Section>

        <Section title="9. Warranty &amp; Support">
          <p>
            We warrant that all deliverables will be free from material defects for a period of 30 days after the
            final delivery date. During this period, we will fix any bugs or defects at no additional cost.
            After the warranty period, bug fixes and enhancements are available under a maintenance retainer or
            billed at our standard hourly rates.
          </p>
        </Section>

        <Section title="10. Termination">
          <ul className="legal-list">
            <li><strong>By Client:</strong> The client may terminate the engagement with 14 days' written notice. All completed milestones must be paid in full, and work in progress will be billed proportionally.</li>
            <li><strong>By JAQYI:</strong> We reserve the right to terminate the engagement if the client breaches these Terms (including non-payment) and fails to remedy the breach within 7 days of written notice.</li>
          </ul>
        </Section>

        <Section title="11. Use of Website">
          <p>You agree not to use our website to:</p>
          <ul className="legal-list">
            <li>Transmit any unlawful, harmful, defamatory, or otherwise objectionable content.</li>
            <li>Attempt to gain unauthorised access to our systems or data.</li>
            <li>Use automated scraping or data extraction tools without our written permission.</li>
            <li>Violate any applicable local, national, or international laws or regulations.</li>
          </ul>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms are governed by the laws of India. Any disputes arising from these Terms or our services
            shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.
            For international clients, we will first attempt to resolve disputes through good-faith negotiation.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We reserve the right to update these Terms at any time. Updated Terms will be posted on this page with
            a revised "Last updated" date. Your continued use of our website or services after such changes
            constitutes your acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>For questions about these Terms, please contact us:</p>
          <address className="legal-address">
            <strong>JAQYI Software Studio</strong><br />
            Industrial Estate, Sector-C, Indore, Madhya Pradesh 452001, India<br />
            Email: <a href="mailto:akshat@jaqyi.com">akshat@jaqyi.com</a><br />
            Phone: <a href="tel:+919109621850">+91 9109621850</a>
          </address>
        </Section>

        <div className="legal-footer-nav">
          <Link to="/privacy-policy" className="legal-link">← Privacy Policy</Link>
          <Link to="/" className="legal-link">← Back to Home</Link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default TermsOfService;
