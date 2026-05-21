'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Star,
  Wrench,
  Settings,
  User,
  Loader2,
  Trash2,
  CheckCircle,
  Eye,
  XCircle,
  RefreshCw,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import {
  getMessages,
  getTestimonials,
  deleteMessage,
  markMessageRead,
  approveTestimonial,
  deleteTestimonial,
  type Message,
  type Testimonial,
} from '@/lib/api';

type Section =
  | 'overview'
  | 'bookings'
  | 'messages'
  | 'quotes'
  | 'testimonials'
  | 'services'
  | 'settings'
  | 'profile';

// Messages Section Component
function MessagesSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkRead = async (id: string | number) => {
    setActionLoading(`read-${id}`);
    try {
      await markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } catch {
      // silent fail
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Delete this message?')) return;
    setActionLoading(`del-${id}`);
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      // silent fail
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-7 h-7 text-[#0EA5E9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B192C]">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">Client contact messages</p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-xl text-sm font-medium hover:bg-[#0EA5E9]/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No messages yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-5 hover:bg-slate-50/50 transition-colors ${!msg.read ? 'bg-[#F0F9FF]/30' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0EA5E9] font-bold text-sm">{msg.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-[#0B192C] text-sm">{msg.name}</p>
                        {!msg.read && (
                          <span className="w-2 h-2 bg-[#0EA5E9] rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>
                        {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{msg.phone}</span>}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-2">{msg.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setSelected(msg)}
                      className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                      title="View message"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        disabled={actionLoading === `read-${msg.id}`}
                        className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      disabled={actionLoading === `del-${msg.id}`}
                      className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B192C]">Message from {selected.name}</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                <XCircle className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-400 mb-1">Name</p><p className="text-sm font-semibold text-[#0B192C]">{selected.name}</p></div>
                <div><p className="text-xs text-slate-400 mb-1">Email</p><p className="text-sm font-semibold text-[#0B192C]">{selected.email}</p></div>
                {selected.phone && (
                  <div><p className="text-xs text-slate-400 mb-1">Phone</p><p className="text-sm font-semibold text-[#0B192C]">{selected.phone}</p></div>
                )}
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">Message</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-[#0B192C] leading-relaxed">{selected.message}</div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0EA5E9] text-[#0B192C] font-semibold rounded-xl hover:bg-[#0284C7] transition-colors"
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
              <button onClick={() => setSelected(null)} className="px-4 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(Array.isArray(data) ? data : data.testimonials || []);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const handleApprove = async (id: string | number) => {
    setActionLoading(`approve-${id}`);
    try {
      await approveTestimonial(id);
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, approved: true } : t)));
    } catch { /* silent */ } finally { setActionLoading(null); }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Delete this testimonial?')) return;
    setActionLoading(`del-${id}`);
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch { /* silent */ } finally { setActionLoading(null); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-7 h-7 text-[#0EA5E9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B192C]">Testimonials</h1>
          <p className="text-slate-500 text-sm mt-1">Manage client reviews and testimonials</p>
        </div>
        <button onClick={fetchTestimonials} className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-xl text-sm font-medium hover:bg-[#0EA5E9]/20 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No testimonials yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Customer', 'Service', 'Rating', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#0B192C]">{t.customer_name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{t.service_type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {!t.approved && (
                        <button
                          onClick={() => handleApprove(t.id)}
                          disabled={actionLoading === `approve-${t.id}`}
                          className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={actionLoading === `del-${t.id}`}
                        className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Placeholder Sections
function PlaceholderSection({ title, icon: Icon, description }: { title: string; icon: React.ElementType; description: string }) {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B192C]">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-[#0EA5E9]" />
        </div>
        <p className="text-[#0B192C] font-semibold text-lg mb-2">{title}</p>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          This section is ready for your content. Connect your backend API to populate data here.
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('aer_admin_token');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#0EA5E9] animate-spin" />
          <p className="text-slate-500 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminDashboard />;
      case 'bookings':
        return <AdminDashboard />;
      case 'messages':
        return <MessagesSection />;
      case 'quotes':
        return (
          <PlaceholderSection
            title="Quote Requests"
            icon={FileText}
            description="Manage incoming quote requests from clients"
          />
        );
      case 'testimonials':
        return <TestimonialsSection />;
      case 'services':
        return (
          <PlaceholderSection
            title="Services Management"
            icon={Wrench}
            description="Add, edit, or remove service offerings"
          />
        );
      case 'settings':
        return (
          <PlaceholderSection
            title="Site Settings"
            icon={Settings}
            description="Configure site-wide settings and preferences"
          />
        );
      case 'profile':
        return (
          <PlaceholderSection
            title="Admin Profile"
            icon={User}
            description="Manage your admin account and security settings"
          />
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section as Section)}
      />
      <main className="flex-1 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}
