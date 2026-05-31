import JobApplicationPage from '@/components/pages/JobApplication';

export const metadata = {
  title: 'Sales Person Application | Careers at JAQYI',
  description: 'Apply for the Sales Person role at JAQYI. We are looking for talented professionals to join our elite software development studio.',
  alternates: { canonical: 'https://jaqyi.com/careers/sales-person' },
};

export default function JobApplication() {
  return <JobApplicationPage />;
}
