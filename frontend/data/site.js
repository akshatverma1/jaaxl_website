// Company-wide facts — single source for metadata, JSON-LD, footer and chatbot copy.

export const SITE_URL = 'https://jaqyi.com';

export const company = {
  name: 'JAQYI',
  legalName: 'JAQYI',
  tagline: 'Software studio & product company',
  description:
    'JAQYI is a software company from Indore, India with two arms: JAQYI Studio builds custom websites, mobile apps, SaaS and AI automation for clients, and JAQYI Products builds our own software — starting with Doott, a B2B contact database.',
  email: 'akshat@jaqyi.com',
  phone: '+91 9109621850',
  whatsapp: '919109621850', // international format, digits only (wa.me)
  whatsappMessage: "Hi JAQYI! I'd like to discuss a project.",
  // Optional: set NEXT_PUBLIC_BOOKING_URL (Cal.com / Calendly) to show "Book a call" buttons
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  founder: 'Akshat Verma',
  address: {
    streetAddress: 'Industrial Estate, Sector-C',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  logo: `${SITE_URL}/jaqyi-logo.png`,
  socials: {
    linkedin: 'https://www.linkedin.com/company/jaqyi/',
    x: 'https://x.com/jaqyi_com',
  },
};

export const whatsappUrl = (message = company.whatsappMessage) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

/** The two business segments, used on the home page, nav and hubs. */
export const segments = {
  studio: {
    name: 'JAQYI Studio',
    label: 'Services',
    href: '/services',
    headline: 'We build software for your business',
    description:
      'Custom websites, mobile apps, SaaS platforms and AI automation — designed, engineered and shipped by a senior team.',
    points: ['Web & SaaS development', 'iOS, Android & Flutter apps', 'AI agents & automation', 'SaaS co-build for founders'],
    cta: 'Explore services',
  },
  products: {
    name: 'JAQYI Products',
    label: 'Products',
    href: '/products',
    headline: 'We build software for the world',
    description:
      'Our own products that solve real, everyday problems at a fair price. First up: Doott, a searchable B2B contact database.',
    points: ['Built, owned and run by JAQYI', 'Honest one-time pricing', 'Live, continuously improved', 'First product: Doott'],
    cta: 'Explore products',
  },
};

/** Site-wide Organization + WebSite JSON-LD (rendered in the root layout). */
export function organizationSchema(products = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: company.name,
        url: `${SITE_URL}/`,
        logo: company.logo,
        description: company.description,
        email: company.email,
        telephone: company.phone,
        founder: { '@type': 'Person', name: company.founder },
        address: { '@type': 'PostalAddress', ...company.address },
        areaServed: ['IN', 'US', 'GB', 'AE', 'AU'],
        sameAs: Object.values(company.socials),
        knowsAbout: [
          'Web development',
          'Mobile app development',
          'SaaS development',
          'AI automation',
          'B2B lead generation software',
        ],
        brand: products.map((p) => ({ '@type': 'Brand', name: p.name, url: p.appUrl })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'JAQYI services and products',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'JAQYI Studio — Software development services',
              url: `${SITE_URL}/services`,
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', url: `${SITE_URL}/services/web-development` } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'App Development', url: `${SITE_URL}/services/app-development` } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Automation', url: `${SITE_URL}/services/ai-automation` } },
              ],
            },
            {
              '@type': 'OfferCatalog',
              name: 'JAQYI Products — Software products',
              url: `${SITE_URL}/products`,
              itemListElement: products.map((p) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'SoftwareApplication',
                  '@id': `${SITE_URL}/products/${p.slug}#software`,
                  name: p.name,
                  url: `${SITE_URL}/products/${p.slug}`,
                },
              })),
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: company.name,
        description: company.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
      },
    ],
  };
}

/** Serialize JSON-LD safely for a <script> tag (per Next.js JSON-LD guide). */
export function jsonLd(data) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
