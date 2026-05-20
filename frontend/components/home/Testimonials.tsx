'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    location: 'Hoboken, NJ',
    service: 'Residential Cleaning',
    rating: 5,
    quote:
      "AE$R Holdings has completely transformed how I think about house cleaning. Their team is thorough, professional, and leaves my home looking absolutely immaculate every single time. Worth every penny!",
  },
  {
    id: 2,
    name: 'Michael Thompson',
    location: 'Jersey City, NJ',
    service: 'Commercial Cleaning',
    rating: 5,
    quote:
      "We hired AE$R Holdings for our office and the results were outstanding. The team is punctual, efficient, and our workspace has never looked better. Our employees notice the difference immediately.",
  },
  {
    id: 3,
    name: 'Sarah Williams',
    location: 'Rutherford, NJ',
    service: 'Deep Cleaning',
    rating: 5,
    quote:
      "I needed a deep cleaning before a big family event and AE$R Holdings delivered beyond my expectations. Every corner was spotless. I would highly recommend them to anyone in the area.",
  },
  {
    id: 4,
    name: 'David Chen',
    location: 'Montclair, NJ',
    service: 'Move In/Move Out',
    rating: 5,
    quote:
      "Moving is stressful enough without worrying about cleaning. AE$R Holdings made my move-out so easy — they cleaned the old apartment so well I got my full security deposit back!",
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    location: 'Newark, NJ',
    service: 'Post-Construction',
    rating: 5,
    quote:
      "After our kitchen renovation, the dust was everywhere. AE$R Holdings came in and made it look brand new. Their post-construction cleaning is thorough and they pay attention to every detail.",
  },
  {
    id: 6,
    name: 'Robert Johnson',
    location: 'Secaucus, NJ',
    service: 'Residential Cleaning',
    rating: 5,
    quote:
      "I've used other cleaning services before but none come close to AE$R Holdings. They are reliable, use eco-friendly products, and my family loves the fresh smell after each visit. Absolutely stellar service.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < testimonials.length;

  const handlePrev = () => {
    if (canGoPrev) setStartIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canGoNext) setStartIndex((prev) => prev + 1);
  };

  const visible = testimonials.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-amber-50 text-amber-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers across New Jersey have to say.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-slate-100 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 bg-[#EAF6FF] rounded-xl flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-[#2DD4BF]" />
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote text */}
              <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Customer info */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#0F172A] font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">{testimonial.location}</p>
                </div>
                <span className="ml-auto bg-[#EAF6FF] text-[#2DD4BF] text-xs px-2.5 py-1 rounded-full font-medium">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#2DD4BF] hover:text-[#2DD4BF] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(Math.min(i, testimonials.length - visibleCount))}
                className={`rounded-full transition-all duration-200 ${
                  i >= startIndex && i < startIndex + visibleCount
                    ? 'w-6 h-2.5 bg-[#2DD4BF]'
                    : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#2DD4BF] hover:text-[#2DD4BF] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
