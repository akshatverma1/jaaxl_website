import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Brain, MessageSquare, BarChart, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageSEO from '../components/SEO/PageSEO';
import { Button } from '../components/ui/button';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jaqyi.com/services/ai-automation#service",
      "name": "AI & Automation Services",
      "provider": { "@id": "https://jaqyi.com/#organization" },
      "description": "Custom AI development, machine learning, NLP, conversational AI, and intelligent business automation for enterprises and startups in India and USA.",
      "serviceType": "Artificial Intelligence & Automation",
      "areaServed": ["India", "United States"],
      "url": "https://jaqyi.com/services/ai-automation"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI automation and how can it help my business?",
          "acceptedAnswer": { "@type": "Answer", "text": "AI automation uses artificial intelligence to perform tasks that previously required human effort — such as data extraction, customer service, lead generation, document processing, and workflow routing. It reduces costs, increases speed, and eliminates human error. JAQYI builds custom AI automation systems tailored to your specific business processes." }
        },
        {
          "@type": "Question",
          "name": "How much does AI development cost in India?",
          "acceptedAnswer": { "@type": "Answer", "text": "AI development costs vary by complexity. A simple AI chatbot or automation script starts from ₹50,000–₹1,50,000. A custom machine learning model or AI workflow costs ₹2,00,000–₹8,00,000. An enterprise AI platform with multiple models, APIs, and dashboards can cost ₹10,00,000–₹50,00,000+. JAQYI offers phased development to reduce upfront investment." }
        },
        {
          "@type": "Question",
          "name": "Can you integrate AI into my existing software?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAQYI specializes in AI integrations — adding AI capabilities (chatbots, recommendations, classification, data extraction) to existing CRMs, ERPs, mobile apps, and websites via APIs without rebuilding your entire system." }
        },
        {
          "@type": "Question",
          "name": "What AI technologies does JAQYI use?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAQYI uses OpenAI GPT models, Google Gemini, Claude (Anthropic), Hugging Face transformers, LangChain, LlamaIndex, Python, FastAPI, and cloud platforms like AWS SageMaker and Google AI Platform. We choose the best tools based on your use case, budget, and data privacy requirements." }
        },
        {
          "@type": "Question",
          "name": "What is a RAG (Retrieval-Augmented Generation) system?",
          "acceptedAnswer": { "@type": "Answer", "text": "RAG is an AI architecture that combines a language model with your proprietary knowledge base. Instead of the AI hallucinating answers, it retrieves relevant documents from your database and uses them to generate accurate, sourced responses. JAQYI builds RAG chatbots for customer support, internal knowledge management, and document Q&A." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaqyi.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://jaqyi.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "AI & Automation", "item": "https://jaqyi.com/services/ai-automation" }
      ]
    }
  ]
};

const services = [
  { icon: Cpu, name: "Custom AI Development", desc: "End-to-end AI product development — from data pipelines and model training to production deployment and monitoring." },
  { icon: Brain, name: "Machine Learning Solutions", desc: "Predictive analytics, recommendation engines, classification models, and anomaly detection built on your data." },
  { icon: MessageSquare, name: "NLP & Conversational AI", desc: "Intelligent chatbots, virtual assistants, document Q&A systems, and RAG pipelines powered by GPT-4, Gemini, and Claude." },
  { icon: BarChart, name: "Data Analytics & BI", desc: "Turn raw data into actionable dashboards with automated reporting, trend analysis, and AI-driven insights." },
  { icon: Zap, name: "Business Process Automation", desc: "Automate repetitive workflows — lead scraping, email outreach, data entry, document processing, and multi-step pipelines." },
  { icon: Shield, name: "AI Integration & APIs", desc: "Add AI capabilities to your existing software via clean REST APIs without rebuilding your entire tech stack." },
];

const technologies = ["OpenAI GPT-4o", "Google Gemini", "LangChain", "LlamaIndex", "Python", "FastAPI", "Hugging Face", "AWS SageMaker", "ChromaDB", "Pinecone", "PostgreSQL", "Docker"];

const faqs = [
  { q: "What is AI automation and how can it help my business?", a: "AI automation uses artificial intelligence to perform tasks that previously required human effort — such as data extraction, customer service, lead generation, and document processing. It reduces costs, increases speed, and eliminates human error. JAQYI builds custom AI automation systems tailored to your specific business processes." },
  { q: "How much does AI development cost in India?", a: "A simple AI chatbot or automation script starts from ₹50,000–₹1,50,000. A custom ML model costs ₹2,00,000–₹8,00,000. An enterprise AI platform can cost ₹10,00,000–₹50,00,000+. We offer phased development to reduce upfront investment." },
  { q: "Can you integrate AI into my existing software?", a: "Yes. We specialize in AI integrations — adding chatbots, recommendations, classification, and data extraction to existing CRMs, ERPs, mobile apps, and websites via APIs." },
  { q: "What AI technologies does JAQYI use?", a: "We use OpenAI GPT models, Google Gemini, Claude (Anthropic), Hugging Face transformers, LangChain, LlamaIndex, and cloud platforms like AWS SageMaker and Google AI Platform." },
  { q: "What is a RAG system?", a: "RAG (Retrieval-Augmented Generation) combines a language model with your knowledge base. Instead of hallucinating, the AI retrieves relevant documents and generates accurate, sourced responses. We build RAG chatbots for customer support, internal knowledge management, and document Q&A." },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="svc-page-faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
      <button className="svc-page-faq-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{faq.q}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="svc-page-faq-answer">{faq.a}</div>}
    </motion.div>
  );
};

