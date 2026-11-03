import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'JAQYI portfolio — selected work';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Our Work', title: 'Selected work by JAQYI.', subtitle: 'AI agents, SaaS platforms, mobile apps and websites — shipped and live.' });
}
