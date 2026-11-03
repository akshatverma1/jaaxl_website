import { projects } from '@/data/projects';
import { products } from '@/data/products';

const BASE = 'https://jaqyi.com';

// Generated at build time — new projects in data/projects.js are picked up automatically.
export default function sitemap() {
  const lastModified = new Date();

  const staticPages = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.95 },
    { path: '/products', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/services/web-development', changeFrequency: 'monthly', priority: 0.95 },
    { path: '/services/app-development', changeFrequency: 'monthly', priority: 0.95 },
    { path: '/services/ai-automation', changeFrequency: 'monthly', priority: 0.95 },
    { path: '/portfolio', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/careers/sales-person', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...staticPages.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
