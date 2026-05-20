import { ShieldCheck, UserCheck, BadgeCheck, Clock } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Fully Licensed & Insured',
    description: 'Complete protection and peace of mind for every job',
  },
  {
    icon: UserCheck,
    title: 'Background-Checked Staff',
    description: 'Every team member is thoroughly vetted and trained',
  },
  {
    icon: BadgeCheck,
    title: 'Satisfaction Guaranteed',
    description: "Not done until you're 100% happy",
  },
  {
    icon: Clock,
    title: '24hr Response Time',
    description: 'Quick responses and flexible scheduling for you',
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#EAF6FF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4 group"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                <Icon className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A] text-base mb-1">{title}</h3>
                <p className="text-slate-500 text-sm leading-snug">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
