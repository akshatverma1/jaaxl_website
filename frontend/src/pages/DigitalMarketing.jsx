import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Target, Share2, FileText, MapPin, TrendingUp, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageSEO from '../components/SEO/PageSEO';
import { Button } from '../components/ui/button';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jaqyi.com/services/digital-marketing#service",
      "name": "Digital Marketing Services",
      "provider": { "@id": "https://jaqyi.com/#organization" },
      "description": "Comprehensive digital marketing services including SEO, PPC, social media management, content marketing, and local SEO for businesses in India and USA.",
      "serviceType": "Digital Marketing",
      "areaServed": ["India", "United States"],
      "url": "https://jaqyi.com/services/digital-marketing"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does SEO cost in India?",
          "acceptedAnswer": { "@type": "Answer", "text": "SEO pricing in India typically ranges from ₹10,000–₹30,000/month for local businesses, ₹30,000–₹80,000/month for national campaigns, and ₹80,000–₹2,00,000+/month for enterprise and competitive niches. JAQYI offers performance-focused SEO packages with clear monthly reporting on keyword rankings, traffic, and conversions." }
        },
        {
          "@type": "Question",
          "name": "How long does SEO take to show results?",
          "acceptedAnswer": { "@type": "Answer", "text": "SEO is a long-term investment. You typically start seeing initial improvements in 3–4 months, significant traffic growth in 6–9 months, and strong ranking positions in 9–12 months. With a new website, results can take slightly longer. JAQYI uses white-hat techniques that produce sustainable, long-term growth." }
        },
        {
          "@type": "Question",
          "name": "What is the difference between SEO and PPC?",
          "acceptedAnswer": { "@type": "Answer", "text": "SEO (Search Engine Optimization) is organic — you rank for free by optimizing your website content and getting backlinks. Results take months but are long-lasting. PPC (Pay-Per-Click) like Google Ads gives immediate traffic but you pay for every click. JAQYI recommends a combined strategy: PPC for immediate results while SEO builds long-term organic traffic." }
        },
        {
          "@type": "Question",
          "name": "Can digital marketing help my local business get more customers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Local SEO, Google My Business optimization, and local PPC campaigns are highly effective for businesses that serve a specific city or region. JAQYI's local SEO service helps businesses in Indore, across India, and in the USA dominate local search results and attract nearby customers." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://jaqyi.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "Digital Marketing", "item": "https://jaqyi.com/services/digital-marketing" }
      ]
    }
  ]
};

const services = [
  { icon: Search, name: "Search Engine Optimization (SEO)", desc: "Technical SEO, on-page optimization, link building, and content strategy to rank your website on Google's first page for your target keywords." },
  { icon: Target, name: "PPC & Performance Marketing", desc: "Google Ads, Meta Ads, and LinkedIn Ads campaigns laser-targeted for maximum ROI. We optimize for conversions, not just clicks." },
  { icon: Share2, name: "Social Media Management", desc: "Content creation, scheduling, community management, and growth strategies across Instagram, LinkedIn, Facebook, and X (Twitter)." },
  { icon: FileText, name: "Content Marketing", desc: "SEO-optimized blog posts, case studies, whitepapers, and landing page copy that attract, engage, and convert your target audience." },
  { icon: MapPin, name: "Local SEO", desc: "Google My Business optimization, local citations, and geo-targeted content to dominate 'near me' searches in your city." },
  { icon: TrendingUp, name: "Analytics & Reporting", desc: "Clear monthly reports on keyword rankings, organic traffic, ad performance, and conversion rates — no vanity metrics." },
];

const faqs = [
  { q: "How much does SEO cost in India?", a: "SEO pricing ranges from ₹10,000–₹30,000/month for local businesses, ₹30,000–₹80,000/month for national campaigns, and ₹80,000–₹2,00,000+/month for competitive niches. We offer performance-focused packages with clear monthly reporting." },
  { q: "How long does SEO take to show results?", a: "You typically see initial improvements in 3–4 months, significant traffic growth in 6–9 months, and strong rankings in 9–12 months. JAQYI uses white-hat techniques that produce sustainable, long-term growth." },
  { q: "What is the difference between SEO and PPC?", a: "SEO is organic — you rank for free by optimizing your website. Results take months but are long-lasting. PPC gives immediate traffic but you pay for every click. We recommend combining both: PPC for immediate results while SEO builds long-term organic traffic." },
  { q: "Can digital marketing help my local business get more customers?", a: "Absolutely. Local SEO, Google My Business optimization, and local PPC campaigns are highly effective for city-based businesses. JAQYI's local SEO service helps businesses in Indore, across India, and in the USA dominate local search results." },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="svc-page-faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
      <button className="svc-page-faq-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{faq.q}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="svc-page-faq-answer">{faq.a}</div>}
    </motion.div>
  );
};

