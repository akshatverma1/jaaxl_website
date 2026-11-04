import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Lightbulb, Users, Eye, Target, MapPin, Globe2, Handshake, Linkedin,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL, company, segments, whatsappUrl, jsonLd } from '@/data/site';
import { getProduct } from '@/data/products';

export const metadata = {
  title: 'About JAQYI — Software Studio & Product Company in Indore, India',
  description:
    'JAQYI is a software company founded by Akshat Verma in Indore, India. JAQYI Studio builds custom web, mobile, SaaS and AI software for clients worldwide; JAQYI Products builds our own software, starting with Doott.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About JAQYI',
    description: 'A software studio and product company from Indore, India.',
    url: `${SITE_URL}/about`,
  },
};

const values = [
  { icon: ShieldCheck, title: 'Quality first', desc: 'No throwaway work and no cutting corners. We only ship what we are proud to sign.' },
  { icon: Lightbulb, title: 'Innovation driven', desc: 'AI, automation and modern stacks where they genuinely help — not as buzzwords.' },
  { icon: Users, title: 'Client focused', desc: 'Your goals set the plan. We explain trade-offs in plain language and build for your users.' },
  { icon: Eye, title: 'Radical transparency', desc: 'Clear quotes, weekly progress, working demos every two weeks. No surprises.' },
  { icon: Target, title: 'Ownership mindset', desc: 'We treat every product — yours or ours — as if our name is on it. Because it is.' },
];

const stats = [
  ['50+', 'Projects delivered'],
  ['20+', 'Happy clients'],
  ['7+', 'Years building software'],
  ['5+', 'Core team members'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About JAQYI',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#founder`,
      name: company.founder,
      jobTitle: 'Founder',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      email: company.email,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ],
};

export default function AboutPage() {
  const doott = getProduct('doott');
  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />

      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>About</span>
          </nav>
          <h1 className="svc-page-title">We build software that earns trust</h1>
          <p className="svc-page-subtitle">
            JAQYI is a software company from Indore, India. We build for clients through JAQYI Studio, and for
            everyone through JAQYI Products. Same team, same standards, two ways to make software that matters.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="svc-page-why">
            <div className="svc-page-why-content">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Our story</h2>
              <p className="product-prose">
                JAQYI started as a high-craft software studio: a small senior team that businesses hire when the
                work has to be right — CRMs, SaaS platforms, mobile apps and AI automation for clients in India,
                the USA and beyond.
              </p>
              <p className="product-prose">
                Building for clients showed us the same problems again and again. So we started building our own
                products to solve them. Our first, {doott.name}, gives sales teams, founders and recruiters a 43.9M+
                contact database for a one-time price — the kind of tool we wanted for ourselves.
              </p>
              <p className="product-prose">
                Today JAQYI is both: a studio that builds your software, and a product company that ships its own.
                Client work keeps us sharp. Our products keep us honest.
              </p>
            </div>
            <div className="svc-page-why-stats">
              {stats.map(([v, l]) => (
                <div key={l} className="stat-card">
                  <p className="stat-value">{v}</p>
                  <p className="stat-label">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two arms */}
      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">One company, two arms</h2>
          </div>
          <div className="segments-grid">
            {Object.entries(segments).map(([key, seg]) => (
              <Link key={key} href={seg.href} className={`segment-card segment-card--${key === 'studio' ? 'studio about-seg-light' : 'products'}`}>
                <span className="segment-card__label">{seg.name}</span>
                <h3 className="segment-card__title">{seg.headline}</h3>
                <p className="segment-card__desc">{seg.description}</p>
                <span className="segment-card__cta">{seg.cta} <ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">What we stand for</h2>
            <p className="section-subtitle">
              Mission: build software that earns trust — solutions that solve real problems with precision,
              creativity and craft.
            </p>
          </div>
          <div className="svc-page-grid">
            {values.map((v) => (
              <div key={v.title} className="svc-page-card">
                <div className="service-icon-wrapper"><v.icon className="service-icon" /></div>
                <h3 className="service-name">{v.title}</h3>
                <p className="service-description">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder + how we work */}
      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="about-founder">
            <div className="about-founder__card">
              <div className="about-founder__avatar" aria-hidden="true">AV</div>
              <div>
                <h2 className="about-founder__name">{company.founder}</h2>
                <p className="about-founder__role">Founder, JAQYI</p>
              </div>
              <p className="product-prose">
                Akshat founded JAQYI to prove that a small, senior team can out-build large agencies — and then
                turned that same craft toward products of our own.
              </p>
              <div className="about-founder__links">
                <a href={company.socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> JAQYI on LinkedIn</a>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
            <div className="about-facts">
              {[
                { icon: MapPin, title: 'Headquarters', desc: 'Industrial Estate, Sector-C, Indore, Madhya Pradesh, India' },
                { icon: Globe2, title: 'Remote-first, global', desc: 'Clients across India, the USA, UK, UAE, Australia and Europe — we align to your timezone.' },
                { icon: Handshake, title: 'Ways to work with us', desc: 'Fixed-price projects, monthly retainers, and SaaS co-build partnerships (equity + build or revenue share) for founders.' },
              ].map((f) => (
                <div key={f.title} className="about-fact">
                  <f.icon size={20} />
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="svc-page-cta">
        <div className="svc-page-container">
          <div className="svc-page-cta-inner">
            <h2>Let&apos;s build something together</h2>
            <p>Tell us about your project, or come work with us.</p>
            <div className="svc-page-cta-btns">
              <a href={whatsappUrl()} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp <ArrowUpRight size={18} />
              </a>
              {company.bookingUrl && (
                <a href={company.bookingUrl} className="spotlight-btn spotlight-btn--ghost" target="_blank" rel="noopener noreferrer">
                  Book a call
                </a>
              )}
              <Link href="/careers" className="spotlight-btn spotlight-btn--ghost">See open roles</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
