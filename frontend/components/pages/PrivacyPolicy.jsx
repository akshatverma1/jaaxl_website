import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { company, jsonLd } from '@/data/site';

// Keep this in sync with what the site actually does:
// app/api/chat (OpenRouter), app/api/analytics + lib/analyticsStore (analytics),
// components/WhatsAppButton, backend/server.js (Gmail, contact & careers forms).
const LAST_UPDATED = '2026-11-04';
const LAST_UPDATED_LABEL = 'November 4, 2026';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://jaqyi.com/privacy-policy#webpage',
  url: 'https://jaqyi.com/privacy-policy',
  name: 'Privacy Policy — JAQYI',
  isPartOf: { '@id': 'https://jaqyi.com/#website' },
  about: { '@id': 'https://jaqyi.com/#organization' },
  description: 'How JAQYI collects, uses and protects personal data on jaqyi.com.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jaqyi.com/' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://jaqyi.com/privacy-policy' },
    ],
  },
};

const Section = ({ id, title, children }) => (
  <section className="legal-section" id={id}>
    <h2 className="legal-h2">{title}</h2>
    {children}
  </section>
);

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

const PrivacyPolicy = () => (
  <div className="legal-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    <Header />

    <main className="legal-main">
      <div className="legal-container">
        <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Privacy Policy</span>
        </nav>

        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">
            <strong>JAQYI</strong> &nbsp;|&nbsp; Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
          </p>
          <p className="legal-intro">
            JAQYI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This policy explains what
            personal data we collect when you visit <a href="https://jaqyi.com">jaqyi.com</a>, chat with our AI
            assistant, message us on WhatsApp, fill in a form or work with us — and how we use, share and protect it.
            We process personal data in line with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
          <p className="legal-intro">
            This policy covers jaqyi.com only. Our product Doott runs on its own website,{' '}
            <a href="https://doott.jaqyi.com" target="_blank" rel="noopener">doott.jaqyi.com</a>, and is not covered here.
          </p>
        </header>

        <Section id="collect" title="1. Information we collect">
          <ul className="legal-list">
            <li>
              <strong>Contact form:</strong> your name, email address, subject and message.
            </li>
            <li>
              <strong>AI chat assistant:</strong> the messages you type into the chat on our home page. If you choose to
              share them, your name, email address and phone number. See <a href="#ai-chat">section 4</a>.
            </li>
            <li>
              <strong>Job applications:</strong> your name, email, phone number, country and city, LinkedIn profile,
              your answers about your sales experience, and the résumé file you upload.
            </li>
            <li>
              <strong>WhatsApp:</strong> if you message us on WhatsApp, we receive your phone number, WhatsApp profile
              name and the messages you send. See <a href="#whatsapp">section 5</a>.
            </li>
            <li>
              <strong>Usage analytics:</strong> pages you view, the referring website, device type, approximate
              country and city, time of visit, and clicks on contact links (WhatsApp, phone, email, Doott). See{' '}
              <a href="#analytics">section 6</a>.
            </li>
            <li>
              <strong>Client project data:</strong> if you hire us, the business information needed to deliver the
              work, such as briefs, requirements and access credentials you provide.
            </li>
          </ul>
        </Section>

        <Section id="use" title="2. How we use your information">
          <ul className="legal-list">
            <li>To reply to your enquiry and prepare quotes and proposals.</li>
            <li>To send you an automatic confirmation that we received your message or application.</li>
            <li>To review job applications and contact candidates.</li>
            <li>To deliver, support and invoice the services you engage us for.</li>
            <li>To understand which pages and features are useful, and improve the website.</li>
            <li>To keep the website secure, prevent spam and abuse, and meet legal obligations.</li>
          </ul>
          <p>We do <strong>not</strong> sell or rent your personal data, and we do not use it for advertising.</p>
        </Section>

        <Section id="sharing" title="3. Service providers we use">
          <p>We share personal data only with providers that help us run the website and our business:</p>
          <ul className="legal-list">
            <li><strong>Vercel</strong> — hosts the website and its servers, and provides approximate visitor location.</li>
            <li><strong>Google (Gmail)</strong> — sends and stores the emails generated by our forms and chat assistant.</li>
            <li><strong>OpenRouter and the AI model provider it routes to</strong> — generate the AI chat assistant&apos;s replies (section 4).</li>
            <li><strong>WhatsApp (Meta)</strong> — when you choose to message us on WhatsApp (section 5).</li>
            <li><strong>Upstash / Vercel KV</strong> — stores website analytics, when enabled (section 6).</li>
          </ul>
          <p>
            We may also disclose information when required by law, court order or a government authority, or to a
            successor business in a merger or acquisition.
          </p>
        </Section>

        <Section id="ai-chat" title="4. AI chat assistant">
          <ul className="legal-list">
            <li>
              Messages you type into the chat are sent from our server to <strong>OpenRouter</strong>, which routes them
              to a third-party AI model (currently Google Gemini) to generate a reply. These providers process your
              messages under their own terms and privacy policies.
            </li>
            <li>We do not store chat conversations on our servers.</li>
            <li>
              If you submit your contact details in the chat, the conversation and your details are emailed to our team
              so we can follow up. That email is kept like any other enquiry (section 7).
            </li>
            <li>
              The assistant is automated and can make mistakes. Please do not share passwords, financial details,
              health information or other sensitive personal data in the chat.
            </li>
          </ul>
        </Section>

        <Section id="whatsapp" title="5. WhatsApp">
          <p>
            Our &quot;Chat with us&quot; button opens WhatsApp with a pre-filled message to our business number,{' '}
            {company.phone}. Nothing is sent until you press send. WhatsApp is operated by Meta and its own privacy
            policy applies to your use of it. Messages you send us are used only to reply to you and handle your
            enquiry; we do not add you to broadcast lists without your permission.
          </p>
        </Section>

        <Section id="analytics" title="6. Analytics and cookies">
          <ul className="legal-list">
            <li>
              We run our own, first-party analytics. It records the page you visited, the referring site, device type
              (desktop, mobile or tablet), approximate country and city, the time of your visit and clicks on contact
              links.
            </li>
            <li>
              We do <strong>not</strong> store your IP address. To count unique visitors we store a one-way hashed
              identifier derived from your IP address and browser details, which cannot be turned back into either.
            </li>
            <li>We keep only the most recent 5,000 analytics events; older records are deleted automatically.</li>
            <li>
              Our analytics does not use cookies, and we do not use advertising cookies, third-party trackers or ad
              pixels. Our website does not set cookies for visitors.
            </li>
          </ul>
        </Section>

        <Section id="retention" title="7. How long we keep data">
          <ul className="legal-list">
            <li>Enquiries (contact form, chat leads, WhatsApp): up to 2 years after our last interaction.</li>
            <li>Job applications: up to 1 year after the role is filled, unless you ask us to delete them sooner.</li>
            <li>Client project data: for the engagement plus up to 3 years for legal and accounting purposes.</li>
            <li>Analytics: the most recent 5,000 events only (section 6).</li>
          </ul>
        </Section>

        <Section id="transfers" title="8. Where your data is processed">
          <p>
            Some of our service providers (section 3) process data on servers outside India. Where this happens, we rely
            on providers with appropriate security measures, and transfers are made in line with applicable Indian law.
          </p>
        </Section>

        <Section id="rights" title="9. Your rights">
          <p>Under the DPDP Act and other applicable laws, you can:</p>
          <ul className="legal-list">
            <li>Ask for a summary of the personal data we hold about you and how we use it.</li>
            <li>Ask us to correct, complete or update inaccurate data.</li>
            <li>Ask us to delete your data, unless we must keep it by law.</li>
            <li>Withdraw consent you have given, for example to be contacted after an enquiry.</li>
            <li>Nominate another person to exercise your rights in case of death or incapacity.</li>
            <li>Raise a grievance with us, and if unresolved, with the Data Protection Board of India.</li>
          </ul>
          <p>To make a request, email {mail}. We will respond within 30 days.</p>
        </Section>

        <Section id="grievance" title="10. Grievance contact">
          <address className="legal-address">
            <strong>{company.founder}</strong>, Founder — Grievance Officer<br />
            JAQYI, {company.address.streetAddress}, {company.address.addressLocality}, {company.address.addressRegion} 452001, India<br />
            Email: {mail}<br />
            Phone: <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          </address>
        </Section>

        <Section id="security" title="11. Security">
          <p>
            We use HTTPS encryption, restricted access to our systems, spam and abuse protection on our forms, and
            password-protected internal dashboards. No method of transmission or storage is 100% secure, but we work to
            protect your data and will notify affected people and authorities of a breach where the law requires it.
          </p>
        </Section>

        <Section id="links" title="12. Other websites">
          <p>
            Our website links to other sites, such as LinkedIn, X, WhatsApp, Doott and live client projects. We are
            not responsible for their privacy practices; please read their policies.
          </p>
        </Section>

        <Section id="children" title="13. Children">
          <p>
            Our website and services are not intended for anyone under 18, and we do not knowingly collect their
            personal data. If you believe a child has shared data with us, contact us and we will delete it.
          </p>
        </Section>

        <Section id="changes" title="14. Changes to this policy">
          <p>
            We may update this policy as our website and services change. We will update the &quot;Last
            updated&quot; date above, and for significant changes we will add a notice on the website.
          </p>
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
