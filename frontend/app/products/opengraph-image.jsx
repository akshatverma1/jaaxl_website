import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'JAQYI Products — software we build for the world';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'JAQYI Products', title: 'Software we build for the world.', subtitle: 'Our own products, built and run by JAQYI. First up: Doott — 43.9M+ B2B contacts.' });
}
