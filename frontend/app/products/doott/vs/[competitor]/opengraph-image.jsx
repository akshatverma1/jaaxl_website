import { ogCard, ogSize } from '@/lib/ogCard';
import { comparisons, getComparison } from '@/data/comparisons';

export const alt = 'Doott comparison';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return comparisons.map((c) => ({ competitor: c.slug }));
}

export default async function Image({ params }) {
  const { competitor } = await params;
  const c = getComparison(competitor);
  return ogCard({
    eyebrow: 'Comparison',
    title: `${c?.title || 'Doott'}`,
    subtitle: 'B2B contacts, unlimited CSV export — ₹179 one-time vs a subscription.',
    footer: `jaqyi.com/products/doott/vs/${competitor}`,
  });
}
