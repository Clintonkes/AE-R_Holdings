import Link from 'next/link';
import { Home, Building2, Sparkles, ArrowLeftRight, HardHat, Star, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description:
      'Comprehensive home cleaning tailored to your lifestyle. From routine maintenance to detailed cleanings, we keep your home spotless.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description:
      'Professional office and commercial space cleaning that creates a productive, healthy environment for your employees and clients.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description:
      'Intensive top-to-bottom cleaning that reaches every corner. Perfect for seasonal refreshes or when your space needs extra attention.',
    color: 'text-[#2DD4BF]',
    bg: 'bg-teal-50',
  },
  {
    icon: ArrowLeftRight,
    title: 'Move In/Move Out',
    description:
      'Stress-free moving transitions with thorough cleaning of your old or new space. Leave it spotless and ready for the next chapter.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: HardHat,
    title: 'Post-Construction',
    description:
      'Specialized cleaning to remove construction dust, debris, and residue after renovations or new builds, making your space move-in ready.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: Star,
    title: 'Specialty Cleaning',
    description:
      'Custom cleaning solutions for unique needs — carpet deep-cleaning, upholstery, window washing, and more tailored specialty services.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export function Services() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#EAF6FF] text-[#2DD4BF] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            Comprehensive Cleaning Services
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            From residential homes to commercial spaces, we offer a full range of professional
            cleaning services designed to meet every need.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 group border border-slate-100 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{description}</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[#2DD4BF] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1E293B] hover:scale-105 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
