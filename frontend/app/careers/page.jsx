import CareersPage from '@/components/pages/Careers';

export const metadata = {
  title: 'Careers at JAQYI | Join Our Software Development Team',
  description: 'We are hiring at JAQYI — a creative software studio in Indore, India. Join our elite team and work on cutting-edge web development, AI automation, and digital marketing projects.',
  alternates: { canonical: 'https://jaqyi.com/careers' },
  keywords: [
    'careers JAQYI', 'software jobs indore', 'web developer jobs india',
    'AI developer jobs', 'sales jobs software company', 'tech jobs india',
    'remote jobs india', 'software studio hiring',
  ],
};

export default function Careers() {
  return <CareersPage />;
}
