import { ogCard, ogSize } from '@/lib/ogCard';
import { posts, getPost } from '@/data/posts';

export const alt = 'JAQYI blog guide';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogCard({ eyebrow: post?.category || 'Guide', title: post?.title || 'JAQYI Blog', footer: `jaqyi.com/blog/${slug}` });
}
