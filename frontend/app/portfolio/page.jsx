import PortfolioPageClient from '@/components/pages/PortfolioPageClient';

export const metadata = {
  title: 'Portfolio | JAQYI — Production-Grade Projects in AI, SaaS & More',
  description: 'A curated showcase of production-grade projects by JAQYI across AI agents, automation, SaaS, cloud, FinTech, and more. 35+ live projects with full tech stacks.',
  alternates: { canonical: 'https://jaqyi.com/portfolio' },
  keywords: [
    'JAQYI portfolio', 'AI agents portfolio', 'SaaS projects', 'web development portfolio',
    'automation projects', 'cloud projects', 'FinTech projects', 'software agency portfolio',
  ],
  openGraph: {
    title: 'Portfolio | JAQYI — Production-Grade Projects',
    description: 'Explore 35+ production-grade projects by JAQYI across AI, Automation, SaaS, Cloud, and FinTech.',
    url: 'https://jaqyi.com/portfolio',
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
