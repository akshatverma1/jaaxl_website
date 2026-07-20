"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '@/data/mock';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Stagger container — each letter staggers in from below with blur
const titleContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};

const letterVariant = {
  hidden: {
    opacity: 0,
    y: 56,
    filter: 'blur(14px)',
    rotateX: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};

const TITLE = 'JAQYI';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="sparkle-icon" />
            <span>Software Excellence</span>
          </motion.div>

          {/* ── Animated JAQYI heading ── */}
          <motion.h1
            className="hero-title"
            variants={titleContainer}
            initial="hidden"
            animate="show"
            aria-label={TITLE}
          >
            {/* Letter-by-letter with overflow clip */}
            <span className="hero-title-inner" aria-hidden>
              {TITLE.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="hero-letter"
                  variants={letterVariant}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Gradient shimmer overlay — clipped to text */}
            <span className="hero-title-shimmer" aria-hidden>
              {TITLE}
            </span>
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            {heroData.tagline}
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {heroData.description}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Button asChild className="cta-primary">
              <a href="#portfolio">
                {heroData.cta.primary}
                <ArrowRight className="cta-icon" />
              </a>
            </Button>
            <Button asChild variant="outline" className="cta-secondary hover:text-white">
              <a href="#contact">
                {heroData.cta.secondary}
              </a>
            </Button>
          </motion.div>
        </motion.div>

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
