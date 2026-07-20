"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Play, CheckCircle2,
  Tag, Cpu, ChevronRight,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export default function ProjectDetailClient({ project }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div className="pd-root">
      {/* ── Background glows ── */}
      <div className="pd-glow pd-glow-1" />
      <div className="pd-glow pd-glow-2" />

      {/* ── Header ── */}
      <header className="pd-header">
        <div className="pd-header-inner">
          <Link href="/" className="pd-logo">JAQYI</Link>
          <nav className="pd-breadcrumb">
            <Link href="/" className="pd-bread-link">Home</Link>
            <ChevronRight size={14} className="pd-bread-sep" />
            <Link href="/#portfolio" className="pd-bread-link">Portfolio</Link>
            <ChevronRight size={14} className="pd-bread-sep" />
            <span className="pd-bread-current">{project.name}</span>
          </nav>
          <Link href="/#portfolio" className="pd-back-btn">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="pd-main">

        {/* ── Hero ── */}
        <section className="pd-hero">

          {/* Left: project info */}
          <motion.div
            className="pd-hero-info"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7 }}
          >
            {/* Category + badge */}
            <div className="pd-meta-row">
              <span className="pd-category">{project.category}</span>
              <span className={`pd-badge pd-badge--${project.badgeType}`}>{project.badge}</span>
              {project.liveUrl && (
                <span className="pd-live-dot">● Live</span>
              )}
            </div>

            {/* Title */}
            <h1 className="pd-title">{project.name}</h1>

            {/* Description */}
            <p className="pd-description">{project.description}</p>

            {/* Tech tags */}
            <div className="pd-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="pd-tag">{tag}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pd-actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--primary">
                  <ExternalLink size={16} /> Visit Live Site
                </a>
              )}
              {project.videoUrl && (
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--secondary">
                  <Play size={16} /> Watch Full Demo
                </a>
              )}
              <Link href="/#contact" className="pd-btn pd-btn--ghost">
                Request Demo
              </Link>
            </div>
          </motion.div>

          {/* Right: video / placeholder */}
          <motion.div
            className="pd-hero-media"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {project.videoUrl ? (
              <div className="pd-video-card" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  className="pd-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onEnded={() => setPlaying(false)}
                />
                {!playing && (
                  <div className="pd-play-overlay">
                    <div className="pd-play-circle">
                      <Play size={26} fill="white" color="white" />
                    </div>
                    <span className="pd-play-label">Play Demo</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="pd-no-media">
                <div className="pd-no-media-grid" />
                <div className="pd-no-media-inner">
                  <Cpu size={36} className="pd-no-media-icon" />
                  <p className="pd-no-media-title">{project.name}</p>
                  <span className="pd-no-media-sub">Contact us for a live demo</span>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* ── Details ── */}
        <motion.section
          className="pd-details"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Features */}
          <div className="pd-card">
            <h2 className="pd-section-title">
              <CheckCircle2 size={18} className="pd-section-icon" />
              Key Features
            </h2>
            <ul className="pd-features">
              {project.features.map((f, i) => (
                <li key={i} className="pd-feature-item">
                  <CheckCircle2 size={15} className="pd-feature-check" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs + Tags sidebar */}
          <div className="pd-sidebar">
            {/* Specs */}
            <div className="pd-card pd-card--sm">
              <h2 className="pd-section-title">
                <Cpu size={18} className="pd-section-icon" />
                Technical Specs
              </h2>
              <dl className="pd-specs">
                {project.specs.map((s) => (
                  <div key={s.label} className="pd-spec-row">
                    <dt className="pd-spec-label">{s.label}</dt>
                    <dd className="pd-spec-value">
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="pd-spec-link">
                          {s.value} <ExternalLink size={11} />
                        </a>
                      ) : s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Stack chips */}
            <div className="pd-card pd-card--sm">
              <h2 className="pd-section-title">
                <Tag size={18} className="pd-section-icon" />
                Stack
              </h2>
              <div className="pd-stack">
                {project.tags.map((t) => (
                  <span key={t} className="pd-stack-chip">{t}</span>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="pd-cta-card">
              <p className="pd-cta-title">Interested in this project?</p>
              <p className="pd-cta-sub">Reach out and we'll set up a walkthrough.</p>
              <Link href="/#contact" className="pd-btn pd-btn--primary pd-btn--full">
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── Back ── */}
        <div className="pd-footer-nav">
          <Link href="/#portfolio" className="pd-btn pd-btn--ghost">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <Link href="/" className="pd-btn pd-btn--ghost">
            JAQYI Home
          </Link>
        </div>

      </main>

      <footer className="pd-footer">
        <p>© 2026 JAQYI Agency · <a href="mailto:info@jaqyi.com">info@jaqyi.com</a></p>
      </footer>
    </div>
  );
}
