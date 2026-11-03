import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'JAQYI Studio — software development services';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'JAQYI Studio', title: 'Software built for your business.', subtitle: 'Websites, mobile apps, SaaS platforms & AI automation — for clients in India, the USA and worldwide.' });
}
