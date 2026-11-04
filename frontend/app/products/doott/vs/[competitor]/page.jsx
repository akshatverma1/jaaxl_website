import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { comparisons, getComparison, COMPARISONS_CHECKED } from '@/data/comparisons';
import { getProduct } from '@/data/products';
import { SITE_URL, jsonLd } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }) {
  const { competitor } = await params;
  const c = getComparison(competitor);
  if (!c) return {};
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `${SITE_URL}/products/doott/vs/${c.slug}` },
    keywords: c.keywords,
  };
}

export default async function ComparisonPage({ params }) {
  const { competitor } = await params;
  const c = getComparison(competitor);
  if (!c) notFound();
  const p = getProduct('doott');
  const url = `${SITE_URL}/products/doott/vs/${c.slug}`;
  const others = comparisons.filter((x) => x.slug !== c.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        description: c.metaDescription,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/products/doott#software` },
        dateModified: '2026-11-04',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
          { '@type': 'ListItem', position: 3, name: 'Doott', item: `${SITE_URL}/products/doott` },
          { '@type': 'ListItem', position: 4, name: c.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />

      <section className="svc-page-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/products">Products</Link> <span>/</span>
            <Link href="/products/doott">Doott</Link> <span>/</span> <span>vs {c.name}</span>
          </nav>
          <h1 className="svc-page-title">{c.title}: which B2B contact tool is right for you?</h1>
          <p className="svc-page-subtitle">{c.intro}</p>
          <div className="svc-page-hero-cta">
            <a href={p.pricingUrl} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener">
              Try Doott — {p.pricing.display} lifetime <ArrowUpRight size={18} />
            </a>
            <Link href="/products/doott" className="spotlight-btn spotlight-btn--ghost">About Doott</Link>
          </div>
        </div>
      </section>

      <section className="svc-page-section">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">Side-by-side</h2>
            <p className="section-subtitle">
              {c.name} details reflect its public pricing model as checked in {COMPARISONS_CHECKED}. Plans change —
              confirm on <a href={c.pricingUrl} target="_blank" rel="noopener noreferrer nofollow" className="cmp-link">{c.name}&apos;s pricing page <ExternalLink size={12} /></a>.
            </p>
          </div>
          <div className="cmp-table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="cmp-doott">Doott</th>
                  <th scope="col">{c.name}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map(([label, doott, other]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="cmp-doott">{doott}</td>
                    <td>{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="svc-page-section svc-page-section--alt">
        <div className="svc-page-container">
          <div className="section-header">
            <h2 className="section-title">The honest verdict</h2>
          </div>
          <div className="product-compare cmp-verdict">
            <div className="product-compare__col product-compare__col--doott">
              <h3>Choose Doott if…</h3>
              <ul>{c.chooseDoott.map((t) => <li key={t}><Check size={16} />{t}</li>)}</ul>
            </div>
            <div className="product-compare__col">
              <h3>Choose {c.name} if…</h3>
              <ul>{c.chooseOther.map((t) => <li key={t}><Check size={16} />{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-page-cta">
        <div className="svc-page-container">
          <div className="svc-page-cta-inner">
            <h2>Build your first lead list today</h2>
            <p>{p.headline} {p.pricing.display} once — no subscription, no per-seat pricing.</p>
            <div className="svc-page-cta-btns">
              <a href={p.pricingUrl} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener">
                Get lifetime access <ArrowUpRight size={18} />
              </a>
              {others.map((o) => (
                <Link key={o.slug} href={`/products/doott/vs/${o.slug}`} className="spotlight-btn spotlight-btn--ghost">
                  Doott vs {o.name} <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
