import './globals.css';
import './app.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export const metadata = {
  metadataBase: new URL('https://jaqyi.com'),
  title: {
    default: 'JAQYI | Web Development, App Development & AI Automation Agency',
    template: '%s | JAQYI',
  },
  description:
    'JAQYI is a leading software agency in India offering custom web development, mobile app development, AI & automation solutions. Trusted by businesses across India and USA. Based in Indore, MP.',
  keywords: [
    'JAQYI',
    'web development',
    'app development',
    'AI automation',
    'digital marketing',
    'software agency india',
    'web development company',
    'mobile app development',
    'software studio',
    'IT company indore',
  ],
  openGraph: {
    type: 'website',
    siteName: 'JAQYI',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="App">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
