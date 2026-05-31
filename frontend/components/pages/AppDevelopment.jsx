"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Smartphone, Tablet, Layers, Code, Grid, Globe, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jaqyi.com/services/app-development#service",
      "name": "Mobile App Development Services",
      "provider": { "@id": "https://jaqyi.com/#organization" },
      "description": "Custom iOS and Android mobile app development using Flutter, React Native, and native technologies for businesses in India and USA.",
      "serviceType": "Mobile App Development",
      "areaServed": ["India", "United States"],
      "url": "https://jaqyi.com/services/app-development"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does mobile app development cost in India?",
          "acceptedAnswer": { "@type": "Answer", "text": "Mobile app development costs in India vary by complexity. A simple app with basic features costs ₹1,00,000–₹3,00,000. A medium-complexity app costs ₹3,00,000–₹8,00,000. An enterprise-grade app with backend, admin panel, and multiple integrations can cost ₹8,00,000–₹25,00,000+. JAQYI provides detailed quotes after a free discovery call." }
        },
        {
          "@type": "Question",
          "name": "How long does it take to develop a mobile app?",
          "acceptedAnswer": { "@type": "Answer", "text": "A simple mobile app takes 2–3 months. A medium-complexity app with backend takes 3–5 months. An enterprise app with complex features takes 5–9 months. We use agile development so you can see the app progressing every sprint." }
        },
        {
          "@type": "Question",
          "name": "Flutter vs React Native — which is better for my app?",
          "acceptedAnswer": { "@type": "Answer", "text": "Both are excellent cross-platform frameworks. Flutter offers better performance and pixel-perfect UI consistency across iOS and Android, making it great for consumer apps. React Native is ideal if you already have a React web codebase or need deep JavaScript ecosystem integration. JAQYI recommends Flutter for most new projects." }
        },
        {
          "@type": "Question",
          "name": "Do you publish the app to the App Store and Google Play?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAQYI handles the complete app store submission process for both Apple App Store and Google Play Store, including creating developer accounts, writing store listings, preparing screenshots, and navigating the review process." }
        },
        {
          "@type": "Question",
          "name": "Can you build an app for both iOS and Android?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Using Flutter or React Native, we build a single codebase that runs natively on both iOS and Android, reducing cost and time-to-market significantly without compromising on quality or performance." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://jaqyi.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "App Development", "item": "https://jaqyi.com/services/app-development" }
      ]
    }
  ]
};

const services = [
  { icon: Smartphone, name: "iOS App Development", desc: "Native Swift and SwiftUI apps for iPhone and iPad with seamless Apple ecosystem integration, iCloud sync, and App Store distribution." },
  { icon: Tablet, name: "Android App Development", desc: "Kotlin and Jetpack Compose Android apps with Material Design, Google Play integration, and support for all Android device sizes." },
  { icon: Layers, name: "Flutter App Development", desc: "Cross-platform Flutter apps with a single codebase for iOS, Android, and web. Pixel-perfect UI and near-native performance." },
  { icon: Code, name: "React Native Development", desc: "Build once, deploy everywhere. React Native apps with JavaScript that run smoothly on both iOS and Android." },
  { icon: Grid, name: "Hybrid App Development", desc: "Cost-effective Ionic and Capacitor apps that combine web technologies with native device capabilities." },
  { icon: Globe, name: "Progressive Web Apps (PWA)", desc: "Web apps that work offline, install like native apps, and deliver native-like performance without an app store." },
];

const technologies = ["Flutter", "React Native", "Swift", "Kotlin", "Dart", "Firebase", "Node.js", "GraphQL", "AWS", "PostgreSQL", "Redis", "Stripe"];

const faqs = [
  { q: "How much does mobile app development cost in India?", a: "A simple app costs ₹1,00,000–₹3,00,000. A medium-complexity app costs ₹3,00,000–₹8,00,000. An enterprise app with backend and integrations can cost ₹8,00,000–₹25,00,000+. We provide detailed quotes after a free discovery call." },
  { q: "How long does it take to develop a mobile app?", a: "A simple app takes 2–3 months. A medium app with backend takes 3–5 months. An enterprise app takes 5–9 months. We use agile sprints so you see progress every two weeks." },
  { q: "Flutter vs React Native — which is better for my app?", a: "Flutter offers better performance and pixel-perfect UI consistency, making it ideal for most new consumer apps. React Native is better if you have an existing React web codebase. JAQYI recommends Flutter for most new projects." },
  { q: "Do you publish the app to the App Store and Google Play?", a: "Yes. We handle the complete submission process for both Apple App Store and Google Play, including store listings, screenshots, and navigating the review process." },
  { q: "Can you build an app for both iOS and Android?", a: "Yes. Using Flutter or React Native, we build a single codebase that runs natively on both platforms, reducing cost and time-to-market significantly." },
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

const AppDevelopment = () => (
  <div className="svc-page">
    <Header />

    {/* Hero */}
    <section className="svc-page-hero">
      <div className="svc-page-hero-inner">
        <motion.div className="svc-page-breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/">Home</Link> <span>/</span> <Link href="/#services">Services</Link> <span>/</span> <span>App Development</span>
        </motion.div>
        <motion.h1 className="svc-page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Mobile App Development Company in India
        </motion.h1>
        <motion.p className="svc-page-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          We build exceptional iOS, Android, Flutter, and React Native apps that users love. From startup MVPs to enterprise-scale mobile platforms — delivered on time, every time.
        </motion.p>
        <motion.div className="svc-page-hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button asChild className="cta-primary">
            <a href="/#contact">Get a Free Quote <ArrowRight size={18} /></a>
          </Button>
          <Button asChild variant="outline" className="cta-secondary hover:text-white">
            <a href="/#portfolio">View Our Apps</a>
          </Button>
        </motion.div>
        <div className="svc-page-trust">
          {["iOS & Android Experts", "Flutter Certified", "App Store Ready"].map(t => (
            <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Mobile App Development Services</h2>
          <p className="section-subtitle">Full-stack mobile development from concept to App Store — for every platform</p>
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
            <h2 className="section-title" style={{ textAlign: 'left' }}>Why Choose JAQYI for App Development?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
              We've built mobile apps from 0 to 100,000+ users. Our team doesn't just write code — we think about 
              retention, onboarding, performance, and user experience at every step. We've shipped apps across 
              fintech, healthcare, e-commerce, logistics, and SaaS industries.
            </p>
            {[
              "Full-stack app development — frontend, backend, and cloud infrastructure",
              "Performance-optimized — smooth 60fps animations and fast load times",
              "App Store and Google Play submission handled end-to-end",
              "Post-launch analytics setup (Firebase, Mixpanel, Amplitude)",
              "Push notifications, deep linking, and offline mode",
              "Dedicated project manager and weekly progress reports",
            ].map(item => (
              <div key={item} className="svc-page-why-item">
                <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="svc-page-why-stats" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[["20+", "Apps Launched"], ["100K+", "End Users Reached"], ["4.8★", "Average App Rating"], ["5+", "App Categories"]].map(([v, l]) => (
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
          <p className="section-subtitle">Industry-leading frameworks and tools for mobile development</p>
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

    {/* FAQ */}
    <section className="svc-page-section svc-page-section--alt">
      <div className="svc-page-container svc-page-faq-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about mobile app development</p>
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
          <h2>Ready to Build Your App?</h2>
          <p>Tell us your idea and we'll turn it into a polished, production-ready mobile app.</p>
          <div className="svc-page-cta-btns">
            <Button asChild className="cta-primary">
              <a href="/#contact">Start Your App <ArrowRight size={18} /></a>
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

export default AppDevelopment;
