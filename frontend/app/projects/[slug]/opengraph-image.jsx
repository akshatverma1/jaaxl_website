import { ogCard, ogSize } from '@/lib/ogCard';
import { getProject, getAllSlugs } from '@/data/projects';

export const alt = 'JAQYI project case study';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllSlugs();
}

export default async function Image({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogCard({
    eyebrow: project?.category || 'Case study',
    title: project?.name || 'JAQYI project',
    subtitle: project?.description ? project.description.slice(0, 140) : undefined,
    footer: `jaqyi.com/projects/${slug}`,
  });
}
