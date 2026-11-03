import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Segments from '@/components/Segments';
import ProductSpotlight from '@/components/ProductSpotlight';
import TabletShowcase from '@/components/TabletShowcase';
import TrustedPartners from '@/components/TrustedPartners';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { faqs } from '@/data/faqs';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://jaqyi.com/#webpage",
      "url": "https://jaqyi.com/",
      "name": "JAQYI | Software Studio & Product Company — Web, App, AI & Doott",
      "isPartOf": { "@id": "https://jaqyi.com/#website" },
      "about": { "@id": "https://jaqyi.com/#organization" },
      "description": "JAQYI is a software company with two arms: JAQYI Studio builds custom web, mobile, SaaS and AI automation for businesses, and JAQYI Products builds our own software, starting with Doott.",
      "inLanguage": "en-IN"
    },
    {
      // Generated from the same data the visible FAQ section renders
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    }
  ]
};

export const metadata = {
  title: { absolute: 'JAQYI | Software Studio & Product Company — Web, App, AI & Doott' },
  description:
    'JAQYI builds software two ways. JAQYI Studio: custom web development, mobile apps, SaaS and AI automation for businesses in India & USA. JAQYI Products: our own software, starting with Doott — a 43.9M+ B2B contact database.',
  alternates: { canonical: 'https://jaqyi.com/' },
  keywords: [
    'software company india', 'software product company india', 'web development company india',
    'app development company india', 'AI automation agency', 'SaaS development india',
    'software studio indore', 'IT company indore madhya pradesh', 'Doott', 'B2B contact database', 'JAQYI',
  ],
  openGraph: {
    title: 'JAQYI | Software Studio & Product Company',
    description: 'Custom web, app, SaaS & AI automation by JAQYI Studio — and our own products, starting with Doott.',
    url: 'https://jaqyi.com/',
  },
};

export default function Home() {
  return (
    <div className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <main>
        <div id="home"><Hero /></div>
        <TabletShowcase />
        <Segments />
        <ProductSpotlight />
        <TrustedPartners />
        <div id="services"><Services /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="about"><About /></div>
        <FAQ />
        <div id="contact"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}
