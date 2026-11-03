import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search, Download, Mail, Building2, Compass, Database } from 'lucide-react';
import { getProduct } from '@/data/products';

const iconMap = { Search, Download, Mail, Building2, Compass, Database };

/** Home: featured JAQYI product (Doott). */
export default function ProductSpotlight() {
  const p = getProduct('doott');
  return (
    <section id="products" className="spotlight-section" aria-labelledby="spotlight-title">
      <div className="spotlight-container">
        <div className="spotlight-intro">
          <p className="spotlight-eyebrow">
            <span className="spotlight-dot" /> JAQYI Products · {p.status}
          </p>
          <h2 id="spotlight-title" className="spotlight-title">
            Meet {p.name}: {p.headline}
          </h2>
          <p className="spotlight-desc">{p.summary}</p>
          <div className="spotlight-cta">
            <a href={p.appUrl} className="spotlight-btn spotlight-btn--primary" target="_blank" rel="noopener">
              Get lifetime access — {p.pricing.display} <ArrowUpRight size={18} />
            </a>
            <Link href={`/products/${p.slug}`} className="spotlight-btn spotlight-btn--ghost">
              How {p.name} works <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="spotlight-stats">
          {p.stats.map((s) => (
            <div key={s.label} className="spotlight-stat">
              <span className="spotlight-stat__value">{s.value}</span>
              <span className="spotlight-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="spotlight-features">
          {p.features.slice(0, 3).map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.name} className="spotlight-feature">
                <Icon size={20} />
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