const AIAutomation = () => (
  <div className="svc-page">
    <PageSEO
      title="AI & Automation Services in India | Machine Learning & AI Development — JAQYI"
      description="JAQYI offers custom AI development, machine learning, NLP, chatbots, and business automation services for enterprises and startups in India and USA. Transform your business with intelligent AI solutions."
      canonical="https://jaqyi.com/services/ai-automation"
      keywords={[
        'AI automation services india', 'artificial intelligence development company india',
        'machine learning company india', 'NLP development india', 'chatbot development india',
        'AI agency india', 'AI development cost india', 'GPT integration india',
        'business automation india', 'RAG chatbot development', 'LangChain development',
        'AI solutions for business india', 'generative AI development india'
      ]}
      schema={schema}
    />
    <Header />

    {/* Hero */}
    <section className="svc-page-hero">
      <div className="svc-page-hero-inner">
        <motion.div className="svc-page-breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">Home</Link> <span>/</span> <Link to="/#services">Services</Link> <span>/</span> <span>AI & Automation</span>
        </motion.div>
        <motion.h1 className="svc-page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          AI & Automation Services in India
        </motion.h1>
        <motion.p className="svc-page-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          We build custom AI solutions — intelligent chatbots, machine learning models, NLP systems, and business automation pipelines that work 24/7 to grow your business. No off-the-shelf tools. Pure custom AI.
        </motion.p>
        <motion.div className="svc-page-hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button asChild className="cta-primary">
            <a href="/#contact">Discuss Your AI Project <ArrowRight size={18} /></a>
          </Button>
          <Button asChild variant="outline" className="cta-secondary hover:text-white">
            <a href="/#portfolio">See AI Case Studies</a>
          </Button>
        </motion.div>
        <div className="svc-page-trust">
          {["GPT-4 & Gemini Experts", "Production AI Systems", "100% Custom Solutions"].map(t => (
            <div key={t} className="svc-page-trust-item"><CheckCircle2 size={16} /><span>{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Our AI & Automation Services</h2>
          <p className="section-subtitle">From intelligent chatbots to full enterprise AI platforms — we build it all</p>
        </motion.div>
        <div className="svc-page-grid">
          {services.map((s, i) => (
            <motion.div key={s.name} className="svc-page-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="service-icon-wrapper"><s.icon className="service-icon" /></div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-description">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why JAQYI */}
    <section className="svc-page-section svc-page-section--alt">
      <div className="svc-page-container">
        <div className="svc-page-why">
          <motion.div className="svc-page-why-content" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Why Choose JAQYI for AI Development?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
              We've shipped AI products in production — not just demos. From multi-agent lead generation 
              systems that scrape and enrich 10,000+ prospects per day, to RAG-based chatbots serving 
              enterprise knowledge bases, we build AI that creates measurable business value.
            </p>
            {[
              "Real production AI — systems that run 24/7 at scale",
              "Multi-agent architectures using LangChain and LangGraph",
              "Vector database expertise: ChromaDB, Pinecone, Weaviate",
              "Secure, on-premise AI for data-sensitive organizations",
              "Integration with your existing CRM, ERP, or database",
              "Transparent AI — full explainability and monitoring dashboards",
            ].map(item => (
              <div key={item} className="svc-page-why-item">
                <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="svc-page-why-stats" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[["15+", "AI Systems Built"], ["10K+", "Records/Day Processed"], ["40%", "Avg Cost Reduction"], ["24/7", "Autonomous Operation"]].map(([v, l]) => (
              <div key={l} className="stat-card">
                <h3 className="stat-value">{v}</h3>
                <p className="stat-label">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Technologies */}
    <section className="svc-page-section">
      <div className="svc-page-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">AI Technologies We Master</h2>
          <p className="section-subtitle">Cutting-edge AI tools and frameworks for production-grade systems</p>
        </motion.div>
        <div className="svc-page-tech-grid">
          {technologies.map((tech, i) => (
            <motion.div key={tech} className="svc-page-tech-badge" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="svc-page-section svc-page-section--alt">
      <div className="svc-page-container svc-page-faq-container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Common questions about AI development and automation</p>
        </motion.div>
        <div className="svc-page-faq">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="svc-page-cta">
      <div className="svc-page-container">
        <motion.div className="svc-page-cta-inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Ready to Automate Your Business with AI?</h2>
          <p>Tell us your use case and we'll design an AI solution that delivers real ROI within weeks.</p>
          <div className="svc-page-cta-btns">
            <Button asChild className="cta-primary">
              <a href="/#contact">Start Your AI Project <ArrowRight size={18} /></a>
            </Button>
            <a href="mailto:akshat@jaqyi.com" className="svc-page-contact-link"><Mail size={16} />akshat@jaqyi.com</a>
            <a href="tel:+919109621850" className="svc-page-contact-link"><Phone size={16} />+91 9109621850</a>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AIAutomation;
