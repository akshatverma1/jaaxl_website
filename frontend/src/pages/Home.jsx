import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageSEO from '../components/SEO/PageSEO';

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
      "description": "JAQYI is a creative software studio offering web development, mobile app development, AI automation, and digital marketing services for businesses in India and USA.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" }]
      },
      "inLanguage": "en-IN"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does JAQYI offer?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI offers web development, mobile app development (iOS & Android), AI & automation solutions, and digital marketing services including SEO, PPC, and social media management. We serve businesses in India and the USA." }
        },
        {
          "@type": "Question",
          "name": "Where is JAQYI located?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI is based in Indore, Madhya Pradesh, India. We serve clients across India, USA, UK, and globally. Contact us at akshat@jaqyi.com or +91 9109621850." }
        },
        {
          "@type": "Question",
          "name": "How much does web development cost at JAQYI?",
          "acceptedAnswer": { "@type": "Answer", "text": "Web development costs at JAQYI start from ₹25,000 for basic websites and go up to ₹20,00,000+ for enterprise SaaS platforms. We offer transparent, milestone-based pricing after a free consultation call." }
        },
        {
          "@type": "Question",
          "name": "Does JAQYI build mobile apps?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAQYI builds native iOS and Android apps, as well as cross-platform apps using Flutter and React Native. We handle everything from design and development to App Store and Google Play submission." }
        },
        {
          "@type": "Question",
          "name": "What AI services does JAQYI provide?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI provides custom AI development including machine learning models, NLP systems, RAG-based chatbots (powered by GPT-4, Gemini, Claude), and business process automation. We've built AI systems that process 10,000+ records per day autonomously." }
        }
      ]
    }
  ]
};

const Home = () => {
  return (
    <div className="home-page">
      <PageSEO
        title="JAQYI | Web Development, App Development & AI Automation Agency"
        description="JAQYI is a leading software agency in India offering custom web development, mobile app development, AI & automation solutions, and digital marketing. Trusted by businesses across India and USA. Based in Indore, MP."
        canonical="https://jaqyi.com/"
        keywords={[
          'web development company india', 'app development company india',
          'AI automation agency', 'software agency indore', 'digital marketing india',
          'react development', 'flutter app development', 'SaaS development india',
          'machine learning company', 'chatbot development india',
          'web design indore', 'IT company indore madhya pradesh', 'JAQYI',
        ]}
        schema={homeSchema}
      />
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>

        <div id="services">
          <Services />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

