"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects as allProjects } from '@/data/projects';
import { ArrowUpRight, Play, ExternalLink, Video } from 'lucide-react';
import MobileSlider from '@/components/ui/MobileSlider';
import GlimmeringMap from '@/components/GlimmeringMap';

/** ── Desktop Video Card ─────────────────────────────────────────────── */
const VideoProjectCard = ({ project }) => {
  const videoRef = useRef(null);
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
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="project-card project-card--video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video badge */}
        <div className="proj-video-badge">
          <Video size={11} />
          <span>Demo</span>
        </div>

        <div className="project-image-wrapper">
          {/* Video — lazy loads on hover, uses image poster */}
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.image}
            className="project-video project-video--always"
            muted
            loop
            playsInline
            preload="none"
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
          <span className="proj-view-details">View Details <ArrowUpRight size={13} /></span>
        </div>
      </div>
    </Link>
  );
};

/** ── Desktop Image Card ─────────────────────────────────────────────── */
const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        className="project-card"
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
      >
        <div className="project-image-wrapper">
          <Image
            src={project.image}
            alt={project.name}
            width={600}
            height={338}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="project-image"
            loading="lazy"
          />
          <div className="project-overlay">
            <div className="project-overlay-icon">
              <ArrowUpRight size={24} />
            </div>
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
                onClick={(e) => e.stopPropagation()}
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
          <span className="proj-view-details">View Details <ArrowUpRight size={13} /></span>
        </div>
      </motion.div>
    </Link>
  );
};

/** ── Mobile Card ───────────────────────────────────────────────────── */
const ProjectCardMobile = ({ project }) => (
  <Link href={`/projects/${project.slug}`} className="proj-card-mobile" style={{ textDecoration: 'none' }}>
    <div className="proj-card-mobile__img-wrap">
      <Image
        src={project.image}
        alt={project.name}
        width={450}
        height={260}
        sizes="85vw"
        className="proj-card-mobile__img"
        loading="lazy"
      />
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
  </Link>
);

/** ── Main Portfolio Section ─────────────────────────────────────────── */
const Portfolio = () => {
  // Video projects shown first
  const videoProjects = allProjects.filter((p) => p.hasVideo);
  // Show top 4 non-video projects on the homepage
  const featuredOtherProjects = allProjects.filter((p) => !p.hasVideo).slice(0, 4);
  const homeFeaturedProjects = [...videoProjects, ...featuredOtherProjects];

  return (
    <section id="portfolio" className="portfolio-section">
      <GlimmeringMap dotSpacing={10} glimmerRate={3} />
      <div className="portfolio-container">

        {/* ── Title ── */}
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">From autonomous AI agents to live SaaS platforms — every project is built with precision and shipped with pride.</p>
        </div>

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
            {videoProjects.map((project) => (
              <VideoProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {/* Regular projects label */}
          {featuredOtherProjects.length > 0 && (
            <div className="proj-group-label proj-group-label--mt">
              <span className="proj-group-label__line" />
              <span className="proj-group-label__text">Featured Projects</span>
              <span className="proj-group-label__line" />
            </div>
          )}

          <div className="projects-grid">
            {featuredOtherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* ── Mobile Slider ── */}
        <div className="show-on-mobile">
          <MobileSlider darkTheme>
            {homeFeaturedProjects.map((project) => (
              <ProjectCardMobile key={project.slug} project={project} />
            ))}
          </MobileSlider>
        </div>

        {/* ── View Full Portfolio CTA ── */}
        <div className="portfolio-cta">
          <Link href="/portfolio" className="portfolio-cta__btn">
            View Full Portfolio
            <ArrowUpRight size={18} />
          </Link>
          <p className="portfolio-cta__sub">35+ projects · AI agents · SaaS · scrapers · mobile apps</p>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;

