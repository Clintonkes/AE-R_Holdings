import Link from 'next/link';
import { Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0EA5E9]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex w-16 h-16 bg-[#0EA5E9]/10 rounded-2xl items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-[#0EA5E9]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Ready for a{' '}
            <span className="text-[#0EA5E9]">Spotless Home?</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Contact us today for a free quote. Our friendly team is ready to help you experience
            the AE$R Holdings difference — premium cleaning at its finest.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a
              href="tel:19739372289"
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#0EA5E9] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-5 h-5 text-[#0B192C]" />
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-0.5">Call Us Anytime</p>
                <p className="text-white font-bold text-lg">1(973)937-2289</p>
              </div>
            </a>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-0.5">Visit Our Office</p>
                <p className="text-white font-semibold text-sm">
                  5 Sylvan Street, Rutherford, NJ 07070
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-8 py-4 rounded-full text-base hover:bg-[#0284C7] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#0EA5E9]/20"
            >
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:19739372289"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-base hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
