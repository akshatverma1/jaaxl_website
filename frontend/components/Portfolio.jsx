"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/data/mock';
import { ArrowUpRight } from 'lucide-react';
import MobileSlider from '@/components/ui/MobileSlider';
import GlimmeringMap from '@/components/GlimmeringMap';

/** Mobile version — full-bleed image card */
const ProjectCardMobile = ({ project }) => (
  <div className="proj-card-mobile">
    <div className="proj-card-mobile__img-wrap">
      <img
        src={project.image}
        alt={project.name}
        className="proj-card-mobile__img"
      />
      <div className="proj-card-mobile__overlay">
        <div className="proj-card-mobile__overlay-icon">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
    <div className="proj-card-mobile__info">
      <span className="proj-card-mobile__cat">{project.category}</span>
      <h3 className="proj-card-mobile__name">{project.name}</h3>
      <p className="proj-card-mobile__desc">{project.description}</p>
    </div>
  </div>
);

/** Desktop version — original animated card */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="project-image-wrapper">
        <motion.img
          src={project.image}
          alt={project.name}
          className="project-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="project-overlay">
          <motion.div
            className="project-overlay-icon"
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="portfolio-section">
      <GlimmeringMap dotSpacing={7} glimmerRate={4} />
      <div className="portfolio-container">
        <motion.div
          ref={titleRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{portfolioData.title}</h2>
          <p className="section-subtitle">{portfolioData.subtitle}</p>
        </motion.div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="projects-grid hide-on-mobile">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ── Mobile: smooth slider ── */}
        <div className="show-on-mobile">
          <MobileSlider darkTheme>
            {portfolioData.projects.map((project) => (
              <ProjectCardMobile key={project.id} project={project} />
            ))}
          </MobileSlider>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
