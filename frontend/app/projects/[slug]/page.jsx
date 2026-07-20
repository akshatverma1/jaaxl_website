import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject, getAllSlugs } from '@/data/projects';
import ProjectDetailClient from '@/components/pages/ProjectDetailClient';

/** Build static paths for all project slugs */
export async function generateStaticParams() {
  return getAllSlugs();
}

/** Dynamic SEO metadata per project */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project Not Found | JAQYI' };
  return {
    title: `${project.name} | JAQYI`,
    description: project.description,
    alternates: { canonical: `https://jaqyi.com/projects/${slug}` },
    openGraph: {
      title: project.name,
      description: project.description,
      url: `https://jaqyi.com/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