const DigitalMarketing = () => (
  <div className="svc-page">
    <PageSEO
      title="Digital Marketing Agency in India | SEO, PPC & Social Media — JAQYI"
      description="JAQYI is a results-driven digital marketing agency in India offering SEO, PPC, social media management, content marketing, and local SEO services for businesses in India and USA."
      canonical="https://jaqyi.com/services/digital-marketing"
      keywords={[
        'digital marketing agency india', 'SEO company india', 'PPC services india',
        'social media marketing india', 'SEO agency indore', 'digital marketing indore',
        'content marketing agency india', 'local SEO india', 'google ads agency india',
        'digital marketing services india', 'SEO services india', 'performance marketing india'
      ]}
      schema={schema}
    />
    <Header />

    {/* Hero */}
    <section className="svc-page-hero">
      <div className="svc-page-hero-inner">
        <motion.div className="svc-page-breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">Home</Link> <span>/</span> <Link to="/#services">Services</Link> <span>/</span> <span>Digital Marketing</span>
        </motion.div>
        <motion.h1 className="svc-page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Digital Marketing Agency in India
        </motion.h1>
        <motion.p className="svc-page-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          Data-driven SEO, PPC, social media, and content marketing that drives real traffic, real leads, and real revenue. We've doubled organic traffic for clients in 6 months — and we can do it for you too.
        </motion.p>
        <motion.div className="svc-page-hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button asChild className="cta-primary">
            <a href="/#contact">Get a Free Audit <ArrowRight size={18} /></a>
          </Button>
          <Button asChild variant="outline" className="cta-secondary hover:text-white">
            <a href="/#portfolio">See Our Results</a>
          </Button>
        </motion.div>
        <div className="svc-page-trust">
          {["2x Traffic in 6 Months", "Google Ads Certified", "White-Hat SEO Only"].map(t => (
            <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Digital Marketing Services</h2>
          <p className="section-subtitle">Full-funnel digital marketing that attracts, engages, and converts</p>
        </motion.div>
        <div className="svc-page-grid">
          {services.map((s, i) => (
            <motion.div key={s.name} className="svc-page-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="service-icon-wrapper"><s.icon className="service-icon" /></div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-description">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why JAQYI */}
    <section className="svc-page-section svc-page-section--alt">
      <div className="svc-page-container">
        <div className="svc-page-why">
          <motion.div className="svc-page-why-content" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Why Choose JAQYI for Digital Marketing?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
              We combine deep technical SEO knowledge with creative content strategy and data-driven ad 
              management to deliver measurable results. We don't chase vanity metrics — we focus on 
              organic traffic, qualified leads, and conversion rates that actually grow your business.
            </p>
            {[
              "Transparent monthly reporting — you see exactly what we're doing",
              "No black-hat shortcuts — only white-hat, sustainable SEO",
              "AI-assisted keyword research and content optimization",
              "Full Google Analytics 4 and Search Console setup",
              "Dedicated account manager and bi-weekly strategy calls",
              "Serving businesses in India, USA, and globally",
            ].map(item => (
              <div key={item} className="svc-page-why-item">
                <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="svc-page-why-stats" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[["2x", "Avg Traffic Growth"], ["6 mo", "To Top Rankings"], ["3.5x", "Avg ROAS on Ads"], ["20+", "Clients Served"]].map(([v, l]) => (
              <div key={l} className="stat-card">
                <h3 className="stat-value">{v}</h3>
                <p className="stat-label">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="svc-page-section">
      <div className="svc-page-container svc-page-faq-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Common questions about digital marketing services</p>
        </motion.div>
        <div className="svc-page-faq">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="svc-page-cta">
      <div className="svc-page-container">
        <motion.div className="svc-page-cta-inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Ready to Grow Your Online Presence?</h2>
          <p>Get a free website audit and digital marketing strategy within 48 hours.</p>
          <div className="svc-page-cta-btns">
            <Button asChild className="cta-primary">
              <a href="/#contact">Get a Free Audit <ArrowRight size={18} /></a>
            </Button>
            <a href="mailto:akshat@jaqyi.com" className="svc-page-contact-link"><Mail size={16} />akshat@jaqyi.com</a>
            <a href="tel:+919109621850" className="svc-page-contact-link"><Phone size={16} />+91 9109621850</a>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default DigitalMarketing;
