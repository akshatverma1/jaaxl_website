import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, Target, IndianRupee, RefreshCw, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { SITE_URL, jsonLd } from '@/data/site';

export const metadata = {
  title: 'Software Products by JAQYI — Doott & More',
  description:
    'JAQYI Products builds and runs its own software that solves real problems at a fair price. Our first product is Doott, a searchable B2B contact database with 43.9M+ contacts and one-time ₹179 lifetime pricing.',
  alternates: { canonical: `${SITE_URL}/products` },
  keywords: ['JAQYI products', 'software products india', 'SaaS products india', 'Doott', 'B2B contact database'],
  openGraph: {
    title: 'JAQYI Products — Software we build for the world',
    description: 'Our own software, starting with Doott: 43.9M+ B2B contacts, searchable and exportable, ₹179 lifetime.',
    url: `${SITE_URL}/products`,
  },
};

const principles = [
  { icon: Target, title: 'Real problems first', desc: 'We only build products for problems we have hit ourselves or watched clients struggle with, again and again.' },
  { icon: IndianRupee, title: 'Fair, simple pricing', desc: 'No per-seat traps or credit systems. If a one-time price works, we charge once.' },
  { icon: RefreshCw, title: 'Shipped, then improved', desc: 'Every product is live, used and updated continuously — not a demo that goes stale.' },
  { icon: ShieldCheck, title: 'Studio-grade engineering', desc: 'The same senior team and standards behind our client work build and run our products.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/products#webpage`,
      url: `${SITE_URL}/products`,
      name: 'JAQYI Products',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/products/${p.slug}`,
          name: p.name,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      ],
    },
  ],
};

export default function ProductsPage() {
  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />

      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>Products</span>
          </nav>
          <h1 className="svc-page-title">Software products built by JAQYI</h1>
          <p className="svc-page-subtitle">
            JAQYI Products is the product arm of JAQYI. We take the craft from years of client work and point it at
            problems we see everywhere — then build, ship and run the software ourselves.
          </p>
          <div className="svc-page-trust">
            {['Live products', 'Fair one-time pricing', 'Built in India, used worldwide'].map((t) => (
              <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">Our products</h2>
            <p className="section-subtitle">Each one solves one problem well.</p>
          </div>
          <div className="product-list">
            {products.map((p) => (
              <article key={p.slug} className="product-card">
                <div className="product-card__body">
                  <div className="product-card__meta">
                    <span className="product-badge"><span className="spotlight-dot" />{p.status}</span>
                    <span className="product-card__category">{p.category}</span>
                  </div>
                  <h3 className="product-card__name">{p.name}</h3>
                  <p className="product-card__tagline">{p.tagline}</p>
                  <p className="product-card__summary">{p.summary}</p>
                  <div className="product-card__actions">
                    <Link href={`/products/${p.slug}`} className="spotlight-btn spotlight-btn--dark">
                      Learn about {p.name} <ArrowRight size={18} />
                    </Link>
                    <a href={p.appUrl} className="product-card__link" target="_blank" rel="noopener">
                      {p.appUrl.replace('https://', '')} <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
                <div className="product-card__stats">
                  {p.stats.map((s) => (
                    <div key={s.label} className="product-card__stat">
                      <span>{s.value}</span>
                      <small>{s.label}</small>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <article className="product-card product-card--next">
              <div className="product-card__body">
                <span className="product-card__category">In the lab</span>
                <h3 className="product-card__name">More products are on the way</h3>
                <p className="product-card__summary">
                  We are working on the next set of tools for sales, operations and automation. Have a problem you
                  think deserves a product? We would love to hear it.
                </p>
                <div className="product-card__actions">
                  <Link href="/#contact" className="spotlight-btn spotlight-btn--dark">
                    Suggest a problem <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">How we build products</h2>
            <p className="section-subtitle">The rules every JAQYI product follows.</p>
          </div>
          <div className="svc-page-grid svc-page-grid--4">
            {principles.map((pr) => (
              <div key={pr.title} className="svc-page-card">
                <div className="service-icon-wrapper"><pr.icon className="service-icon" /></div>
                <h3 className="service-name">{pr.title}</h3>
                <p className="service-description">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-page-cta">
        <div className="svc-page-container">
          <div className="svc-page-cta-inner">
            <h2>Need software built for your business instead?</h2>
            <p>JAQYI Studio builds custom websites, apps, SaaS and AI automation for clients worldwide.</p>
            <div className="svc-page-cta-btns">
              <Link href="/services" className="spotlight-btn spotlight-btn--primary">
                Explore JAQYI Studio <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
