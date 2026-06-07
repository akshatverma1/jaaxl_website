"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '@/data/mock';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlimmeringMap from '@/components/GlimmeringMap';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <GlimmeringMap dotSpacing={5.5} glimmerRate={6} dimOpacity={0.24} glowBlur={30} />
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

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {heroData.company}
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {heroData.tagline}
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {heroData.description}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
            opacity: { delay: 1.2, duration: 0.6 },
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
