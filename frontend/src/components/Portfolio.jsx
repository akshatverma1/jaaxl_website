import React from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
  const titleRef = React.useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="portfolio-section">
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

        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
