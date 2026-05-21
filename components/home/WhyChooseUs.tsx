import Link from 'next/link';
import { Leaf, Users, Calendar, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'We use environmentally safe cleaning products that are tough on grime but gentle on your family and the planet.',
    badge: 'Green Certified',
    badgeColor: 'bg-[#22C55E]/10 text-[#22C55E]',
    iconBg: 'bg-[#22C55E]/10',
    iconColor: 'text-[#22C55E]',
  },
  {
    icon: Users,
    title: 'Vetted Professionals',
    description: 'Every team member undergoes background checks, professional training, and ongoing performance evaluations.',
    badge: 'Background Checked',
    badgeColor: 'bg-blue-100 text-blue-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book at your convenience — mornings, evenings, weekends. We work around your schedule, not the other way around.',
    badge: '7 Days a Week',
    badgeColor: 'bg-[#0EA5E9]/10 text-[#0EA5E9]',
    iconBg: 'bg-[#0EA5E9]/10',
    iconColor: 'text-[#0EA5E9]',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Transparent, competitive pricing with no hidden fees. Premium quality cleaning that delivers exceptional value.',
    badge: 'No Hidden Fees',
    badgeColor: 'bg-purple-100 text-purple-600',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

const highlights = [
  'Licensed and fully insured for your protection',
  'Detailed quality checks after every service',
  'Consistent team assigned to your property',
  'Customized cleaning plans for your specific needs',
  'Use of hospital-grade disinfectants when needed',
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#F0F9FF] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block bg-white text-[#0EA5E9] text-sm font-semibold px-4 py-1.5 rounded-full mb-5 shadow-sm">
              Why AE$R Holdings?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B192C] leading-tight mb-6">
              The Smarter Choice for{' '}
              <span className="text-[#0EA5E9]">Cleaner Spaces</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We combine professional expertise with genuine care to deliver cleaning services
              that exceed expectations. Your satisfaction is our standard — every single time.
            </p>

            {/* Highlights list */}
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-base">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-8 py-4 rounded-full hover:bg-[#0284C7] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#0EA5E9]/20"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right: Benefit Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map(({ icon: Icon, title, description, badge, badgeColor, iconBg, iconColor }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white"
              >
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div className="mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B192C] mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
