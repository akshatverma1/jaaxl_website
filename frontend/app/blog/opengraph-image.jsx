import { ogCard, ogSize } from '@/lib/ogCard';

export const alt = 'JAQYI Blog — guides on software, apps and lead generation';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Blog', title: 'Guides from the JAQYI team.', subtitle: 'What software costs, how long it takes, and how to grow with it.' });
}
