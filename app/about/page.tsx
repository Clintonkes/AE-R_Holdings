import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Eye,
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  Star,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AE$R Holdings — our story, mission, values, and the dedicated team behind New Jersey\'s premium cleaning service.',
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To deliver consistently exceptional cleaning services that create healthier, more comfortable living and working spaces for every client we serve across New Jersey.',
    color: 'text-[#0EA5E9]',
    bg: 'bg-[#0EA5E9]/10',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be the most trusted and recognized premium cleaning service provider in the Tri-State area, setting the standard for quality, reliability, and customer satisfaction.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Integrity, professionalism, and genuine care guide everything we do. We treat every home and business as if it were our own, with the respect and attention it deserves.',
    color: 'text-[#22C55E]',
    bg: 'bg-green-50',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Request a Quote',
    description:
      'Contact us online, by phone, or through our booking form. Tell us about your space and cleaning needs. We\'ll provide a free, transparent quote with no surprises.',
  },
  {
    step: '02',
    title: 'Schedule Your Service',
    description:
      'Pick a date and time that works for your schedule. We offer flexible morning, afternoon, and evening slots, including weekends and holidays.',
  },
  {
    step: '03',
    title: 'We Clean & Inspect',
    description:
      'Our vetted, trained professionals arrive on time with all supplies. We follow a detailed checklist and conduct a quality inspection before leaving.',
  },
  {
    step: '04',
    title: 'Enjoy Your Space',
    description:
      'Come home or return to your office to find it sparkling clean. If anything doesn\'t meet your expectations, we\'ll make it right — guaranteed.',
  },
];

const teamMembers = [
  {
    name: 'Angela Roberts',
    role: 'Founder & CEO',
    description: '15+ years in the cleaning industry. Passionate about building a reliable, customer-first business.',
    initials: 'AR',
  },
  {
    name: 'Edwin Cruz',
    role: 'Operations Manager',
    description: 'Ensures every team and every job meets our high standards of quality and professionalism.',
    initials: 'EC',
  },
  {
    name: 'Rosa Mendez',
    role: 'Lead Residential Specialist',
    description: '10 years of residential cleaning expertise. Known for her meticulous attention to detail.',
    initials: 'RM',
  },
  {
    name: 'James Park',
    role: 'Commercial Division Head',
    description: 'Manages our commercial cleaning contracts and ensures business clients always come first.',
    initials: 'JP',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] via-[#1E2E42] to-[#0B192C]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#0EA5E9]/15 text-[#0EA5E9] text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About AE<span className="text-[#0EA5E9]">$</span>R Holdings
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            A decade of excellence, thousands of happy clients, and an unwavering commitment
            to making New Jersey cleaner, one space at a time.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block bg-[#F0F9FF] text-[#0EA5E9] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B192C] leading-tight mb-6">
                Built on Trust, Delivered with Excellence
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  AE$R Holdings was founded with a simple but powerful vision: to provide cleaning services
                  that people could genuinely rely on. Starting from a small residential operation in Rutherford,
                  New Jersey, we have grown into a full-service cleaning company serving hundreds of clients
                  across the state.
                </p>
                <p>
                  Over the past decade, we have refined our processes, expanded our team, and built a reputation
                  for consistency that sets us apart. Every member of our staff is background-checked, professionally
                  trained, and dedicated to exceeding client expectations on every visit.
                </p>
                <p>
                  Today, AE$R Holdings serves both residential and commercial clients with a comprehensive range
                  of services, from routine maintenance cleaning to specialized post-construction cleanups. Our
                  growth has been powered entirely by word-of-mouth referrals — the highest compliment a service
                  business can receive.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Users, value: '500+', label: 'Happy Clients' },
                  { icon: Star, value: '5.0', label: 'Avg Rating' },
                  { icon: Award, value: '10+', label: 'Years Experience' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="bg-[#F0F9FF] rounded-2xl p-4 text-center">
                    <Icon className="w-6 h-6 text-[#0EA5E9] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#0B192C]">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80"
                alt="Professional cleaning team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-[#F0F9FF] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-white text-[#0EA5E9] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B192C]">Mission & Values</h2>
            <p className="text-slate-500 mt-4">
              Our core principles guide every decision, every interaction, and every job we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-xl font-bold text-[#0B192C] mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#F0F9FF] text-[#0EA5E9] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              The People Behind the Clean
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B192C]">Meet Our Team</h2>
            <p className="text-slate-500 mt-4">
              A dedicated group of professionals committed to delivering the highest standard of service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#0B192C] to-[#1E2E42] flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#0EA5E9] rounded-full flex items-center justify-center text-[#0B192C] font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0B192C] text-base">{member.name}</h3>
                  <p className="text-[#0EA5E9] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#0EA5E9]/15 text-[#0EA5E9] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Simple Process</h2>
            <p className="text-slate-400 mt-4">
              Getting started with AE$R Holdings is easy. Here&apos;s how we work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-[#0EA5E9]/20 z-0 -translate-y-0.5" />
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative z-10">
                  <div className="w-14 h-14 bg-[#0EA5E9] rounded-2xl flex items-center justify-center text-[#0B192C] font-bold text-lg mb-5">
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold text-base mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-8 py-4 rounded-full hover:bg-[#0284C7] hover:scale-105 transition-all duration-300"
            >
              Book Your First Clean
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications/Achievements */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 'Licensed', label: 'State of New Jersey' },
              { value: 'Fully Insured', label: 'Liability & Workers Comp' },
              { value: 'Eco-Certified', label: 'Green Cleaning Products' },
              { value: 'BBB Accredited', label: 'A+ Rating' },
            ].map(({ value, label }) => (
              <div key={value} className="p-4">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                </div>
                <p className="font-bold text-[#0B192C] text-lg">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
