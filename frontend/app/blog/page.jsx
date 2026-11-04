import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { posts } from '@/data/posts';
import { SITE_URL, jsonLd } from '@/data/site';

export const metadata = {
  title: 'Blog — Software, App & Lead Generation Guides',
  description:
    'Practical guides from JAQYI on website and app development costs in India, SaaS, AI automation and B2B lead generation.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  url: `${SITE_URL}/blog`,
  name: 'JAQYI Blog',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE_URL}/blog/${p.slug}`,
    datePublished: p.date,
  })),
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />
      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>Blog</span>
          </nav>
          <h1 className="svc-page-title">Guides from the JAQYI team</h1>
          <p className="svc-page-subtitle">
            Straight answers on what software costs, how long it takes, and how to grow with it.
          </p>
        </div>
      </section>
      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="blog-list">
            {sorted.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                <span className="blog-card__meta">{p.category} · {p.readMinutes} min read · {fmt(p.date)}</span>
                <h2 className="blog-card__title">{p.title}</h2>
                <p className="blog-card__desc">{p.description}</p>
                <span className="svc-hub-card__cta">Read guide <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
