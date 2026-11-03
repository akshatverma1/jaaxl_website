"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '@/data/mock';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TITLE = 'JAQYI';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="sparkle-icon" />
            <span>{heroData.badge}</span>
          </div>

          {/* ── JAQYI heading ── */}
          {/* Visual wordmark — the descriptive tagline below is the page's h1 */}
          <p className="hero-title" aria-label={TITLE}>
            <span className="hero-title-inner" aria-hidden>
              {TITLE.split('').map((char, i) => (
                <span key={i} className="hero-letter" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </span>

            {/* Gradient shimmer overlay */}
            <span className="hero-title-shimmer" aria-hidden>
              {TITLE}
            </span>
          </p>

          <h1 className="hero-tagline">
            {heroData.tagline}
          </h1>

          <p className="hero-description">
            {heroData.description}
          </p>

          <div className="hero-cta">
            <Button asChild className="cta-primary">
              <Link href={heroData.cta.primary.href}>
                {heroData.cta.primary.label}
                <ArrowRight className="cta-icon" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="cta-secondary hover:text-white">
              <Link href={heroData.cta.secondary.href}>
                {heroData.cta.secondary.label}
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.4, duration: 0.6 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="scroll-line" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
