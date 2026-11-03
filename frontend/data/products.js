// JAQYI Products — software we build and run ourselves.
// Facts here mirror the live product sites; update them together.

export const products = [
  {
    slug: 'doott',
    name: 'Doott',
    status: 'Live',
    category: 'B2B Lead Generation',
    applicationCategory: 'BusinessApplication',
    appUrl: 'https://doott.jaqyi.com',
    pricingUrl: 'https://doott.jaqyi.com/pricing',
    loginUrl: 'https://doott.jaqyi.com/login',
    ogImage: 'https://doott.jaqyi.com/doott-og.jpg',
    tagline: 'B2B contact database & lead generation platform',
    headline: '43.9 million B2B contacts. Instantly searchable.',
    summary:
      'Doott is a searchable B2B contact database with 43.9M+ people and their company records. Filter by job title, location, verified email or phone, then export to CSV — for a one-time price instead of a per-seat subscription.',
    problem:
      'Sales teams, founders and recruiters in India overpay for contact data: most B2B databases charge monthly per-seat fees and ration exports with credits. Doott puts the whole database behind one small, one-time payment.',
    audience: [
      { name: 'Sales teams', desc: 'Build prospect lists by role, industry and city, and push them straight into your CRM as CSV.' },
      { name: 'Founders', desc: 'Find your first customers, partners and investors without a sales-tool budget.' },
      { name: 'Recruiters', desc: 'Source candidates by job title and location, with direct emails and phone numbers.' },
      { name: 'Agencies & freelancers', desc: 'Pull niche, city-level lead lists for client outreach campaigns in minutes.' },
    ],
    stats: [
      { value: '43.9M+', label: 'People records' },
      { value: '4,000+', label: 'Subcategories' },
      { value: '17', label: 'Data columns' },
      { value: '₹179', label: 'One-time, lifetime' },
    ],
    features: [
      {
        icon: 'Search',
        name: 'Search & filter',
        desc: 'Full-text search across every column, sort by any field, and narrow down by job title, city, state or company in milliseconds.',
      },
      {
        icon: 'Download',
        name: 'Unlimited CSV export',
        desc: 'Export the current page or the full filtered result to CSV. No row limits, no credits, no gated downloads.',
      },
      {
        icon: 'Mail',
        name: 'Email & phone views',
        desc: 'Dedicated Email and Number tabs show only contacts you can actually reach — verified emails or direct phone numbers.',
      },
      {
        icon: 'Building2',
        name: 'Company intelligence',
        desc: 'Browse companies by industry, city and state, with websites, emails and phone numbers on the records that have them.',
      },
      {
        icon: 'Compass',
        name: 'Category & city explorer',
        desc: 'Jump straight into an industry, a job role or a city. One click opens the matching people and companies, ready to filter.',
      },
      {
        icon: 'Database',
        name: 'Live cloud database',
        desc: 'Every query hits a live PostgreSQL database on Google Cloud, cached with Redis — not a stale spreadsheet that ages in your inbox.',
      },
    ],
    pricing: {
      plan: 'Lifetime access',
      price: 179,
      currency: 'INR',
      display: '₹179',
      period: 'one-time payment',
      includes: [
        '43.9M+ B2B contacts',
        'Verified email addresses & direct phone numbers',
        'Unlimited CSV exports',
        'People search, company intelligence & explorer',
        'All future database updates',
      ],
      note: 'Secure checkout via Razorpay with instant activation.',
    },
    howItWorks: [
      { n: '01', title: 'Get lifetime access', desc: 'Pay ₹179 once on doott.jaqyi.com. Your account activates instantly.' },
      { n: '02', title: 'Search & filter', desc: 'Pick an industry, role or city — or search any keyword — and narrow to contacts with emails or phones.' },
      { n: '03', title: 'Export & reach out', desc: 'Download the list as CSV and load it into your CRM, email tool or dialer.' },
    ],
    faqs: [
      {
        q: 'What is Doott?',
        a: 'Doott is a B2B contact database and lead generation platform built by JAQYI. It lets you search 43.9M+ people records by job title, location, company and contact availability, and export the results to CSV.',
      },
      {
        q: 'How much does Doott cost?',
        a: 'Doott costs ₹179 as a one-time payment for lifetime access. There is no monthly subscription and no per-seat pricing, and future database updates are included.',
      },
      {
        q: 'Is Doott an alternative to Apollo.io or ZoomInfo?',
        a: 'Yes. Doott covers the core prospecting job — finding people by role and location and exporting their contact details — without the recurring per-seat subscriptions those platforms charge.',
      },
      {
        q: 'Can I export leads to CSV?',
        a: 'Yes. Every view — People, Email, Number and Companies — has a one-click CSV export, either for the current page or the full filtered result, with no row limits.',
      },
      {
        q: 'How fresh is the data?',
        a: 'The database lives in Google Cloud SQL (PostgreSQL) and is updated through automated enrichment pipelines. Every search runs against the live database.',
      },
      {
        q: 'Who builds Doott?',
        a: 'Doott is built and run by JAQYI, a software studio and product company based in Indore, India.',
      },
    ],
    keywords: [
      'Doott',
      'B2B contact database',
      'B2B contact database India',
      'lead generation platform',
      'Apollo alternative India',
      'ZoomInfo alternative',
      'B2B email list',
      'sales leads database',
      'recruiter contact database',
      'export leads to CSV',
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}
