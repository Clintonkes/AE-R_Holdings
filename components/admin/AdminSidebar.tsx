'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Star,
  User,
  LogOut,
  Sparkles,
  X,
  AlertTriangle,
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: 'overview',     label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'bookings',     label: 'Bookings',            icon: CalendarCheck },
  { id: 'messages',     label: 'Messages',            icon: MessageSquare },
  { id: 'testimonials', label: 'Testimonials',        icon: Star },
  { id: 'profile',      label: 'Admin Profile',       icon: User },
];

export function AdminSidebar({ activeSection, onSectionChange, isOpen, onClose }: AdminSidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aer_admin_token');
      window.location.href = '/admin/login';
    }
  };

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    onClose?.();
  };

  const sidebarContent = (
    <aside className="w-64 bg-[#0B192C] h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#0EA5E9] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-[#0B192C]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">
              AE<span className="text-[#0EA5E9]">$</span>R Holdings
            </p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </Link>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
              activeSection === id
                ? 'bg-[#0EA5E9] text-[#0B192C] shadow-md shadow-[#0EA5E9]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div className="hidden md:flex flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile sidebar — overlay drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <div className="relative z-10 h-full">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-[#0B192C] mb-2">Confirm Logout</h3>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to logout from the admin panel? You will need to login again to access the dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
