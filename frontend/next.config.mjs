/** @type {import('next').NextConfig} */
// Portfolio entries removed in the Nov 2026 audit (dead, duplicate or unbuilt) → keep old links working
const REMOVED_PROJECTS = [
  'tennessee-upgrade', 'spa-app', 'jaqyi-website', 'meditative-wings', 'cred-manage-cloud', 'cred-manage',
  'florida-scraper', 'keli-sensing', 'leader-backend', 'one-link-scraper', 'email-sender', 'bulkreach-pro',
  'lead-intel', 'onkaam', 'eth-builder',
];

const nextConfig = {
  async redirects() {
    return [
      ...REMOVED_PROJECTS.map((slug) => ({
        source: `/projects/${slug}`,
        destination: slug === 'meditative-wings' ? '/projects/meditative-wing' : '/portfolio',
        permanent: true,
      })),
      { source: '/projects/doott', destination: '/products/doott', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'doott.jaqyi.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
