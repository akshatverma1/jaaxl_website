import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * PageSEO — Dynamic per-page meta tag injection using react-helmet-async.
 * Inject this component at the top of every page component.
 *
 * @param {string} title        — Page title (will be appended with " | JAQYI")
 * @param {string} description  — Meta description (max 160 chars)
 * @param {string} canonical    — Canonical URL for this page
 * @param {string} ogImage      — Open Graph image URL
 * @param {string[]} keywords   — Additional page-specific keywords
 * @param {Object} schema       — Optional additional JSON-LD schema object
 */
const PageSEO = ({
  title = 'JAQYI | Web Development, App Development & AI Automation Agency',
  description = 'JAQYI is a leading software agency in India offering custom web development, mobile app development, AI & automation solutions, and digital marketing. Trusted by businesses in India and USA.',
  canonical = 'https://jaqyi.com/',
  ogImage = 'https://jaqyi.com/og-image.png',
  keywords = [],
  schema = null,
}) => {
  const fullTitle = title.includes('JAQYI') ? title : `${title} | JAQYI`;
  const baseKeywords = [
    'JAQYI', 'web development', 'app development', 'AI automation',
    'digital marketing', 'software agency india', 'web development company',
    'mobile app development', 'software studio', 'IT company indore',
  ];
  const allKeywords = [...new Set([...baseKeywords, ...keywords])].join(', ');

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="JAQYI" />

      {/* Twitter Card */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Additional Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default PageSEO;
