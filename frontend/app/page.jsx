import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustedPartners from '@/components/TrustedPartners';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://jaqyi.com/#webpage",
      "url": "https://jaqyi.com/",
      "name": "JAQYI | Web Development, App Development & AI Automation Agency",
      "isPartOf": { "@id": "https://jaqyi.com/#website" },
      "about": { "@id": "https://jaqyi.com/#organization" },
      "description": "JAQYI is a creative software studio offering web development, mobile app development, and AI automation services for businesses in India and USA.",
      "inLanguage": "en-IN"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does JAQYI offer?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI offers web development, mobile app development (iOS & Android), and AI & automation solutions. We serve businesses in India and the USA." }
        },
        {
          "@type": "Question",
          "name": "Where is JAQYI located?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI is based in Indore, Madhya Pradesh, India. We serve clients across India, USA, UK, and globally." }
        },
        {
          "@type": "Question",
          "name": "How much does web development cost at JAQYI?",
          "acceptedAnswer": { "@type": "Answer", "text": "Web development costs at JAQYI start from ₹25,000 for basic websites and go up to ₹20,00,000+ for enterprise SaaS platforms." }
        }
      ]
    }
  ]
};

export const metadata = {
  title: 'JAQYI | Web Development, App Development & AI Automation Agency',
  description: 'JAQYI is a leading software agency in India offering custom web development, mobile app development, and AI & automation solutions. Trusted by businesses across India and USA. Based in Indore, MP.',
  alternates: { canonical: 'https://jaqyi.com/' },
  keywords: [
    'web development company india', 'app development company india',
    'AI automation agency', 'software agency indore',
    'react development', 'flutter app development', 'SaaS development india',
    'machine learning company', 'chatbot development india',
    'web design indore', 'IT company indore madhya pradesh', 'JAQYI',
  ],
  openGraph: {
    title: 'JAQYI | Web Development, App Development & AI Automation Agency',
    description: 'JAQYI is a leading software agency in India.',
    url: 'https://jaqyi.com/',
  },
  other: {
    'script:ld+json': JSON.stringify(homeSchema),
  },
};

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <main>
        <div id="home"><Hero /></div>
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
