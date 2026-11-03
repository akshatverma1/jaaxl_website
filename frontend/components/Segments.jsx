import Link from 'next/link';
import { ArrowRight, Briefcase, Rocket, Check } from 'lucide-react';
import { segments } from '@/data/site';

const icons = { studio: Briefcase, products: Rocket };

/** Home: the two halves of JAQYI — client services and our own products. */
export default function Segments() {
  return (
    <section className="segments-section" aria-labelledby="segments-title">
      <div className="segments-container">
        <div className="section-header segments-header">
          <p className="segments-eyebrow">One company. Two ways we build.</p>
          <h2 id="segments-title" className="section-title">
            Studio for your ideas. Products for everyone.
          </h2>
        </div>

        <div className="segments-grid">
          {Object.entries(segments).map(([key, seg]) => {
            const Icon = icons[key];
            return (
              <Link key={key} href={seg.href} className={`segment-card segment-card--${key}`}>
                <div className="segment-card__top">
                  <span className="segment-card__icon"><Icon size={22} /></span>
                  <span className="segment-card__label">{seg.name}</span>
                </div>
                <h3 className="segment-card__title">{seg.headline}</h3>
                <p className="segment-card__desc">{seg.description}</p>
                <ul className="segment-card__points">
                  {seg.points.map((p) => (
                    <li key={p}><Check size={16} />{p}</li>
                  ))}
                </ul>
                <span className="segment-card__cta">
                  {seg.cta} <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
