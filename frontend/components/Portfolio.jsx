"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/data/mock';
import { ArrowUpRight, Play, ExternalLink, Video } from 'lucide-react';
import MobileSlider from '@/components/ui/MobileSlider';
import GlimmeringMap from '@/components/GlimmeringMap';

/** ── Desktop Video Card ─────────────────────────────────────────────── */
const VideoProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      className="project-card project-card--video"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video badge */}
      <div className="proj-video-badge">
        <Video size={11} />
        <span>Demo</span>
      </div>

      <div className="project-image-wrapper">
        {/* Video element */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          className={`project-video ${isHovered ? 'project-video--visible' : ''}`}
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Fallback image */}
        <img
          src={project.image}
          alt={project.name}
          className={`project-image project-image--video-fallback ${isHovered ? 'project-image--hidden' : ''}`}
        />

        {/* Overlay */}
        <div className={`project-overlay ${isHovered ? 'project-overlay--visible' : ''}`}>
          <div className="project-overlay-icon">
            <Play size={20} fill="currentColor" />
          </div>
          <div className="proj-overlay-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-overlay-link"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
                <span>Live Site</span>
              </a>
            )}
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-overlay-link"
              onClick={(e) => e.stopPropagation()}
            >
              <Play size={14} />
              <span>Watch Demo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="project-info">
        <div className="proj-meta-row">
          <span className="project-category">{project.category}</span>
          {project.liveUrl && (
            <span className="proj-live-badge">● Live</span>
          )}
        </div>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
        {project.stack && (
          <div className="proj-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="proj-stack-chip">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/** ── Desktop Image Card ─────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
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
        <div className="proj-meta-row">
          <span className="project-category">{project.category}</span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-live-badge proj-live-badge--link"
            >
              <ExternalLink size={10} /> Live
            </a>
          )}
        </div>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
        {project.stack && (
          <div className="proj-stack">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="proj-stack-chip">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/** ── Mobile Card ───────────────────────────────────────────────────── */
const ProjectCardMobile = ({ project }) => (
  <div className="proj-card-mobile">
    <div className="proj-card-mobile__img-wrap">
      <img src={project.image} alt={project.name} className="proj-card-mobile__img" />
      <div className="proj-card-mobile__overlay">
        <div className="proj-card-mobile__overlay-icon">
          {project.hasVideo ? <Play size={18} fill="currentColor" /> : <ArrowUpRight size={20} />}
        </div>
      </div>
      {project.hasVideo && (
        <div className="proj-mobile-video-tag"><Video size={10} /> Demo</div>
      )}
    </div>
    <div className="proj-card-mobile__info">
      <div className="proj-meta-row">
        <span className="proj-card-mobile__cat">{project.category}</span>
        {project.liveUrl && <span className="proj-live-badge">● Live</span>}
      </div>
      <h3 className="proj-card-mobile__name">{project.name}</h3>
      <p className="proj-card-mobile__desc">{project.description}</p>
    </div>
  </div>
);

/** ── Main Portfolio Section ─────────────────────────────────────────── */
const Portfolio = () => {
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  // Video projects come first (already ordered in mock.js)
  const videoProjects = portfolioData.projects.filter((p) => p.hasVideo);
  const otherProjects = portfolioData.projects.filter((p) => !p.hasVideo);

  return (
    <section id="portfolio" className="portfolio-section">
      <GlimmeringMap dotSpacing={7} glimmerRate={4} />
      <div className="portfolio-container">

        {/* ── Title ── */}
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

        {/* ── Desktop Grid ── */}
        <div className="hide-on-mobile">
          {/* Video row label */}
          {videoProjects.length > 0 && (
            <div className="proj-group-label">
              <span className="proj-group-label__line" />
              <span className="proj-group-label__text"><Video size={13} /> Live Demos</span>
              <span className="proj-group-label__line" />
            </div>
          )}

          {/* Video projects — wider 2-col grid */}
          <div className="projects-grid projects-grid--video">
            {videoProjects.map((project, index) => (
              <VideoProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Regular projects label */}
          {otherProjects.length > 0 && (
            <div className="proj-group-label proj-group-label--mt">
              <span className="proj-group-label__line" />
              <span className="proj-group-label__text">More Projects</span>
              <span className="proj-group-label__line" />
            </div>
          )}

          {/* Regular 3-col grid */}
          <div className="projects-grid">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={videoProjects.length + index} />
            ))}
          </div>
        </div>

        {/* ── Mobile Slider ── */}
        <div className="show-on-mobile">
          <MobileSlider darkTheme>
            {portfolioData.projects.map((project) => (
              <ProjectCardMobile key={project.id} project={project} />
            ))}
          </MobileSlider>
        </div>

        {/* ── View Full Portfolio CTA ── */}
        <motion.div
          ref={ctaRef}
          className="portfolio-cta"
          initial={{ opacity: 0, y: 24 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <a
            href={portfolioData.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-cta__btn"
          >
            View Full Portfolio
            <ArrowUpRight size={18} />
          </a>
          <p className="portfolio-cta__sub">12 projects · AI agents · scrapers · mobile apps</p>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;

