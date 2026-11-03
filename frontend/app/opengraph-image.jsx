import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'JAQYI — Software studio & product company';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({
    eyebrow: 'Studio + Products',
    title: 'We build software for businesses — and for the world.',
    subtitle: 'Web, mobile, SaaS & AI automation by JAQYI Studio. Products like Doott by JAQYI Products.',
  });
}
