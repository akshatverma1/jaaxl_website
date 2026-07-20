// Mock data for JAQYI website

export const heroData = {
  company: "JAQYI",
  tagline: "A creative software studio for ambitious businesses",
  description: "We develop exceptional software solutions - from CRMs to AI SaaS platforms. Only the kind of work we're proud to sign. No shortcuts. No soulless, throwaway fluff.",
  cta: {
    primary: "View Our Work",
    secondary: "Get in Touch"
  }
};

export const servicesData = {
  title: "Our Services",
  subtitle: "Your vision, engineered to perfection",
  categories: [

    {
      id: 1,
      category: "SaaS Co-Build Studio",
      description: "Have a SaaS idea? We handle 100% of the tech — architecture, development, AI, deployment — so you can focus on the business.",
      services: [
        {
          name: "Product Strategy & Arch",
          description: "System design, roadmap planning, and tech stack decisions",
          icon: "Target"
        },
        {
          name: "Full-Stack Development",
          description: "Robust frontend, backend, database, and auth systems",
          icon: "Code"
        },
        {
          name: "AI & Automation",
          description: "OpenAI integrations, copilot flows, and n8n workflows",
          icon: "Brain"
        },
        {
          name: "SaaS Infrastructure",
          description: "Multi-tenancy, Stripe billing, and admin dashboards",
          icon: "Cloud"
        },
        {
          name: "DevOps & Deployment",
          description: "CI/CD pipelines, staging, and reliable cloud hosting",
          icon: "Server"
        },
        {
          name: "Post-Launch Retainer",
          description: "Bug fixes, scaling, and continuous feature iteration",
          icon: "Activity"
        }
      ]
    },
    {
      id: 2,
      category: "Mobile App Development",
      description: "Native and cross-platform mobile solutions",
      services: [
        {
          name: "iOS App Development",
          description: "Beautiful, performant apps for the Apple ecosystem",
          icon: "Smartphone"
        },
        {
          name: "Android App Development",
          description: "Scalable Android applications with modern architecture",
          icon: "Tablet"
        },
        {
          name: "Flutter App Development",
          description: "Cross-platform apps with stunning UI and native performance",
          icon: "Layers"
        },
        {
          name: "React Native App Development",
          description: "Build once, deploy everywhere with React Native",
          icon: "Code"
        },
        {
          name: "Hybrid App Development",
          description: "Cost-effective solutions combining web and native technologies",
          icon: "Grid"
        },
        {
          name: "PWA App Development",
          description: "Progressive web apps that work offline and feel native",
          icon: "Globe"
        }
      ]
    },
    {
      id: 3,
      category: "Web Development",
      description: "Cutting-edge web solutions that scale",
      services: [
        {
          name: "Website Design",
          description: "Stunning, conversion-focused website designs",
          icon: "Monitor"
        },
        {
          name: "WordPress Development",
          description: "Custom WordPress solutions with powerful functionality",
          icon: "Box"
        },
        {
          name: "SAAS Development",
          description: "Scalable software-as-a-service platforms",
          icon: "Cloud"
        },
        {
          name: "ERP Development",
          description: "Enterprise resource planning systems tailored to your needs",
          icon: "Database"
        }
      ]
    },
    {
      id: 4,
      category: "AI & Automation",
      description: "Intelligent solutions for the future",
      services: [
        {
          name: "AI Development",
          description: "Custom AI solutions that transform your business",
          icon: "Cpu"
        },
        {
          name: "Machine Learning",
          description: "Predictive models and intelligent automation",
          icon: "Brain"
        },
        {
          name: "NLP & Conversational AI",
          description: "Natural language processing and chatbot development",
          icon: "MessageSquare"
        },
        {
          name: "Data Analytics",
          description: "Turn data into actionable insights",
          icon: "BarChart"
        }
      ]
    }
  ]
};

