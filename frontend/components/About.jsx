"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/data/mock';
import { CheckCircle2 } from 'lucide-react';

const StatCard = ({ stat }) => {
  return (
    <div className="stat-card">
      <h3 className="stat-value">
        {stat.value}
      </h3>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
};

const ValueCard = ({ value }) => {
  return (
    <div className="value-card">
      <CheckCircle2 className="value-icon" />
      <h3 className="value-title">{value.title}</h3>
      <p className="value-description">{value.description}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">{aboutData.title}</h2>
        </div>

        <p className="about-mission">
          {aboutData.mission}
        </p>

        <div className="values-grid">
          {aboutData.values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>

        <div className="stats-grid">
          {aboutData.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
