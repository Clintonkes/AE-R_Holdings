'use client';

import { useState, type FormEvent } from 'react';
import { Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { createBooking, type BookingPayload } from '@/lib/api';
import { Toast } from '@/components/ui/Toast';

const serviceTypes = [
  { label: 'Residential Cleaning',      value: 'residential' },
  { label: 'Commercial Cleaning',       value: 'commercial' },
  { label: 'Deep Cleaning',             value: 'deep_cleaning' },
  { label: 'Move In Cleaning',          value: 'move_in_out' },
  { label: 'Move Out Cleaning',         value: 'move_in_out' },
  { label: 'Post-Construction Cleaning',value: 'post_construction' },
  { label: 'Specialty Cleaning',        value: 'specialty' },
];

const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  special_instructions: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  service_type?: string;
  preferred_date?: string;
  preferred_time?: string;
  address?: string;
}

const initialForm: FormState = {
  full_name: '',
  email: '',
  phone: '',
  service_type: '',
  preferred_date: '',
  preferred_time: '',
  address: '',
  special_instructions: '',
};

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.full_name.trim()) errors.full_name = 'Full name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!form.service_type) errors.service_type = 'Please select a service type.';
  if (!form.preferred_date) errors.preferred_date = 'Please select a preferred date.';
  if (!form.preferred_time) errors.preferred_time = 'Please select a preferred time.';
  if (!form.address.trim()) errors.address = 'Property address is required.';
  return errors;
}

export default function BookingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload: BookingPayload = {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        service_type: form.service_type,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        address: form.address.trim(),
        special_instructions: form.special_instructions.trim() || undefined,
      };
      await createBooking(payload);
      setStatus('success');
      setForm(initialForm);
      setToastType('success');
      setShowToast(true);
    } catch (err: unknown) {
      setStatus('error');
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.';
      setErrorMessage(message);
      setToastType('error');
      setShowToast(true);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          type={toastType}
          title={toastType === 'success' ? 'Booking Accepted! 🎉' : 'Submission Failed'}
          message={
            toastType === 'success'
              ? 'Your booking has been received. We\'ll notify you shortly by email to confirm!'
              : errorMessage || 'Something went wrong. Please try again.'
          }
          onClose={() => {
            setShowToast(false);
            if (status !== 'loading') setStatus('idle');
          }}
        />
      )}

      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#0EA5E9]/15 text-[#0EA5E9] text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Schedule a Service
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Book a Cleaning Service
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within 24 hours to confirm your booking.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-24 bg-[#F0F9FF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form — spans 2 columns, comes FIRST */}
            <div className="lg:col-span-2 order-1">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0B192C] mb-6">Booking Request Form</h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="full_name" className="label">Full Name *</label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`input-field ${errors.full_name ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`input-field ${errors.email ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="label">Phone Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(973) 555-0123"
                        className={`input-field ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="service_type" className="label">Service Type *</label>
                      <select
                        id="service_type"
                        name="service_type"
                        value={form.service_type}
                        onChange={handleChange}
                        className={`input-field ${errors.service_type ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      >
                        <option value="">Select a service...</option>
                        {serviceTypes.map((s) => (
                          <option key={s.value + s.label} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      {errors.service_type && (
                        <p className="text-red-500 text-xs mt-1">{errors.service_type}</p>
                      )}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="preferred_date" className="label">Preferred Date *</label>
                      <input
                        id="preferred_date"
                        name="preferred_date"
                        type="date"
                        value={form.preferred_date}
                        onChange={handleChange}
                        min={today}
                        className={`input-field ${errors.preferred_date ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.preferred_date && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferred_date}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="preferred_time" className="label">Preferred Time *</label>
                      <select
                        id="preferred_time"
                        name="preferred_time"
                        value={form.preferred_time}
                        onChange={handleChange}
                        className={`input-field ${errors.preferred_time ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      >
                        <option value="">Select a time slot...</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.preferred_time && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferred_time}</p>
                      )}
                    </div>
                  </div>

                  {/* Property Address */}
                  <div>
                    <label htmlFor="address" className="label">Property Address *</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Rutherford, NJ 07070"
                      className={`input-field ${errors.address ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label htmlFor="special_instructions" className="label">
                      Special Instructions{' '}
                      <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="special_instructions"
                      name="special_instructions"
                      value={form.special_instructions}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific areas to focus on, allergies, pets, access instructions, etc."
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#0EA5E9] text-white font-bold py-4 rounded-xl hover:bg-[#0284C7] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      'Request Booking'
                    )}
                  </button>

                  <p className="text-slate-400 text-xs text-center">
                    By submitting, you agree to be contacted by AE$R Holdings. We respect your privacy.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar Info — comes SECOND on desktop */}
            <div className="space-y-5 order-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#0B192C] mb-4 text-base">Contact Information</h3>
                <div className="space-y-4">
                  <a href="tel:19739372289" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/10 transition-colors">
                      <Phone className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm font-semibold text-[#0B192C] group-hover:text-[#0EA5E9] transition-colors">
                        1(973)937-2289
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Address</p>
                      <p className="text-sm font-semibold text-[#0B192C]">
                        5 Sylvan Street,<br />Rutherford, NJ 07070
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Business Hours</p>
                      <p className="text-sm font-semibold text-[#0B192C]">
                        Mon–Sat: 8am–6pm<br />Sun: 10am–4pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B192C] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3 text-base">What to Expect</h3>
                <ul className="space-y-2">
                  {[
                    'Free quote within 24 hours',
                    'Flexible scheduling',
                    'Vetted & insured professionals',
                    '100% satisfaction guarantee',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
