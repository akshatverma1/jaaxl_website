import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code, Smartphone, Brain, Layers, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL, company, jsonLd } from '@/data/site';

export const metadata = {
  title: { absolute: 'Software Development Services — Web, App, SaaS & AI | JAQYI Studio' },
  description:
    'JAQYI Studio is a software development company in India building custom websites, web apps, iOS/Android/Flutter apps, SaaS platforms and AI automation for businesses in India, the USA and worldwide. Free consultation.',
  alternates: { canonical: `${SITE_URL}/services` },
  keywords: [
    'software development services india', 'custom software development company', 'web development company india',
    'app development company india', 'SaaS development company', 'AI automation services', 'JAQYI Studio',
  ],
  openGraph: {
    title: 'JAQYI Studio — Software development services',
    description: 'Custom web, mobile, SaaS and AI automation, engineered by a senior team.',
    url: `${SITE_URL}/services`,
  },
};

const services = [
  {
    icon: Code,
    name: 'Web Development',
    href: '/services/web-development',
    desc: 'High-performance websites, web apps, SaaS platforms, ERP and CRM systems built with React, Next.js and Node.js.',
    items: ['Business websites', 'Web applications', 'SaaS & ERP platforms', 'E-commerce'],
  },
  {
    icon: Smartphone,
    name: 'App Development',
    href: '/services/app-development',
    desc: 'Native iOS and Android, Flutter and React Native apps — from MVP to App Store and Play Store launch.',
    items: ['iOS (Swift)', 'Android (Kotlin)', 'Flutter & React Native', 'PWAs'],
  },
  {
    icon: Brain,
    name: 'AI & Automation',
    href: '/services/ai-automation',
    desc: 'AI agents, chatbots, workflow automation, lead-scraping and data pipelines that save hours every week.',
    items: ['AI chatbots & agents', 'Workflow automation', 'Lead & data scraping', 'ML & analytics'],
  },
  {
    icon: Layers,
    name: 'SaaS Co-Build Studio',
    href: '/#services',
    desc: 'For non-technical founders: we own 100% of the tech — architecture, build, AI and deployment — so you can run the business.',
    items: ['Product strategy', 'Full-stack build', 'Billing & multi-tenancy', 'Post-launch retainer'],
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: 'JAQYI Studio — Software development services',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: s.name,
            description: s.desc,
            url: s.href.startsWith('/#') ? `${SITE_URL}/services` : `${SITE_URL}${s.href}`,
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: ['India', 'United States', 'Worldwide'],
          },
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />

      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>Services</span>
          </nav>
          <h1 className="svc-page-title">Software development services by JAQYI Studio</h1>
          <p className="svc-page-subtitle">
            JAQYI Studio is the services arm of JAQYI. We design, engineer and ship custom software for ambitious
            businesses — websites, mobile apps, SaaS platforms and AI automation — for clients in India, the USA and
            worldwide.
          </p>
          <div className="svc-page-hero-cta">
            <Link href="/#contact" className="spotlight-btn spotlight-btn--primary">
              Get a free quote <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="spotlight-btn spotlight-btn--ghost">See our work</Link>
          </div>
          <div className="svc-page-trust">
            {['50+ projects delivered', '7+ years experience', 'India, USA & global clients'].map((t) => (
              <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">What we build for you</h2>
            <p className="section-subtitle">Pick a service to see how we work, what it costs and how long it takes.</p>
          </div>
          <div className="svc-hub-grid">
            {services.map((s) => (
              <Link key={s.name} href={s.href} className="svc-hub-card">
                <div className="service-icon-wrapper"><s.icon className="service-icon" /></div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-description">{s.desc}</p>
                <ul className="svc-hub-card__items">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <span className="svc-hub-card__cta">Learn more <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">How every project runs</h2>
          </div>
          <div className="svc-page-process">
            {[
              { n: '01', title: 'Discovery', desc: 'We learn your goals, users and constraints, then agree scope, timeline and stack.' },
              { n: '02', title: 'Design', desc: 'Wireframes and prototypes you approve before any code is written.' },
              { n: '03', title: 'Build', desc: 'Two-week agile sprints with live demos, code review and QA every step.' },
              { n: '04', title: 'Launch & grow', desc: 'Deployment, SEO, analytics, a 30-day warranty and ongoing support.' },
            ].map((step) => (
              <div key={step.n} className="svc-page-process-step">
                <div className="svc-page-process-num">{step.n}</div>
                <h3 className="service-name">{step.title}</h3>
                <p className="service-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="svc-hub-proof">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>We ship products too</h2>
              <p className="product-prose">
                Unlike most agencies, JAQYI also builds and runs its own software. Our first product, Doott, is a live
                B2B contact database with 43.9M+ records — proof that we know what it takes to take software from idea
                to paying users.
              </p>
            </div>
            <Link href="/products/doott" className="spotlight-btn spotlight-btn--dark">
              See Doott <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="svc-page-cta">
        <div className="svc-page-container">
          <div className="svc-page-cta-inner">
            <h2>Have a project in mind?</h2>
            <p>Get a free consultation and a quote within 24 hours. No commitment required.</p>
            <div className="svc-page-cta-btns">
              <Link href="/#contact" className="spotlight-btn spotlight-btn--primary">
                Start your project <ArrowRight size={18} />
              </Link>
              <a href={`mailto:${company.email}`} className="svc-page-contact-link"><Mail size={16} />{company.email}</a>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="svc-page-contact-link"><Phone size={16} />{company.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
