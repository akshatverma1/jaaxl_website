import PrivacyPolicyPage from '@/components/pages/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy | JAQYI — Web Development & AI Agency',
  description: "Read JAQYI's Privacy Policy to understand how we collect, use, and safeguard your personal data. We are committed to transparency and data protection.",
  alternates: { canonical: 'https://jaqyi.com/privacy-policy' },
  keywords: ['JAQYI privacy policy', 'data protection', 'personal data', 'privacy'],
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
