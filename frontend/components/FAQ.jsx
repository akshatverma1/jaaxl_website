'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/faqs';




const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="faq-item">
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
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <p className="faq-answer">{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="section-header">
          <h2 className="section-title faq-title">Frequently Asked Questions</h2>
          <p className="section-subtitle faq-subtitle">
            Everything you need to know before working with us
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA below FAQ */}
        <div className="faq-cta">
          <p className="faq-cta-text">Still have questions?</p>
          <a href="#contact" className="faq-cta-link">
            Talk to us directly →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
