import Link from 'next/link';
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book a Service', href: '/booking' },
];

const services = [
  { label: 'Residential Cleaning', href: '/services' },
  { label: 'Commercial Cleaning', href: '/services' },
  { label: 'Deep Cleaning', href: '/services' },
  { label: 'Move In/Move Out', href: '/services' },
  { label: 'Post-Construction', href: '/services' },
  { label: 'Specialty Cleaning', href: '/services' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B192C] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-5">
              <div className="w-9 h-9 bg-[#0EA5E9] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-[#0B192C]" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                AE<span className="text-[#0EA5E9]">$</span>R Holdings
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premium residential and commercial cleaning services across New Jersey. Delivering spotless results with professionalism, reliability, and care.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-[#0EA5E9] rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-slate-400 group-hover:text-[#0B192C] transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-[#0EA5E9] rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-slate-400 group-hover:text-[#0B192C] transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-[#0EA5E9] rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-slate-400 group-hover:text-[#0B192C] transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-[#0EA5E9] rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-[#0B192C] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#0EA5E9] -mb-2" />
            </h3>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#0EA5E9] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Our Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#0EA5E9] -mb-2" />
            </h3>
            <ul className="space-y-3 mt-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-[#0EA5E9] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#0EA5E9] -mb-2" />
            </h3>
            <ul className="space-y-4 mt-4">
              <li>
                <a
                  href="tel:19739372289"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0EA5E9]/20 transition-colors">
                    <Phone className="w-4 h-4 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                    <p className="text-slate-300 text-sm group-hover:text-[#0EA5E9] transition-colors">
                      1(973)937-2289
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Address</p>
                    <p className="text-slate-300 text-sm">
                      5 Sylvan Street,<br />
                      Rutherford, NJ 07070
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@aerholdings.com"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0EA5E9]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                    <p className="text-slate-300 text-sm group-hover:text-[#0EA5E9] transition-colors">
                      info@aerholdings.com
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            &copy; {currentYear} AE$R Holdings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-slate-500 hover:text-[#0EA5E9] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-slate-500 hover:text-[#0EA5E9] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
