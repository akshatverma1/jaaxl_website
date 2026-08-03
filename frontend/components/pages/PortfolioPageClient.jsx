"use client";
import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import {
  ArrowUpRight, Play, ExternalLink, Video, Search,
  ArrowLeft, Github, Filter, X,
} from 'lucide-react';
import GlimmeringMap from '@/components/GlimmeringMap';

// ── Category definitions ─────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',        label: 'All Projects' },
  { id: 'ai',        label: 'AI & AI Agents' },
  { id: 'automation',label: 'Automation' },
  { id: 'saas',      label: 'SaaS Products' },
  { id: 'it',        label: 'IT & Software' },
  { id: 'mobile',    label: 'Mobile & Web Apps' },
  { id: 'cloud',     label: 'Cloud' },
  { id: 'fintech',   label: 'FinTech' },
];

// Map category id to keywords found in project.category
const CATEGORY_MATCH = {
  ai:        ['ai', 'agent', 'openai', 'gpt', 'vision ai', 'couldy'],
  automation:['automation', 'scraper', 'scraping', 'outreach', 'lead gen', 'extension', 'email', 'bulkreach', 'one link', 'research', 'publishing'],
  saas:      ['saas', 'crm', 'healthtech', 'deal source', 'email sender', 'metlink'],
  it:        ['it &', 'erp', 'cred-manage', 'gearup', 'crewzy', 'marketplace', 'workforce'],
  mobile:    ['mobile', 'web app', 'blog', 'agency', 'job board', 'ar furniture', 'jaqyi —'],
  cloud:     ['cloud', 'serverless', 'cloud run'],
  fintech:   ['fintech', 'web3', 'ethereum', 'blockchain', 'investment'],
};

function matchCategory(project, catId) {
  if (catId === 'all') return true;
  const haystack = (project.category + ' ' + project.name + ' ' + project.tags.join(' ')).toLowerCase();
  return CATEGORY_MATCH[catId]?.some((kw) => haystack.includes(kw));
}

// ── Project card ─────────────────────────────────────────────────────────
const PortfolioCard = ({ project, index }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (project.hasVideo && videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleLeave = () => {
    setHovered(false);
    if (project.hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="pf-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* ── Image / Video ── */}
        <div className="pf-card__media">
          {project.hasVideo ? (
            <video
              ref={videoRef}
              src={project.videoUrl}
              className="pf-card__video"
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img src={project.image} alt={project.name} className="pf-card__img" />
          )}

          {/* Hover overlay */}
          <div className={`pf-card__overlay ${hovered ? 'pf-card__overlay--show' : ''}`}>
            <div className="pf-card__overlay-icon">
              {project.hasVideo ? <Play size={20} fill="currentColor" /> : <ArrowUpRight size={22} />}
            </div>
            <div className="pf-card__overlay-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-card__ext-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-card__ext-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={12} /> GitHub
                </a>
              )}
            </div>
          </div>

          {/* Badges */}
          {project.hasVideo && (
            <span className="pf-card__video-badge"><Video size={10} /> Demo</span>
          )}
          {project.liveUrl && (
            <span className="pf-card__live-dot">● Live</span>
          )}
        </div>

        {/* ── Info ── */}
        <div className="pf-card__info">
          <span className="pf-card__cat">{project.category}</span>
          <h3 className="pf-card__name">{project.name}</h3>
          <p className="pf-card__desc">{project.description}</p>
          <div className="pf-card__stack">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="proj-stack-chip">{t}</span>
            ))}
          </div>
          <span className="pf-card__view">View Details <ArrowUpRight size={12} /></span>
        </div>
      </Link>
    </motion.div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────
export default function PortfolioPageClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((p) => {
      const matchesCat = matchCategory(p, activeCategory);
      if (!q) return matchesCat;
      const haystack = (p.name + ' ' + p.description + ' ' + p.tags.join(' ') + ' ' + p.stack.join(' ')).toLowerCase();
      return matchesCat && haystack.includes(q);
    });
  }, [activeCategory, searchQuery]);

  // Count per category
  const counts = useMemo(() => {
    const c = {};
    CATEGORIES.forEach(({ id }) => {
      c[id] = id === 'all' ? projects.length : projects.filter((p) => matchCategory(p, id)).length;
    });
    return c;
  }, []);

  return (
    <div className="pf-page">
      <GlimmeringMap dotSpacing={7} glimmerRate={4} />

      {/* ── Header ── */}
      <header className="pf-header">
        <div className="pf-header-inner">
          <Link href="/" className="pd-logo">JAQYI</Link>
          <nav className="pd-breadcrumb">
            <Link href="/" className="pd-bread-link">Home</Link>
            <span className="pd-bread-sep" style={{ margin: '0 6px', opacity: 0.3 }}>›</span>
            <span className="pd-bread-current">Portfolio</span>
          </nav>
          <Link href="/" className="pd-back-btn">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      <main className="pf-main">

        {/* ── Hero title ── */}
        <motion.div
          className="pf-hero"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="pf-hero__eyebrow">Project Portfolio</p>
          <h1 className="pf-hero__title">Production-Grade Work,<br />Across Every Domain</h1>
          <p className="pf-hero__sub">
            A curated showcase of {projects.length}+ projects across AI, Automation, SaaS, Cloud, and more.
            Every project shipped with precision, pride, and production-ready code.
          </p>
        </motion.div>

        {/* ── Search + Filter bar ── */}
        <motion.div
          className="pf-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Search */}
          <div className="pf-search-wrap">
            <Search size={15} className="pf-search-icon" />
            <input
              type="text"
              placeholder="Search by name, tech, or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pf-search"
            />
            {searchQuery && (
              <button className="pf-search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            className="pf-filter-toggle"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <Filter size={14} /> Filter
          </button>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          className={`pf-tabs ${mobileFilterOpen ? 'pf-tabs--open' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`pf-tab ${activeCategory === cat.id ? 'pf-tab--active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); setMobileFilterOpen(false); }}
            >
              {cat.label}
              <span className="pf-tab__count">{counts[cat.id]}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Results header ── */}
        <div className="pf-results-bar">
          <span className="pf-results-count">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              className="pf-clear-filters"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              className="pf-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, index) => (
                <PortfolioCard key={project.slug} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="pf-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search size={40} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>No projects found for that search.</p>
              <button
                className="pf-clear-filters"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <div className="pf-page-cta">
          <p className="pf-page-cta__title">Have a project in mind?</p>
          <p className="pf-page-cta__sub">Let's build something great together.</p>
          <Link href="/#contact" className="pd-btn pd-btn--primary">
            Get in Touch <ArrowUpRight size={16} />
          </Link>
        </div>

      </main>

      <footer className="pd-footer">
        <p>© 2026 JAQYI Agency · <a href="mailto:info@jaqyi.com">info@jaqyi.com</a></p>
      </footer>
    </div>
  );
}
