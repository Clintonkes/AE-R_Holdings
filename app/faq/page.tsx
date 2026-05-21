'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, ArrowRight, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    category: 'General',
    question: 'What areas do you serve?',
    answer:
      'AE$R Holdings primarily serves the greater New Jersey area, including but not limited to Rutherford, Jersey City, Hoboken, Newark, Montclair, Paramus, Hackensack, Clifton, Fort Lee, Secaucus, Union City, East Orange, and surrounding communities. Contact us to confirm service availability in your specific location.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Do I need to be home during the cleaning?',
    answer:
      'You do not need to be home during the cleaning. Many of our clients provide us with a key or access code and go about their day. Our staff are thoroughly background-checked and trustworthy. If you prefer to be present, that is perfectly fine as well. We will accommodate whatever makes you most comfortable.',
  },
  {
    id: 3,
    category: 'Services',
    question: 'What cleaning products do you use?',
    answer:
      'We use a combination of professional-grade and eco-friendly cleaning products that are effective yet safe for your family and pets. For clients with specific allergies or sensitivities, we can accommodate green-only cleaning solutions. We never use harsh bleach or toxic chemicals unless specifically required and requested by the client.',
  },
  {
    id: 4,
    category: 'Booking',
    question: 'How do I book a cleaning service?',
    answer:
      'Booking is easy! You can submit a request through our online booking form, call us directly at 1(973)937-2289, or send us a message through our contact page. Once we receive your request, we will follow up within 24 hours to confirm the details, answer any questions, and schedule your service.',
  },
  {
    id: 5,
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 48-72 hours in advance for standard services. For deep cleans, move-in/move-out, or post-construction cleaning, we suggest booking 5-7 days ahead to ensure availability. For recurring services, we can set up a consistent schedule that works for you.',
  },
  {
    id: 6,
    category: 'Policies',
    question: 'What is your cancellation policy?',
    answer:
      'We require at least 24 hours notice for cancellations or rescheduling. Cancellations made with less than 24 hours notice may be subject to a cancellation fee of up to 50% of the scheduled service cost. Emergency situations are handled on a case-by-case basis. We understand life happens and try to be as flexible as possible.',
  },
  {
    id: 7,
    category: 'Policies',
    question: 'Are you licensed and insured?',
    answer:
      'Yes, absolutely. AE$R Holdings is fully licensed to operate in New Jersey and carries comprehensive liability insurance as well as workers\' compensation insurance for all our employees. This protects both our clients and our team in the rare event of any incident. We are happy to provide proof of insurance upon request.',
  },
  {
    id: 8,
    category: 'Pricing',
    question: 'How is pricing determined?',
    answer:
      'Pricing depends on several factors: the size of your space (square footage), the type of service requested, the frequency of cleaning (one-time vs. recurring), and any special requirements. We provide free, transparent quotes with no hidden fees before any work begins. Recurring customers receive discounted rates.',
  },
  {
    id: 9,
    category: 'Pricing',
    question: 'Do you offer discounts for recurring services?',
    answer:
      'Yes! We offer significant discounts for clients who schedule recurring cleaning services. Weekly cleaning receives the largest discount, followed by bi-weekly and monthly services. We also offer referral bonuses — if you refer a friend who becomes a client, you receive a discount on your next service.',
  },
  {
    id: 10,
    category: 'Services',
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular (maintenance) cleaning covers the standard tasks like dusting surfaces, vacuuming, mopping, and cleaning bathrooms and kitchens. Deep cleaning is a more intensive, top-to-bottom service that includes everything in a regular clean plus inside appliances, cabinet interiors, grout scrubbing, behind furniture, window interiors, and more. We recommend a deep clean as a starting point for new clients.',
  },
  {
    id: 11,
    category: 'Staff',
    question: 'Are your cleaning staff background-checked?',
    answer:
      'Every single team member undergoes a comprehensive background check before joining our team. We also verify employment history and references. Additionally, all staff receive professional training in cleaning techniques, customer service, and safety protocols. Your security and peace of mind are paramount to us.',
  },
  {
    id: 12,
    category: 'Satisfaction',
    question: 'What if I am not satisfied with the cleaning?',
    answer:
      'Your satisfaction is our guarantee. If you are not completely happy with any aspect of our service, contact us within 24 hours and we will return to address any areas of concern at no additional charge. We stand behind our work and will make it right. We have a 100% satisfaction guarantee — no questions asked.',
  },
  {
    id: 13,
    category: 'General',
    question: 'Do I need to provide cleaning supplies or equipment?',
    answer:
      'No, you do not need to provide anything. Our team arrives fully equipped with all necessary cleaning supplies, tools, and equipment. If you have specific products you prefer us to use in your home, you are welcome to provide them and we will accommodate your request.',
  },
  {
    id: 14,
    category: 'Services',
    question: 'Do you clean after parties or events?',
    answer:
      'Yes! We offer event cleanup services for both before and after events. Whether you need help setting up before a gathering or cleaning up afterward, our team can handle it. Event cleanup is part of our Specialty Cleaning service. Contact us with your event details for a custom quote.',
  },
];

const categories = ['All', 'General', 'Services', 'Booking', 'Policies', 'Pricing', 'Staff', 'Satisfaction'];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden hover:border-[#0EA5E9]/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white hover:bg-[#F0F9FF]/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#0B192C] pr-4 text-sm md:text-base">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#0EA5E9] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 bg-white border-t border-slate-50">
          <p className="text-slate-600 leading-relaxed text-sm mt-3">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] via-[#1E2E42] to-[#0B192C]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex w-16 h-16 bg-[#0EA5E9]/10 rounded-2xl items-center justify-center mb-6 mx-auto">
            <HelpCircle className="w-8 h-8 text-[#0EA5E9]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need to know about AE$R Holdings services, booking, pricing, and policies.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#0EA5E9] text-[#0B192C]'
                    : 'bg-[#F0F9FF] text-slate-600 hover:bg-[#0EA5E9]/20 hover:text-[#0B192C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filtered.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">No FAQs found in this category.</p>
            </div>
          )}

          {/* Still Have Questions CTA */}
          <div className="mt-16 bg-[#0B192C] rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-slate-400 mb-8">
              Our friendly team is available to answer any questions you have. Don&apos;t hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:19739372289"
                className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#0B192C] font-bold px-6 py-3 rounded-full hover:bg-[#0284C7] hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call 1(973)937-2289
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Send a Message
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
