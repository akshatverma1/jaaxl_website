'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How much does a website or web app cost?',
    a: 'Pricing depends on scope and complexity. A professional business website typically starts from ₹25,000–₹75,000. A custom React or Next.js web application ranges from ₹1,00,000–₹5,00,000. A full SaaS or ERP platform starts from ₹5,00,000+. We provide a transparent, milestone-based quote after a free consultation — no surprises.',
  },
  {
    q: 'How long does it take to build a mobile app?',
    a: 'A simple MVP app takes 2–3 months. A medium-complexity app with backend and integrations takes 3–5 months. An enterprise-grade app can take 5–9 months. We work in 2-week agile sprints so you see real, working software at every milestone — not just promises.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Absolutely. We serve clients across the USA, UK, UAE, Australia, and Europe. We align with your timezone for calls, use tools like Notion and Linear for full project transparency, and deliver weekly progress updates so you always know where things stand.',
  },
  {
    q: 'Can you integrate AI into my existing software or website?',
    a: 'Yes — this is one of our specialities. We add AI capabilities (chatbots, recommendation engines, document Q&A, data extraction, automation pipelines) to existing CRMs, ERPs, mobile apps, and websites via clean APIs. You don\'t need to rebuild your entire system.',
  },
  {
    q: 'What is your development process?',
    a: 'We follow a 4-step process: (1) Discovery — understand your goals, users, and constraints; (2) Design — wireframes and prototypes you approve before coding starts; (3) Development — agile sprints with bi-weekly demos; (4) Launch & Growth — deployment, SEO setup, analytics, and ongoing support.',
  },
  {
    q: 'Do you provide maintenance and support after launch?',
    a: 'Yes. All projects include a 30-day bug-fix warranty at no extra cost. After that, we offer monthly retainer packages for ongoing maintenance, security updates, performance monitoring, and new feature development. We build long-term relationships, not one-off transactions.',
  },
  {
    q: 'What technologies do you use?',
    a: 'For web: React, Next.js, Node.js, Python/Django, PostgreSQL, MongoDB. For mobile: Flutter, React Native, Swift, Kotlin. For AI: OpenAI GPT-4o, LangChain, LlamaIndex, Supabase, ChromaDB, FastAPI. For cloud: AWS, Vercel, Google Cloud, DigitalOcean. We choose the best stack for your project, not the one we\'re most comfortable with.',
  },
  {
    q: 'Can you handle the full project from design to deployment?',
    a: 'Yes — we are a full-service studio. We handle UI/UX design, frontend and backend development, database architecture, cloud infrastructure, app store submissions, SEO, and post-launch support. One team, one point of contact, end-to-end ownership.',
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <motion.div
    className="faq-item"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
  >
    <button
      className="faq-question"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span>{faq.q}</span>
      <span className="faq-icon">
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="faq-answer-wrapper"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <p className="faq-answer">{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title faq-title">Frequently Asked Questions</h2>
          <p className="section-subtitle faq-subtitle">
            Everything you need to know before working with us
          </p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA below FAQ */}
        <motion.div
          className="faq-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="faq-cta-text">Still have questions?</p>
          <a href="#contact" className="faq-cta-link">
            Talk to us directly →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
