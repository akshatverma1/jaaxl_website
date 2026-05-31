'use client';

import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'OpenAI', icon: '⬡', color: '#10a37f' },
  { name: 'Claude', icon: '◈', color: '#d97706' },
  { name: 'React', icon: '⚛', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'Flutter', icon: '◆', color: '#54c5f8' },
  { name: 'AWS', icon: '☁', color: '#ff9900' },
  { name: 'Supabase', icon: '⚡', color: '#3ecf8e' },
  { name: 'Stripe', icon: '⟠', color: '#635bff' },
  { name: 'n8n', icon: '⬡', color: '#ea4b71' },
  { name: 'Zapier', icon: '⚡', color: '#ff4a00' },
  { name: 'HubSpot', icon: '⊙', color: '#ff7a59' },
  { name: 'MongoDB', icon: '◉', color: '#4db33d' },
  { name: 'Vercel', icon: '▲', color: '#ffffff' },
  { name: 'Firebase', icon: '🔥', color: '#ffca28' },
  { name: 'LangChain', icon: '⛓', color: '#1c3a4a' },
];

// Double the list for seamless infinite loop
const doubled = [...partners, ...partners];

const TrustedPartners = () => {
  return (
    <section className="partners-section">
      <p className="partners-label">TRUSTED INTEGRATIONS &amp; PARTNERS</p>

      <div className="partners-track-wrapper">
        <motion.div
          className="partners-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {doubled.map((p, i) => (
            <div className="partner-item" key={i}>
              <span className="partner-icon" style={{ color: p.color }}>
                {p.icon}
              </span>
              <span className="partner-name">{p.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="partners-fade-left" />
        <div className="partners-fade-right" />
      </div>
    </section>
  );
};

export default TrustedPartners;
