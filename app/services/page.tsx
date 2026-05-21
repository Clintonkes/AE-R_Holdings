import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  Building2,
  Sparkles,
  ArrowLeftRight,
  HardHat,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore AE$R Holdings\' full range of professional cleaning services: residential, commercial, deep cleaning, move in/out, post-construction, and specialty cleaning.',
};

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    tagline: 'Your Home, Spotlessly Clean',
    description:
      'Our residential cleaning service is designed to keep your home consistently clean, fresh, and comfortable. Whether you need weekly maintenance or a one-time thorough clean, our trained professionals handle every room with care and attention to detail.',
    includes: [
      'Dusting all surfaces, furniture, and fixtures',
      'Vacuuming carpets and mopping hard floors',
      'Cleaning and sanitizing bathrooms',
      'Kitchen cleaning including appliance exteriors',
      'Emptying trash bins and replacing liners',
      'Making beds and changing linens (on request)',
      'Wiping down baseboards and window sills',
    ],
    pricing: 'Starting from $120 per visit',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    highlight: 'bg-blue-500',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    tagline: 'Professional Spaces, Professional Clean',
    description:
      'First impressions matter. Our commercial cleaning service ensures your office, retail space, or facility is always presentable, hygienic, and welcoming. We work around your schedule to minimize business disruption.',
    includes: [
      'Reception and lobby area cleaning',
      'Office workstation and desk sanitization',
      'Conference room cleaning and setup',
      'Restroom deep cleaning and restocking',
      'Break room and kitchen cleaning',
      'Floor care — vacuuming, mopping, buffing',
      'Trash removal and recycling management',
    ],
    pricing: 'Starting from $200 per visit',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    highlight: 'bg-indigo-500',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    tagline: 'Go Beyond the Surface',
    description:
      'Our deep cleaning service provides a comprehensive, top-to-bottom clean that goes far beyond routine maintenance. Ideal for seasonal cleaning, preparing for guests, or refreshing your space after a long period without professional attention.',
    includes: [
      'Inside oven, refrigerator, and microwave cleaning',
      'Cabinet interior and exterior cleaning',
      'Grout and tile scrubbing',
      'Window cleaning (interior)',
      'Behind and under appliances',
      'Full bathroom descaling and disinfection',
      'Detailed cleaning of all light fixtures and fans',
    ],
    pricing: 'Starting from $280 per visit',
    iconBg: 'bg-teal-50',
    iconColor: 'text-[#0EA5E9]',
    highlight: 'bg-[#0EA5E9]',
  },
  {
    icon: ArrowLeftRight,
    title: 'Move In / Move Out',
    tagline: 'Start Fresh, Leave Nothing Behind',
    description:
      'Moving is stressful. Let us handle the cleaning so you can focus on the transition. Our move-in/move-out cleaning ensures the property is thoroughly cleaned, leaving it in pristine condition for the next occupant or your fresh start.',
    includes: [
      'Complete cleaning of all rooms and closets',
      'Deep cleaning of all appliances (inside and out)',
      'Cabinet and drawer interior cleaning',
      'Bathroom sanitization and descaling',
      'Window and mirror cleaning',
      'Wall spot cleaning and scuff removal',
      'Garage and basement sweeping',
    ],
    pricing: 'Starting from $250 per service',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    highlight: 'bg-orange-500',
  },
  {
    icon: HardHat,
    title: 'Post-Construction',
    tagline: 'After the Build, Before You Move In',
    description:
      'Construction leaves behind dust, debris, and residue that requires specialized cleaning techniques. Our post-construction cleaning team is equipped to handle the most challenging cleanup jobs, leaving your newly renovated or built space immaculate.',
    includes: [
      'Removal of construction dust from all surfaces',
      'Cleaning of windows and window tracks',
      'Paint drip and adhesive removal',
      'Debris and scrap material removal',
      'Detailed cleaning of all new fixtures',
      'HVAC vent cleaning and filter check',
      'Final polish and sanitization',
    ],
    pricing: 'Starting from $350 per service',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    highlight: 'bg-yellow-500',
  },
  {
    icon: Star,
    title: 'Specialty Cleaning',
    tagline: 'Tailored Solutions for Unique Needs',
    description:
      'Some cleaning needs require specialized equipment and expertise. Our specialty cleaning services cover a wide range of specific cleaning requirements, from upholstery to carpet restoration and beyond.',
    includes: [
      'Carpet deep cleaning and steam treatment',
      'Upholstery and furniture cleaning',
      'Exterior window washing',
      'Tile and grout restoration',
      'Hardwood floor refinishing prep',
      'Event cleanup (before and after)',
      'Hoarder and estate cleaning services',
    ],
    pricing: 'Custom quotes based on scope',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    highlight: 'bg-purple-500',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] via-[#1E2E42] to-[#0B192C]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#0EA5E9]/15 text-[#0EA5E9] text-sm font-semibold px-4 py-2 rounded-full mb-5">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Cleaning Services
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            From routine residential cleans to specialized commercial solutions,
            we offer everything you need for a spotless space.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map(({ icon: Icon, title, tagline, description, includes, pricing, iconBg, iconColor, highlight }, index) => (
            <div
              key={title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`bg-white rounded-3xl shadow-md border border-slate-100 p-8 md:p-10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B192C]">{title}</h2>
                    <p className={`text-sm font-medium ${iconColor}`}>{tagline}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">{description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-[#0B192C] mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    What&apos;s Included
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-5 border-t border-slate-100 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Pricing</p>
                    <p className="text-[#0B192C] font-bold text-lg">{pricing}</p>
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-6 py-3 rounded-full hover:bg-[#0284C7] hover:scale-105 transition-all duration-300"
                  >
                    Book This Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual Card */}
              <div
                className={`rounded-3xl overflow-hidden h-64 lg:h-full min-h-64 ${highlight} flex items-center justify-center relative ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center p-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-2xl">{title}</h3>
                  <p className="text-white/80 mt-2">{tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="bg-[#F0F9FF] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B192C] mb-4">
            Transparent Pricing, No Surprises
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            All prices listed are starting rates. Final pricing is based on the size of your
            space, frequency of service, and specific requirements. We always provide a detailed,
            free quote before any work begins. No hidden fees, no surprise charges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-8 py-4 rounded-full hover:bg-[#0284C7] hover:scale-105 transition-all duration-300"
            >
              Request Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:19739372289"
              className="inline-flex items-center gap-2 border-2 border-[#0B192C] text-[#0B192C] font-bold px-8 py-4 rounded-full hover:bg-[#0B192C] hover:text-white transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call for Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
