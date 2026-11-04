import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { posts, getPost } from '@/data/posts';
import { SITE_URL, jsonLd } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | JAQYI` },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

function Block({ b }) {
  if (b.h2) return <h2>{b.h2}</h2>;
  if (b.h3) return <h3>{b.h3}</h3>;
  if (b.p) return <p>{b.p}</p>;
  if (b.ul) return <ul>{b.ul.map((i) => <li key={i}>{i}</li>)}</ul>;
  if (b.ol) return <ol>{b.ol.map((i) => <li key={i}>{i}</li>)}</ol>;
  if (b.table)
    return (
      <div className="cmp-table-wrap">
        <table className="cmp-table">
          <thead><tr>{b.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>
            {b.table.rows.map((r) => (
              <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.cta)
    return (
      <aside className="article-cta">
        <p>{b.cta.text}</p>
        <Link href={b.cta.href} className="spotlight-btn spotlight-btn--dark">{b.cta.label} <ArrowRight size={16} /></Link>
      </aside>
    );
  return null;
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const more = posts.filter((p) => p.slug !== post.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: { '@type': 'Organization', name: 'JAQYI Team', url: `${SITE_URL}/about` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        image: `${url}/opengraph-image`,
        keywords: post.keywords.join(', '),
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />
      <section className="svc-page-hero article-hero">
        <div className="svc-page-hero-inner">
          <nav className="svc-page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/blog">Blog</Link> <span>/</span> <span>{post.category}</span>
          </nav>
          <h1 className="svc-page-title article-title">{post.title}</h1>
          <p className="article-meta">
            By JAQYI Team · <time dateTime={post.date}>{fmt(post.date)}</time> · {post.readMinutes} min read
          </p>
        </div>
      </section>
      <section className="svc-page-section">
        <article className="article-body">
          {post.body.map((b, i) => <Block key={i} b={b} />)}
          {post.related && (
            <p className="article-related">
              Related: <Link href={post.related.href}>{post.related.label}</Link>
            </p>
          )}
        </article>
      </section>
      {more.length > 0 && (
        <section className="svc-page-section svc-page-section--alt">
          <div className="svc-page-container">
            <div className="section-header"><h2 className="section-title">More guides</h2></div>
            <div className="blog-list">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                  <span className="blog-card__meta">{p.category} · {p.readMinutes} min read</span>
                  <h3 className="blog-card__title">{p.title}</h3>
                  <span className="svc-hub-card__cta">Read guide <ArrowRight size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
