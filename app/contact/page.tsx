'use client';

import { useState, type FormEvent } from 'react';
import { Phone, MapPin, Mail, Clock, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { submitContact, type ContactPayload } from '@/lib/api';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialForm: FormState = { name: '', email: '', phone: '', message: '' };

function validateContactForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Your name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.message.trim()) errors.message = 'Please enter your message.';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload: ContactPayload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      };
      await submitContact(payload);
      setStatus('success');
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus('error');
      const message =
        err instanceof Error ? err.message : 'Failed to send message. Please try again or call us.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#0EA5E9]/15 text-[#0EA5E9] text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Contact AE$R Holdings</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Have a question or ready to get started? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info - Left Column */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact Details Card */}
              <div className="bg-[#0B192C] rounded-2xl p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <a
                    href="tel:19739372289"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0EA5E9]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-white font-semibold group-hover:text-[#0EA5E9] transition-colors">
                        1(973)937-2289
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@aerholdings.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0EA5E9]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-white font-semibold group-hover:text-[#0EA5E9] transition-colors">
                        info@aerholdings.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-white font-semibold">
                        5 Sylvan Street<br />
                        Rutherford, NJ 07070
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Business Hours</p>
                      <div className="space-y-0.5">
                        <p className="text-white text-sm">Mon – Fri: 8:00 AM – 6:00 PM</p>
                        <p className="text-white text-sm">Saturday: 8:00 AM – 5:00 PM</p>
                        <p className="text-white text-sm">Sunday: 10:00 AM – 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <div className="relative h-48 bg-[#F0F9FF] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-[#0EA5E9] mx-auto mb-2" />
                    <p className="text-[#0B192C] font-semibold text-sm">5 Sylvan Street</p>
                    <p className="text-slate-500 text-xs">Rutherford, NJ 07070</p>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href="https://maps.google.com/?q=5+Sylvan+Street+Rutherford+NJ+07070"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[#0EA5E9] text-sm font-semibold hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#0B192C] mb-2">Send Us a Message</h2>
                <p className="text-slate-500 text-sm mb-6">
                  We typically respond within a few hours during business hours.
                </p>

                {/* Success Message */}
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-700">Message Sent Successfully!</p>
                      <p className="text-green-600 text-sm mt-0.5">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-700">Failed to Send</p>
                      <p className="text-red-600 text-sm mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`input-field ${errors.name ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`input-field ${errors.email ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone Number{' '}
                      <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(973) 555-0123"
                      className="input-field"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your cleaning needs, questions, or anything else..."
                      className={`input-field resize-none ${errors.message ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#0EA5E9] text-[#0B192C] font-bold py-4 rounded-xl hover:bg-[#0284C7] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
