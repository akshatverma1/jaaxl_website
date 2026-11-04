// Blog posts. Body is an array of blocks rendered by app/blog/[slug]/page.jsx:
//   { h2 } | { h3 } | { p } | { ul: [...] } | { ol: [...] } | { table: { head: [...], rows: [[...]] } }
//   | { cta: { text, href, label } }
// Prices quoted here must match the service pages (source of truth).

export const posts = [
  {
    slug: 'website-development-cost-india',
    title: 'How Much Does It Cost to Build a Website in India? (2026 Guide)',
    description:
      'Real website development prices in India for 2026 — from ₹25,000 business websites to ₹20 lakh+ SaaS platforms — plus timelines, what drives the cost, and the hidden costs to budget for.',
    date: '2026-11-04',
    category: 'Web Development',
    readMinutes: 7,
    keywords: ['website development cost India', 'website cost India 2026', 'web app development cost', 'SaaS development cost India'],
    related: { label: 'Web development services', href: '/services/web-development' },
    body: [
      { p: 'Ask five agencies what a website costs and you will hear five very different numbers. That is not because anyone is hiding anything — "a website" can mean a five-page brochure site or a full software platform with logins, payments and dashboards. This guide breaks down what each type really costs in India in 2026, using the same price bands we quote at JAQYI.' },
      { h2: 'Website cost in India at a glance' },
      {
        table: {
          head: ['What you need', 'Typical cost (INR)', 'Typical timeline'],
          rows: [
            ['Business website (basic: 2–4 weeks; with CMS: 4–8 weeks)', '₹25,000 – ₹75,000', '2–8 weeks'],
            ['Custom web application (React / Next.js, logins, dashboards)', '₹1,00,000 – ₹5,00,000', '3–6 months'],
            ['SaaS or ERP platform (multi-tenant, billing, roles)', '₹5,00,000 – ₹20,00,000+', '3–6 months'],
          ],
        },
      },
      { p: 'These are realistic ranges for professional, custom-built work. Template sites can be cheaper; enterprise platforms with many integrations can cost more.' },
      { h2: 'What actually drives the price' },
      { h3: '1. Custom design vs. a template' },
      { p: 'A template gets you online fast and cheap, but every change fights the template. Custom design costs more up front because a designer creates wireframes and mockups around your brand and your customers — and you approve them before development starts.' },
      { h3: '2. Number of unique page types' },
      { p: 'Cost scales with unique layouts, not page count. Twenty blog posts share one template; a home page, a pricing page and a booking flow are three separate pieces of work.' },
      { h3: '3. Features and integrations' },
      { ul: [
        'User accounts and login',
        'Payments (Razorpay, Stripe) and invoicing',
        'Booking, search and filtering',
        'CRM, ERP or WhatsApp integrations',
        'Admin dashboards and reports',
      ] },
      { p: 'Each of these is real engineering. A site with logins, payments and a dashboard is a web application, and should be quoted like one.' },
      { h3: '4. Performance, SEO and accessibility' },
      { p: 'Fast loading, proper page titles, structured data and mobile-first layouts are not extras — they decide whether customers find you on Google and stay. Ask any agency how they handle these before you compare quotes.' },
      { h2: 'Costs people forget to budget for' },
      { ul: [
        'Domain name — usually a few hundred to a couple of thousand rupees a year',
        'Hosting — from free tiers for small static sites to a few thousand a month for busy applications',
        'Paid plugins, fonts, stock images or APIs',
        'Content: copywriting, photography and product data entry',
        'Maintenance after launch — security updates, backups and small changes',
      ] },
      { h2: 'How to get an accurate quote' },
      { ol: [
        'Write down the goal of the site in one sentence (for example: "get 20 enquiries a month from Indore businesses").',
        'List the pages and features you are sure you need, and the ones that are nice to have.',
        'Collect 2–3 websites you like and note what you like about each.',
        'Ask for a milestone-based quote, so you pay as working pieces are delivered.',
        'Confirm what happens after launch: warranty period, support and who owns the code.',
      ] },
      { p: 'At JAQYI every project includes a 30-day bug-fix warranty, and you own the code. Quotes are fixed and milestone-based, so there are no surprises.' },
      { cta: { text: 'Want a fixed quote for your website?', href: '/#contact', label: 'Get a free quote' } },
    ],
  },
  {
    slug: 'mobile-app-development-cost-india',
    title: 'Mobile App Development Cost in India (2026): MVP to Enterprise',
    description:
      'What it costs to build an iOS or Android app in India in 2026 — ₹1 lakh MVPs to ₹50 lakh+ enterprise apps — with timelines, Flutter vs native trade-offs and tips to cut cost without cutting quality.',
    date: '2026-11-04',
    category: 'App Development',
    readMinutes: 7,
    keywords: ['app development cost India', 'mobile app cost India 2026', 'Flutter app cost', 'MVP app cost India'],
    related: { label: 'App development services', href: '/services/app-development' },
    body: [
      { p: 'App budgets go wrong when people price "an app" instead of the specific app they need. Below are the ranges we use at JAQYI for apps built in India for clients in India, the USA and elsewhere, and the decisions that move a project from one band to the next.' },
      { h2: 'App development cost at a glance' },
      {
        table: {
          head: ['App type', 'Typical cost (INR)', 'Typical timeline'],
          rows: [
            ['Simple MVP (core flow, basic backend)', '₹1,00,000 – ₹3,00,000', '2–3 months'],
            ['Medium complexity (accounts, payments, integrations, admin panel)', '₹3,00,000 – ₹8,00,000', '3–5 months'],
            ['Enterprise-grade (scale, security, many integrations)', '₹10,00,000 – ₹50,00,000+', '5–9 months'],
          ],
        },
      },
      { h2: 'Flutter, React Native or native?' },
      { p: 'Cross-platform frameworks like Flutter and React Native let one team ship iOS and Android from a single codebase, which usually means lower cost and faster updates. Native development in Swift (iOS) and Kotlin (Android) makes sense when you need heavy device features, top-end performance or platform-specific design.' },
      { ul: [
        'Choose cross-platform for most business apps, marketplaces, booking and content apps.',
        'Choose native for AR, complex media, heavy background processing or deep OS integration.',
        'Choose a PWA if you mainly need a mobile-friendly experience without app-store distribution.',
      ] },
      { h2: 'What pushes the cost up' },
      { ul: [
        'Real-time features: chat, live tracking, notifications',
        'Payments, subscriptions and wallets',
        'Offline mode and data sync',
        'Admin panels and reporting for your team',
        'Third-party integrations (CRMs, ERPs, maps, AI services)',
        'Compliance and security requirements (health, finance)',
      ] },
      { h2: 'How to reduce cost without cutting quality' },
      { ol: [
        'Launch an MVP with the one flow that proves your idea, then iterate with real users.',
        'Use proven services (auth, payments, maps) instead of building them from scratch.',
        'Go cross-platform unless you have a concrete reason for native.',
        'Pay by milestone and insist on a working demo every two weeks.',
      ] },
      { h2: 'Ongoing costs after launch' },
      { p: 'Budget for app-store developer accounts, hosting for your backend, and maintenance: OS updates break things every year, and users expect fixes quickly. A monthly retainer is usually cheaper than paying for emergency fixes one at a time.' },
      { cta: { text: 'Planning an app? Get a phased plan and fixed quote.', href: '/#contact', label: 'Talk to our app team' } },
    ],
  },
  {
    slug: 'how-to-build-b2b-lead-list-india',
    title: 'How to Build a B2B Lead List in India: A Step-by-Step Guide',
    description:
      'A practical, step-by-step process to build a targeted B2B lead list in India — define your ideal customer, filter by role and city, keep only reachable contacts, export, clean and reach out responsibly.',
    date: '2026-11-04',
    category: 'Lead Generation',
    readMinutes: 6,
    keywords: ['B2B lead list India', 'how to build a lead list', 'B2B contact database India', 'lead generation India'],
    related: { label: 'Doott — B2B contact database', href: '/products/doott' },
    body: [
      { p: 'Most outreach fails before the first email is sent — because the list is wrong. Good lead lists are narrow, current and reachable. Here is the process we use ourselves at JAQYI, and that we built Doott to make fast.' },
      { h2: 'Step 1: Define your ideal customer' },
      { p: 'Write down who buys from you, as specifically as you can. A useful ideal customer profile answers four questions:' },
      { ul: [
        'Industry — for example, real estate developers, D2C brands, hospitals',
        'Location — country, state and the cities you can actually serve',
        'Company type or size — startups, SMEs or enterprises',
        'Decision-maker roles — founder, head of sales, HR manager, procurement',
      ] },
      { h2: 'Step 2: Pick the job titles that actually decide' },
      { p: 'Target the person who owns the problem you solve, plus one level up. Selling recruitment software? Target HR managers and HR heads, not every employee at the company. List the common variations of each title ("Head of Sales", "Sales Director", "VP Sales") so your search does not miss them.' },
      { h2: 'Step 3: Search and filter' },
      { p: 'In a B2B contact database, combine filters instead of using one broad search: role + city + industry. Start narrow — a list of 300 exactly-right contacts will outperform 30,000 loosely-related ones.' },
      { h2: 'Step 4: Keep only reachable contacts' },
      { p: 'A contact without an email or phone number is not a lead. Filter to records that have the channel you plan to use. In Doott, the Email and Number tabs do this automatically.' },
      { h2: 'Step 5: Export and clean' },
      { ol: [
        'Export to CSV.',
        'Remove duplicates and contacts you already work with.',
        'Check a sample by hand — do the titles and companies look right?',
        'Add a column for personalisation: one line about why you are reaching out to that company.',
      ] },
      { h2: 'Step 6: Reach out responsibly' },
      { p: 'Keep messages short, relevant and specific to the recipient\'s role. Always identify yourself, give a clear way to opt out, and honour opt-outs immediately. India\'s Digital Personal Data Protection Act (DPDP) sets rules for how personal data is processed — check how it applies to your outreach and keep records of where your data came from.' },
      { h2: 'Step 7: Measure and refine' },
      { p: 'Track replies by segment (city, industry, role). Double down on segments that respond, and drop the ones that don\'t. Your second list will be much better than your first.' },
      { cta: { text: 'Build your first list in minutes — 43.9M+ contacts, unlimited CSV exports, ₹179 once.', href: '/products/doott', label: 'See Doott' } },
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
