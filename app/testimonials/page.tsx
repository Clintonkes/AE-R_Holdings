'use client';

import { useState } from 'react';
import { Star, Quote, Filter } from 'lucide-react';

const allTestimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    location: 'Hoboken, NJ',
    service: 'Residential Cleaning',
    rating: 5,
    date: 'March 2024',
    quote:
      "AE$R Holdings has completely transformed how I think about house cleaning. Their team is thorough, professional, and leaves my home looking absolutely immaculate every single time. Worth every penny!",
  },
  {
    id: 2,
    name: 'Michael Thompson',
    location: 'Jersey City, NJ',
    service: 'Commercial Cleaning',
    rating: 5,
    date: 'February 2024',
    quote:
      "We hired AE$R Holdings for our office and the results were outstanding. The team is punctual, efficient, and our workspace has never looked better. Our employees notice the difference immediately.",
  },
  {
    id: 3,
    name: 'Sarah Williams',
    location: 'Rutherford, NJ',
    service: 'Deep Cleaning',
    rating: 5,
    date: 'January 2024',
    quote:
      "I needed a deep cleaning before a big family event and AE$R Holdings delivered beyond my expectations. Every corner was spotless. I would highly recommend them to anyone in the area.",
  },
  {
    id: 4,
    name: 'David Chen',
    location: 'Montclair, NJ',
    service: 'Move In/Move Out',
    rating: 5,
    date: 'April 2024',
    quote:
      "Moving is stressful enough without worrying about cleaning. AE$R Holdings made my move-out so easy — they cleaned the old apartment so well I got my full security deposit back!",
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    location: 'Newark, NJ',
    service: 'Post-Construction',
    rating: 5,
    date: 'March 2024',
    quote:
      "After our kitchen renovation, the dust was everywhere. AE$R Holdings came in and made it look brand new. Their post-construction cleaning is thorough and they pay attention to every detail.",
  },
  {
    id: 6,
    name: 'Robert Johnson',
    location: 'Secaucus, NJ',
    service: 'Residential Cleaning',
    rating: 5,
    date: 'May 2024',
    quote:
      "I've used other cleaning services before but none come close to AE$R Holdings. They are reliable, use eco-friendly products, and my family loves the fresh smell after each visit.",
  },
  {
    id: 7,
    name: 'Patricia Lee',
    location: 'Paramus, NJ',
    service: 'Residential Cleaning',
    rating: 5,
    date: 'February 2024',
    quote:
      "Exceptional service from start to finish. The team is friendly, thorough, and always on time. I've been a customer for over 2 years and they never disappoint. Highly recommended!",
  },
  {
    id: 8,
    name: 'Carlos Ramirez',
    location: 'Hackensack, NJ',
    service: 'Commercial Cleaning',
    rating: 5,
    date: 'January 2024',
    quote:
      "Our restaurant required a very thorough deep clean. AE$R Holdings handled it professionally and met all our health code requirements. We now use them weekly for regular maintenance.",
  },
  {
    id: 9,
    name: 'Lisa Anderson',
    location: 'Clifton, NJ',
    service: 'Deep Cleaning',
    rating: 5,
    date: 'April 2024',
    quote:
      "Absolutely the best cleaning service I have ever hired. They cleaned things I didn't even think about, like the inside of my oven and the top of my refrigerator. Outstanding work!",
  },
  {
    id: 10,
    name: 'Kevin Brown',
    location: 'East Orange, NJ',
    service: 'Move In/Move Out',
    rating: 5,
    date: 'March 2024',
    quote:
      "Used AE$R Holdings for a move-in clean on our new apartment. The place was spotless before we moved a single box in. Great value for the price and excellent customer service.",
  },
  {
    id: 11,
    name: 'Monica Davis',
    location: 'Union City, NJ',
    service: 'Specialty Cleaning',
    rating: 5,
    date: 'May 2024',
    quote:
      "Had them do a carpet and upholstery clean — the results were phenomenal. Stains I thought were permanent are completely gone. The team was professional and the price was very reasonable.",
  },
  {
    id: 12,
    name: 'Thomas Wilson',
    location: 'Fort Lee, NJ',
    service: 'Post-Construction',
    rating: 5,
    date: 'February 2024',
    quote:
      "We had a full bathroom renovation done and the construction mess was unbelievable. AE$R Holdings turned it from a dusty disaster to a showroom-quality space. Couldn't be happier.",
  },
];

const serviceFilters = [
  'All Services',
  'Residential Cleaning',
  'Commercial Cleaning',
  'Deep Cleaning',
  'Move In/Move Out',
  'Post-Construction',
  'Specialty Cleaning',
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

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('All Services');

  const filtered =
    activeFilter === 'All Services'
      ? allTestimonials
      : allTestimonials.filter((t) => t.service === activeFilter);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] via-[#1E2E42] to-[#0B192C]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber-400/15 text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Client Reviews
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our Clients Say
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Real reviews from real customers across New Jersey. Discover why AE$R Holdings
            is the most trusted cleaning service in the area.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-7 h-7 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-white font-bold text-xl ml-2">5.0</span>
            <span className="text-slate-400 text-sm ml-1">({allTestimonials.length} reviews)</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#F0F9FF] py-6 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-500 text-sm flex-shrink-0">Filter:</span>
            {serviceFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-[#0EA5E9] text-[#0B192C]'
                    : 'bg-white text-slate-600 hover:bg-[#0EA5E9]/10 hover:text-[#0EA5E9]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-sm mb-8">
            Showing {filtered.length} review{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'All Services' && ` for "${activeFilter}"`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 flex flex-col group hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0EA5E9]/10 transition-colors">
                  <Quote className="w-5 h-5 text-[#0EA5E9]" />
                </div>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Quote text */}
                <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Customer info */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0B192C] font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-slate-400 text-xs">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="bg-[#F0F9FF] text-[#0EA5E9] text-xs px-2.5 py-1 rounded-full font-medium">
                    {testimonial.service}
                  </span>
                  <span className="text-slate-300 text-xs">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Quote className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-medium">No reviews found for this filter.</p>
              <button
                onClick={() => setActiveFilter('All Services')}
                className="mt-4 text-[#0EA5E9] font-medium hover:underline"
              >
                View all reviews
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
