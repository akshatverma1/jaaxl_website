// Doott comparison pages (/products/doott/vs/[slug]).
// Competitor statements are limited to stable, publicly documented pricing MODELS —
// no competitor prices are quoted. Re-check against `pricingUrl` before editing.

export const COMPARISONS_CHECKED = 'November 2026';

export const comparisons = [
  {
    slug: 'apollo',
    name: 'Apollo.io',
    pricingUrl: 'https://www.apollo.io/pricing',
    title: 'Doott vs Apollo.io',
    metaTitle: 'Doott vs Apollo.io — Affordable Apollo Alternative for India (₹179 Lifetime)',
    metaDescription:
      'Comparing Doott and Apollo.io for B2B lead lists: Doott is a ₹179 one-time B2B contact database with unlimited CSV exports; Apollo is a per-user subscription sales platform with credits. See which fits your team.',
    intro:
      'Apollo.io is a full sales-engagement platform: contact data plus email sequences, a dialer and CRM sync, sold as per-user subscriptions with monthly credit allowances. Doott does one job — finding B2B contacts and exporting them — for a single one-time payment.',
    rows: [
      ['Pricing model', 'One-time ₹179, lifetime access', 'Per-user subscription (monthly or annual), plus a limited free plan'],
      ['Seats', 'No per-seat pricing', 'Priced per user'],
      ['Exports', 'Unlimited CSV exports, no row limits', 'Exports and contact reveals consume plan credits'],
      ['Database', '43.9M+ people records, India-heavy coverage', 'Large global B2B database'],
      ['Filters', 'Job title, city, state, industry, company, has-email / has-phone', 'Extensive filters incl. company size, technologies and intent'],
      ['Email sequences & dialer', 'Not included — export to your own tools', 'Built in'],
      ['Best for', 'Founders, recruiters, agencies and small sales teams building lists on a budget', 'Sales teams that want data and outreach in one platform'],
    ],
    chooseDoott: [
      'You mainly need lead lists and want to export them freely',
      'You are a founder, freelancer or small team and per-seat subscriptions don’t make sense',
      'Your market is India and you want city- and category-level lists',
    ],
    chooseOther: [
      'You want email sequencing, a dialer and CRM workflows in the same tool',
      'You need advanced firmographic or intent filters',
      'You are a large team that needs seat management and admin controls',
    ],
    keywords: ['Apollo alternative', 'Apollo.io alternative India', 'Doott vs Apollo', 'cheap Apollo alternative', 'Apollo lifetime deal alternative'],
  },
  {
    slug: 'zoominfo',
    name: 'ZoomInfo',
    pricingUrl: 'https://www.zoominfo.com/pricing',
    title: 'Doott vs ZoomInfo',
    metaTitle: 'Doott vs ZoomInfo — ZoomInfo Alternative Without the Annual Contract | ₹179',
    metaDescription:
      'Comparing Doott and ZoomInfo: Doott is a ₹179 one-time B2B contact database with unlimited CSV exports; ZoomInfo is an enterprise data platform sold on quote-based annual contracts. See which is right for you.',
    intro:
      'ZoomInfo is an enterprise go-to-market data platform with deep company intelligence, sold through quote-based annual contracts. Doott is built for teams that simply need searchable, exportable B2B contacts without a sales call or a contract.',
    rows: [
      ['Pricing model', 'One-time ₹179, lifetime access', 'Quote-based, typically annual contracts'],
      ['How to buy', 'Self-serve checkout, instant activation', 'Through the ZoomInfo sales team'],
      ['Seats', 'No per-seat pricing', 'Priced by seats, credits and product mix'],
      ['Exports', 'Unlimited CSV exports, no row limits', 'Credit-based'],
      ['Database', '43.9M+ people records, India-heavy coverage', 'Very large global database with deep firmographics'],
      ['Intent data & integrations', 'Not included — export CSV to any tool', 'Extensive (intent signals, CRM and workflow integrations)'],
      ['Best for', 'Founders, recruiters, agencies and SMB sales teams', 'Mid-market and enterprise revenue teams'],
    ],
    chooseDoott: [
      'You want to start today without a sales call or annual contract',
      'Your budget is small and you need lists more than intelligence',
      'You sell into India and want city- and category-level contact lists',
    ],
    chooseOther: [
      'You need buyer-intent signals and deep firmographic data',
      'You need managed integrations into an enterprise CRM stack',
      'You have the budget for an annual enterprise data contract',
    ],
    keywords: ['ZoomInfo alternative', 'ZoomInfo alternative India', 'Doott vs ZoomInfo', 'cheap ZoomInfo alternative', 'ZoomInfo without contract'],
  },
];

export function getComparison(slug) {
  return comparisons.find((c) => c.slug === slug) || null;
}
