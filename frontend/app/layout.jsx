import './globals.css';
import './app.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import WhatsAppButton from '@/components/WhatsAppButton';
import MotionProvider from '@/components/MotionProvider';
import { company, organizationSchema, jsonLd } from '@/data/site';
import { products } from '@/data/products';

export const metadata = {
  metadataBase: new URL('https://jaqyi.com'),
  title: {
    default: 'JAQYI | Software Studio & Product Company — Web, App, AI & Doott',
    template: '%s | JAQYI',
  },
  description:
    'JAQYI builds software two ways: JAQYI Studio delivers custom web development, mobile apps, SaaS and AI automation for businesses in India and the USA, and JAQYI Products builds our own software — starting with Doott, a 43.9M+ B2B contact database.',
  applicationName: 'JAQYI',
  authors: [{ name: company.founder }],
  creator: 'JAQYI',
  publisher: 'JAQYI',
  keywords: [
    'JAQYI',
    'software company india',
    'software product company india',
    'web development company india',
    'app development company',
    'AI automation agency',
    'SaaS development',
    'Doott',
    'B2B contact database',
    'software studio indore',
  ],
  openGraph: {
    type: 'website',
    siteName: 'JAQYI',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jaqyi_com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify jaqyi.com in Google Search Console
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="App">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema(products))} />
        <AnalyticsTracker />
        <MotionProvider>{children}</MotionProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
