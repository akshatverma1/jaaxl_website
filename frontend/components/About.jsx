"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutData } from '@/data/mock';
import { CheckCircle2 } from 'lucide-react';

const StatCard = ({ stat, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px 50px 0px' });

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.15) }}
    >
      <motion.h3 
        className="stat-value"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05 + 0.1, 0.25) }}
      >
        {stat.value}
      </motion.h3>
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  );
};

const ValueCard = ({ value, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="value-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.15) }}
    >
      <CheckCircle2 className="value-icon" />
      <h3 className="value-title">{value.title}</h3>
      <p className="value-description">{value.description}</p>
    </motion.div>
  );
};

const About = () => {
  const titleRef = React.useRef(null);
  const missionRef = React.useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "0px 0px 50px 0px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "0px 0px 50px 0px" });

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          ref={titleRef}
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="section-title">{aboutData.title}</h2>
        </motion.div>

        <motion.p
          ref={missionRef}
          className="about-mission"
          initial={{ opacity: 0, y: 15 }}
          animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {aboutData.mission}
        </motion.p>

        <div className="values-grid">
          {aboutData.values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

        <div className="stats-grid">
          {aboutData.stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
