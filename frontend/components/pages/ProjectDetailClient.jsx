"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

      <Header />

      <main className="pd-main pd-main--site-nav">
        <nav className="pd-breadcrumb page-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="pd-bread-link">Home</Link>
          <ChevronRight size={14} className="pd-bread-sep" />
          <Link href="/portfolio" className="pd-bread-link">Portfolio</Link>
          <ChevronRight size={14} className="pd-bread-sep" />
          <span className="pd-bread-current">{project.name}</span>
        </nav>

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
            ) : project.image?.startsWith('/') ? (
              // Real screenshot of the project (stock photos are not shown here)
              <div className="pd-shot">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={1200}
                  height={750}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="pd-shot-img"
                  priority
                />
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

        {/* ── Case study (rendered only when real data is provided in data/projects.js) ──
            caseStudy: { client?, challenge, solution, results: [{ value, label }], quote?: { text, author, role } } */}
        {project.caseStudy && (
          <section className="pd-case">
            {project.caseStudy.client && <p className="pd-case-client">Client: {project.caseStudy.client}</p>}
            <div className="pd-case-grid">
              <div className="pd-card">
                <h2 className="pd-section-title">The challenge</h2>
                <p className="pd-case-text">{project.caseStudy.challenge}</p>
              </div>
              <div className="pd-card">
                <h2 className="pd-section-title">What we built</h2>
                <p className="pd-case-text">{project.caseStudy.solution}</p>
              </div>
            </div>
            {project.caseStudy.results?.length > 0 && (
              <div className="pd-case-results">
                {project.caseStudy.results.map((r) => (
                  <div key={r.label} className="pd-case-result">
                    <span className="pd-case-result-value">{r.value}</span>
                    <span className="pd-case-result-label">{r.label}</span>
                  </div>
                ))}
              </div>
            )}
            {project.caseStudy.quote && (
              <figure className="pd-case-quote">
                <blockquote>“{project.caseStudy.quote.text}”</blockquote>
                <figcaption>
                  {project.caseStudy.quote.author}
                  {project.caseStudy.quote.role ? `, ${project.caseStudy.quote.role}` : ''}
                </figcaption>
              </figure>
            )}
          </section>
        )}

        {/* ── Details ── */}
        <section className="pd-details">
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
        </section>

        {/* ── Back ── */}
        <div className="pd-footer-nav">
          <Link href="/portfolio" className="pd-btn pd-btn--ghost">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <Link href="/" className="pd-btn pd-btn--ghost">
            JAQYI Home
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
