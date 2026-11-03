import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'Doott by JAQYI — 43.9M+ B2B contacts, searchable and exportable, ₹179 lifetime';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({
    eyebrow: 'JAQYI Products',
    title: 'Doott — 43.9M+ B2B contacts. Instantly searchable.',
    subtitle: 'Filter by role, city & verified email or phone. Unlimited CSV export. ₹179 one-time.',
    footer: 'jaqyi.com/products/doott · doott.jaqyi.com',
  });
}
