import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Code, Cloud, Database, Globe, Box, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Phone, Mail, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageSEO from '../components/SEO/PageSEO';
import { Button } from '../components/ui/button';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jaqyi.com/services/web-development#service",
      "name": "Web Development Services",
      "provider": { "@id": "https://jaqyi.com/#organization" },
      "description": "Custom web development services including website design, WordPress development, SaaS platforms, and ERP systems for businesses in India and USA.",
      "serviceType": "Web Development",
      "areaServed": ["India", "United States"],
      "url": "https://jaqyi.com/services/web-development",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design & Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WordPress Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Platform Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ERP System Development" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does web development cost in India?",
          "acceptedAnswer": { "@type": "Answer", "text": "Web development costs in India vary by complexity. A basic business website starts from ₹25,000–₹75,000. A custom React/Next.js web application ranges from ₹1,00,000–₹5,00,000. A full SaaS platform can range from ₹5,00,000–₹20,00,000+. JAQYI provides transparent, milestone-based pricing after a free consultation." }
        },
        {
          "@type": "Question",
          "name": "How long does it take to build a website?",
          "acceptedAnswer": { "@type": "Answer", "text": "A basic website takes 2–4 weeks. A custom business website with CMS takes 4–8 weeks. A complex web application or SaaS platform takes 3–6 months. JAQYI follows agile sprints so you see working software every 2 weeks." }
        },
        {
          "@type": "Question",
          "name": "Which technologies does JAQYI use for web development?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI uses React.js, Next.js, and Vue.js for the frontend; Node.js, Python, and Django for the backend; PostgreSQL and MongoDB for databases; and AWS, Vercel, or DigitalOcean for cloud hosting. We choose the best stack for your specific project." }
        },
        {
          "@type": "Question",
          "name": "Can JAQYI build a website for my US-based business?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAQYI serves clients across the USA, UK, and globally. We work in your timezone, provide weekly video calls, and use project management tools like Notion and Linear to keep you updated every step of the way." }
        },
        {
          "@type": "Question",
          "name": "Do you provide website maintenance after launch?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAQYI offers ongoing website maintenance, security updates, performance optimization, and feature development. We provide monthly retainer packages to ensure your website stays fast, secure, and up-to-date." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://jaqyi.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "Web Development", "item": "https://jaqyi.com/services/web-development" }
      ]
    }
  ]
};

const services = [
  { icon: Monitor, name: "Website Design & Development", desc: "Stunning, conversion-focused websites built with React, Next.js, and modern web standards. Mobile-first, lightning-fast, and SEO-optimized." },
  { icon: Box, name: "WordPress Development", desc: "Custom WordPress themes, plugins, and WooCommerce stores. Fully managed and easy to update without technical knowledge." },
  { icon: Cloud, name: "SaaS Platform Development", desc: "Scalable software-as-a-service products with subscription billing, multi-tenancy, role-based access, and API integrations." },
  { icon: Database, name: "ERP & CRM Development", desc: "Enterprise resource planning and CRM systems tailored to your exact workflows — manufacturing, logistics, healthcare, and more." },
  { icon: Globe, name: "E-Commerce Development", desc: "High-converting online stores with secure payments, inventory management, and seamless checkout experiences." },
  { icon: Code, name: "API & Backend Development", desc: "Robust RESTful and GraphQL APIs, microservices architecture, and database design to power any digital product." },
];

const technologies = ["React.js", "Next.js", "Node.js", "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Vercel", "Docker", "WordPress", "GraphQL"];

const faqs = [
  { q: "How much does web development cost in India?", a: "Web development costs vary by complexity. A basic business website starts from ₹25,000–₹75,000. A custom React/Next.js application ranges from ₹1,00,000–₹5,00,000. A full SaaS platform ranges from ₹5,00,000–₹20,00,000+. We offer transparent, milestone-based pricing after a free consultation." },
  { q: "How long does it take to build a website?", a: "A basic website takes 2–4 weeks. A custom business website with CMS takes 4–8 weeks. A complex web application or SaaS platform takes 3–6 months. We follow agile sprints so you see working software every 2 weeks." },
  { q: "Which technologies does JAQYI use for web development?", a: "We use React.js, Next.js, and Vue.js for frontend; Node.js, Python, and Django for backend; PostgreSQL and MongoDB for databases; and AWS, Vercel, or DigitalOcean for hosting. We choose the best stack for your project." },
  { q: "Can JAQYI build a website for my US-based business?", a: "Yes. We serve clients across the USA, UK, and globally. We work in your timezone, provide weekly video calls, and use project management tools to keep you updated at every step." },
  { q: "Do you provide website maintenance after launch?", a: "Yes. We offer ongoing maintenance, security updates, performance optimization, and feature development through monthly retainer packages." },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="svc-page-faq-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button className="svc-page-faq-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{faq.q}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="svc-page-faq-answer">{faq.a}</div>}
    </motion.div>
  );
};

