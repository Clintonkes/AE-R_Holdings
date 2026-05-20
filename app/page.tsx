import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { Services } from '@/components/home/Services';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactCTA } from '@/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'AE$R Holdings | Premium Cleaning Services in New Jersey',
  description:
    'New Jersey\'s trusted cleaning service. Residential, commercial, deep cleaning, move in/out, and specialty services. 500+ happy clients. Call 1(973)937-2289.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
