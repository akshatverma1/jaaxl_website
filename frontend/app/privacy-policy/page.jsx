import PrivacyPolicyPage from '@/components/pages/PrivacyPolicy';

export const metadata = {
  title: "Privacy Policy",
  description: "How JAQYI collects, uses and protects personal data on jaqyi.com — including our contact forms, AI chat assistant, WhatsApp and cookie-free analytics.",
  alternates: { canonical: 'https://jaqyi.com/privacy-policy' },
  keywords: ['JAQYI privacy policy', 'data protection', 'personal data', 'privacy'],
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
