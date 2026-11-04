import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Search, Download, Mail, Building2, Compass, Database,
  Briefcase, Rocket, UserSearch, Megaphone, Check, Plus,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProduct } from '@/data/products';
import { SITE_URL, jsonLd } from '@/data/site';
import { comparisons } from '@/data/comparisons';

const p = getProduct('doott');
const PAGE_URL = `${SITE_URL}/products/doott`;

const featureIcons = { Search, Download, Mail, Building2, Compass, Database };
const audienceIcons = [Briefcase, Rocket, UserSearch, Megaphone];

export const metadata = {
  title: { absolute: 'Doott — B2B Contact Database with 43.9M+ Contacts | ₹179 Lifetime | JAQYI' },
  description:
    'Doott by JAQYI is a B2B contact database and lead generation platform. Search 43.9M+ contacts by job title, city and company, filter to verified emails and phones, and export unlimited CSVs — ₹179 one-time, no per-seat pricing.',
  alternates: { canonical: PAGE_URL },
  keywords: p.keywords,
  openGraph: {
    type: 'website',
    title: 'Doott — 43.9M+ B2B contacts, searchable & exportable',
    description: 'Search, filter and export B2B leads to CSV. ₹179 one-time lifetime access. Built by JAQYI.',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doott — 43.9M+ B2B contacts, ₹179 lifetime',
    description: 'Search, filter and export B2B leads to CSV. Built by JAQYI.',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE_URL}#software`,
      name: p.name,
      alternateName: 'Doott B2B Contact Database',
      description: p.summary,
      applicationCategory: p.applicationCategory,
      applicationSubCategory: 'Lead generation, B2B contact database',
      operatingSystem: 'Web browser',
      url: p.appUrl,
      image: p.ogImage,
      featureList: p.features.map((f) => f.name),
      offers: {
        '@type': 'Offer',
        name: p.pricing.plan,
        price: String(p.pricing.price),
        priceCurrency: p.pricing.currency,
        url: p.pricingUrl,
        availability: 'https://schema.org/InStock',
        category: 'One-time payment',
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      creator: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Doott — B2B Contact Database & Lead Generation Platform',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${PAGE_URL}#software` },
      mainEntity: { '@id': `${PAGE_URL}#software` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
        { '@type': 'ListItem', position: 3, name: 'Doott', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: p.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function DoottPage() {
  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />

      {/* Hero */}
      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/products">Products</Link> <span>/</span> <span>Doott</span>
          </nav>
          <p className="product-hero-eyebrow">
            <span className="spotlight-dot" /> A JAQYI product · Live at doott.jaqyi.com
          </p>
          <h1 className="svc-page-title">Doott: B2B contact database &amp; lead generation platform</h1>
          <p className="svc-page-subtitle">
            {p.headline} Search people and companies by job title, city and industry, keep only contacts with a
            verified email or phone, and export unlimited leads to CSV — for a one-time {p.pricing.display}.
          </p>
          <div className="svc-page-hero-cta">
            <a href={p.pricingUrl} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener">
              Get lifetime access — {p.pricing.display} <ArrowUpRight size={18} />
            </a>
            <a href={p.appUrl} className="spotlight-btn spotlight-btn--ghost" target="_blank" rel="noopener">
              Visit doott.jaqyi.com
            </a>
          </div>
          <div className="svc-page-trust">
            {['No subscription', 'No per-seat pricing', 'Unlimited CSV exports'].map((t) => (
              <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="product-stats">
            {p.stats.map((s) => (
              <div key={s.label} className="stat-card">
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="svc-page-why">
            <div className="svc-page-why-content">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Why we built Doott</h2>
              <p className="product-prose">{p.problem}</p>
              <p className="product-prose">
                Doott is the tool we wanted for our own outreach at JAQYI: the whole database in one place, fast
                filters that actually narrow a list down, and exports without a meter running.
              </p>
            </div>
            <div className="product-compare">
              <div className="product-compare__col">
                <h3>Typical B2B data tools</h3>
                <ul>
                  {['Monthly subscription', 'Priced per seat', 'Export credits & row limits', 'Annual contracts'].map((t) => (
                    <li key={t}><span className="product-compare__x">×</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="product-compare__col product-compare__col--doott">
                <h3>Doott</h3>
                <ul>
                  {['₹179 once, lifetime', 'No per-seat pricing', 'Unlimited CSV exports', 'Future updates included'].map((t) => (
                    <li key={t}><Check size={16} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to build a lead list</h2>
            <p className="section-subtitle">From a blank search to a CRM-ready CSV in a few clicks.</p>
          </div>
          <div className="svc-page-grid">
            {p.features.map((f) => {
              const Icon = featureIcons[f.icon];
              return (
                <div key={f.name} className="svc-page-card">
                  <div className="service-icon-wrapper"><Icon className="service-icon" /></div>
                  <h3 className="service-name">{f.name}</h3>
                  <p className="service-description">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">Who uses Doott</h2>
            <p className="section-subtitle">Anyone whose growth starts with finding the right people.</p>
          </div>
          <div className="svc-page-grid svc-page-grid--4">
            {p.audience.map((a, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <div key={a.name} className="svc-page-card">
                  <div className="service-icon-wrapper"><Icon className="service-icon" /></div>
                  <h3 className="service-name">{a.name}</h3>
                  <p className="service-description">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">How it works</h2>
          </div>
          <div className="svc-page-process svc-page-process--3">
            {p.howItWorks.map((step) => (
              <div key={step.n} className="svc-page-process-step">
                <div className="svc-page-process-num">{step.n}</div>
                <h3 className="service-name">{step.title}</h3>
                <p className="service-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="svc-page-section svc-page-section--alt" id="pricing">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">Simple pricing</h2>
            <p className="section-subtitle">One plan. One payment. Everything included.</p>
          </div>
          <div className="pricing-card">
            <p className="pricing-card__plan">{p.pricing.plan}</p>
            <p className="pricing-card__price">
              {p.pricing.display} <small>{p.pricing.period}</small>
            </p>
            <ul className="pricing-card__list">
              {p.pricing.includes.map((item) => (
                <li key={item}><Check size={18} />{item}</li>
              ))}
            </ul>
            <a href={p.pricingUrl} className="spotlight-btn spotlight-btn--dark pricing-card__btn" target="_blank" rel="noopener">
              Get lifetime access <ArrowUpRight size={18} />
            </a>
            <p className="pricing-card__note">{p.pricing.note}</p>
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">How Doott compares</h2>
            <p className="section-subtitle">Honest, side-by-side comparisons with the tools you already know.</p>
          </div>
          <div className="svc-hub-grid">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/products/doott/vs/${c.slug}`} className="svc-hub-card">
                <h3 className="service-name">{c.title}</h3>
                <p className="service-description">{c.intro}</p>
                <span className="svc-hub-card__cta">Read the comparison <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-page-section">
        <div className="svc-page-container svc-page-faq-container">
          <div className="section-header">
            <h2 className="section-title">Doott FAQ</h2>
          </div>
          <div className="svc-page-faq">
            {p.faqs.map((f) => (
              <details key={f.q} className="svc-page-faq-item faq-details">
                <summary className="svc-page-faq-btn">
                  <span>{f.q}</span>
                  <Plus size={20} className="faq-details__icon" />
                </summary>
                <div className="svc-page-faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link to studio */}
      <section className="svc-page-cta">
        <div className="svc-page-container">
          <div className="svc-page-cta-inner">
            <h2>Built by JAQYI</h2>
            <p>
              Doott is engineered by the same team behind JAQYI Studio. Need a data platform, lead-gen automation or a
              custom SaaS of your own? We build those for clients too.
            </p>
            <div className="svc-page-cta-btns">
              <a href={p.appUrl} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener">
                Try Doott <ArrowUpRight size={18} />
              </a>
              <Link href="/services/ai-automation" className="spotlight-btn spotlight-btn--ghost">
                AI &amp; automation services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
