'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Users, Star, Clock, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Star, value: '5-Star', label: 'Rated' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
  { icon: ThumbsUp, value: '100%', label: 'Satisfaction' },
];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Professional cleaning service"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/95 via-[#0B192C]/85 to-[#0B192C]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-start">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0EA5E9]/15 border border-[#0EA5E9]/30 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          <Star className="w-4 h-4 fill-[#0EA5E9]" />
          New Jersey&apos;s Trusted Cleaning Service
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mb-6">
          Professional Cleaning{' '}
          <span className="text-[#0EA5E9]">Services</span> You Can Trust
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
          AE$R Holdings delivers premium residential &amp; commercial cleaning services across New Jersey.
          Reliable, thorough, and tailored to your needs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-8 py-4 rounded-full text-base hover:bg-[#0284C7] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#0EA5E9]/25"
          >
            Book a Service
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white hover:text-[#0B192C] transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Request a Quote
          </Link>
        </div>

        {/* Floating Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0EA5E9]" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-300 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave / transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