export const portfolioData = {
  title: "Our Work",
  subtitle: "From autonomous AI agents to live SaaS platforms — every project is built with precision and shipped with pride.",
  portfolioUrl: "https://jaqyi-portfolio.vercel.app",
  projects: [
    // ── Video Projects (shown first) ──────────────────────────────────────
    {
      id: 9,
      name: "Suraksha — Safety Platform",
      category: "Personal Project · Live Site",
      description: "Real-time safety insights platform helping users make informed decisions in unfamiliar locations. Fully deployed and live in production.",
      image: "https://images.unsplash.com/photo-1557597774-9d475d5a31c7?w=800&q=80",
      hasVideo: true,
      videoUrl: "https://jaqyi-portfolio.vercel.app/New_Projects/suraksha.mp4",
      liveUrl: "https://suraksha.site",
      stack: ["Web App", "Real-time Data", "Location Intelligence"],
    },
    {
      id: 12,
      name: "Ahri — AI HR Agent (SaaS)",
      category: "AI SaaS Product",
      description: "AI-powered HR SaaS agent automating resume shortlisting and answering HR queries — a virtual extension of any HR team.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      hasVideo: true,
      videoUrl: "https://jaqyi-portfolio.vercel.app/New_Projects/ahri.mp4",
      liveUrl: null,
      stack: ["AI Agent", "SaaS", "Resume Parsing", "NLP"],
    },
    {
      id: 10,
      name: "Aitextify — AI Image Q&A",
      category: "Vision AI Product",
      description: "Upload any image and ask anything about it. Computer vision meets natural language in a clean, conversational web interface.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      hasVideo: true,
      videoUrl: "https://jaqyi-portfolio.vercel.app/New_Projects/aitextify.mp4",
      liveUrl: null,
      stack: ["Vision AI", "Computer Vision", "NLP"],
    },
    {
      id: 11,
      name: "Meditative Wing — Wellness Blog",
      category: "Content Website",
      description: "A serene blog platform dedicated to meditation and mindfulness, guiding readers toward calm and inner peace.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      hasVideo: true,
      videoUrl: "https://jaqyi-portfolio.vercel.app/New_Projects/medatitive_wing.mp4",
      liveUrl: null,
      stack: ["Blog Platform", "Modern Web", "Responsive Design"],
    },
    // ── AI Agent Projects ──────────────────────────────────────────────────
    {
      id: 1,
      name: "Agent-1: Field Ops Agent",
      category: "CouldYou · AI Automation",
      description: "24/7 autonomous n8n agent ingesting WhatsApp field reports via AI, syncing tasks to Monday.com & Google Sheets, and firing HTML email alerts for critical updates.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["n8n", "GPT-4o-mini", "Twilio", "Monday.com"],
    },
    {
      id: 2,
      name: "Agent-2: Growth & Outreach",
      category: "CouldYou · Lead Generation",
      description: "Daily pipeline scraping Instagram, Facebook, Google & DuckDuckGo for NGO leads, enriching 30+ fields, and generating personalized B2B emails via GPT-4o-mini.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["n8n", "Apify", "GPT-4o-mini", "Gmail API"],
    },
    {
      id: 3,
      name: "Agent-3: WhatsApp PM Agent",
      category: "CouldYou · Project Management",
      description: "Conversational WhatsApp agent that turns natural language messages into Monday.com tasks, with auto-assignment, overdue alerts, and daily executive summaries.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["n8n", "Monday.com API", "GPT-4o-mini", "WhatsApp"],
    },
    {
      id: 4,
      name: "Agent-4: Academic Scraper",
      category: "CouldYou · Research Intelligence",
      description: "Crawls PubMed, WHO IRIS, ResearchGate, and SCIRP in parallel, enriches author contacts via PeopleDataLabs & Hunter.io, and fires Telegram alerts.",
      image: "https://images.unsplash.com/photo-1532094349884-543559fee2c4?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["n8n", "Apify", "PeopleDataLabs", "Hunter.io"],
    },
    // ── Platform Projects ─────────────────────────────────────────────────
    {
      id: 5,
      name: "Florida Contractor Scraper",
      category: "Lead Gen Platform",
      description: "Full-stack web app discovering drywall contractor leads across 6 Florida metros — validated against DBPR's 266K license CSV, enriched via Apollo.io.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: "https://contractor-scraper-api-xxx-uc.a.run.app",
      stack: ["FastAPI", "React", "Apify", "Apollo.io"],
    },
    {
      id: 7,
      name: "Keli Sensing Sales Agent",
      category: "Keli Sensing · B2B Sales Platform",
      description: "Autonomous sales intelligence platform for the robotics sensor industry — scrapes news, finds decision-makers, drafts GPT-4o cold emails, and scores leads across 5 dimensions.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["Node.js", "React", "GPT-4o", "Apollo.io"],
    },
    {
      id: 6,
      name: "Tennessee Scraper Upgrade",
      category: "Platform Expansion · Architecture",
      description: "Technical spec expanding the contractor scraper platform to Tennessee with YAML config, vendor scraper mode, 3-layer lumber filtering, and multi-tenant isolation.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["FastAPI", "YAML Config", "Google Geocoding"],
    },
    {
      id: 8,
      name: "Spa Booking App Proposal",
      category: "Mobile App · iOS & Android",
      description: "Full-featured spa booking mobile app for iOS & Android backed by an Express REST API, Razorpay payments, Firebase FCM, and a React Admin dashboard.",
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
      hasVideo: false,
      videoUrl: null,
      liveUrl: null,
      stack: ["React Native", "Express", "PostgreSQL", "Razorpay"],
    },
  ]
};


export const aboutData = {
  title: "Make it the best version of what it can be",
  mission: "We're not just another agency. We're your path to exceptional web projects. JAQYI combines technical excellence with creative innovation to deliver software solutions that stand out.",
  values: [
    {
      title: "Quality First",
      description: "No shortcuts. No compromises. Only work we're proud to sign."
    },
    {
      title: "Innovation Driven",
      description: "Leveraging cutting-edge technology to solve complex problems."
    },
    {
      title: "Client Focused",
      description: "Your success is our success. We're partners in growth."
    }
  ],
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Happy Clients", value: "20+" },
    { label: "Team Members", value: "5+" },
    { label: "Years of Excellence", value: "7+" }
  ]
};

export const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content: "JAQYI transformed our vision into reality. Their AI-powered CRM solution has revolutionized how we manage customer relationships. Exceptional work!",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, E-Shop Pro",
    content: "The mobile app JAQYI developed exceeded all expectations. Beautiful design, flawless performance, and delivered on time. Highly recommended!",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, HealthCare Plus",
    content: "Their SEO and digital marketing services doubled our online traffic in just 6 months. The team is knowledgeable, responsive, and results-driven.",
    avatar: "ER"
  }
];

export const contactData = {
  title: "Let's Build Something Amazing",
  subtitle: "Ready to transform your ideas into exceptional software? Get in touch.",
  email: "akshat@jaqyi.com",
  phone: "+91 9109621850",
  address: "Industrial Estate , Sector-C , Indore , MP , India",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/jaqyi/", icon: "Linkedin" },
    { name: "Twitter", url: "https://x.com/jaqyi_com?s=21", icon: "Twitter" },
  ]
};