const WebDevelopment = () => (
  <div className="svc-page">
    <PageSEO
      title="Web Development Company in India | Custom Web Development Services — JAQYI"
      description="JAQYI is a leading web development company in India offering custom website design, React/Next.js development, WordPress, SaaS, and ERP solutions for businesses in India and USA. Get a free quote today."
      canonical="https://jaqyi.com/services/web-development"
      keywords={[
        'web development company india', 'web development services', 'website development company',
        'custom web development', 'react development india', 'next.js development',
        'web development indore', 'SaaS development india', 'ERP development india',
        'website design company india', 'web development company USA', 'web development agency'
      ]}
      schema={schema}
    />
    <Header />

    {/* Hero */}
    <section className="svc-page-hero">
      <div className="svc-page-hero-inner">
        <motion.div className="svc-page-breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">Home</Link> <span>/</span> <Link to="/#services">Services</Link> <span>/</span> <span>Web Development</span>
        </motion.div>
        <motion.h1 className="svc-page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Web Development Company in India
        </motion.h1>
        <motion.p className="svc-page-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          We build high-performance websites, web applications, SaaS platforms, and ERP systems that drive real business growth. Serving clients across India, USA, and globally.
        </motion.p>
        <motion.div className="svc-page-hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button asChild className="cta-primary">
            <a href="/#contact">Get a Free Quote <ArrowRight size={18} /></a>
          </Button>
          <Button asChild variant="outline" className="cta-secondary hover:text-white">
            <a href="/#portfolio">View Our Work</a>
          </Button>
        </motion.div>
        <div className="svc-page-trust">
          {["50+ Projects Delivered", "7+ Years Experience", "India & USA Clients"].map(t => (
            <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Web Development Services</h2>
          <p className="section-subtitle">End-to-end web solutions — from simple landing pages to complex enterprise platforms</p>
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
            <h2 className="section-title" style={{ textAlign: 'left' }}>Why Choose JAQYI for Web Development?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
              We're not a body-shop or a template factory. Every website we build is a custom-engineered product 
              designed to convert visitors into customers. Our team of senior React and Node.js engineers bring 
              7+ years of production experience to every project.
            </p>
            {[
              "Clean, maintainable code — no page builders or shortcuts",
              "SEO-optimized from day one — proper semantics, performance, and meta",
              "Mobile-first design that works perfectly on all devices",
              "Transparent communication — weekly calls and real-time project updates",
              "Post-launch support and maintenance included",
              "Serving clients in India, USA, UK, and beyond",
            ].map(item => (
              <div key={item} className="svc-page-why-item">
                <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="svc-page-why-stats" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[["50+", "Websites Delivered"], ["7+", "Years Experience"], ["20+", "Happy Clients"], ["100%", "On-Time Delivery"]].map(([v, l]) => (
              <div key={l} className="stat-card">
                <h3 className="stat-value">{v}</h3>
                <p className="stat-label">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Technologies */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Technologies We Use</h2>
          <p className="section-subtitle">Modern, battle-tested technology stacks for every project</p>
        </motion.div>
        <div className="svc-page-tech-grid">
          {technologies.map((tech, i) => (
            <motion.div key={tech} className="svc-page-tech-badge" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="svc-page-section svc-page-section--alt">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Development Process</h2>
          <p className="section-subtitle">A proven process that delivers results, on time and on budget</p>
        </motion.div>
        <div className="svc-page-process">
          {[
            { n: "01", title: "Discovery & Planning", desc: "We understand your business goals, target users, and technical requirements. We define the scope, timeline, and technology stack." },
            { n: "02", title: "Design & Prototyping", desc: "UI/UX wireframes and high-fidelity mockups. You approve the design before a single line of code is written." },
            { n: "03", title: "Development & Testing", desc: "Agile sprints with bi-weekly demos. Automated testing, code reviews, and QA at every step." },
            { n: "04", title: "Launch & Growth", desc: "Deployment to production, SEO setup, analytics integration, and ongoing support to grow your digital presence." },
          ].map((step, i) => (
            <motion.div key={step.n} className="svc-page-process-step" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
              <div className="svc-page-process-num">{step.n}</div>
              <h3 className="service-name">{step.title}</h3>
              <p className="service-description">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="svc-page-section">
      <div className="svc-page-container svc-page-faq-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about our web development services</p>
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
          <h2>Ready to Build Your Next Website?</h2>
          <p>Get a free consultation and quote within 24 hours. No commitment required.</p>
          <div className="svc-page-cta-btns">
            <Button asChild className="cta-primary">
              <a href="/#contact">Start Your Project <ArrowRight size={18} /></a>
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

export default WebDevelopment;
