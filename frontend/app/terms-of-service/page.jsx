import TermsOfServicePage from '@/components/pages/TermsOfService';

export const metadata = {
  title: 'Terms of Service | JAQYI — Web Development & AI Agency',
  description: "Read JAQYI's Terms of Service. These terms govern your use of our website and the services we provide, including web development, app development, and AI automation.",
  alternates: { canonical: 'https://jaqyi.com/terms-of-service' },
  keywords: ['JAQYI terms of service', 'terms and conditions', 'service agreement', 'JAQYI legal'],
};

export default function TermsOfService() {
  return <TermsOfServicePage />;
}
