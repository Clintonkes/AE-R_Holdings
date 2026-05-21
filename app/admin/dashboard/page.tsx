'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Star,
  User,
  Loader2,
  Trash2,
  CheckCircle,
  Eye,
  XCircle,
  RefreshCw,
  Mail,
  Phone,
  Menu,
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Toast } from '@/components/ui/Toast';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Pagination } from '@/components/ui/Pagination';
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

const PAGE_SIZE = 10;

type Section = 'overview' | 'bookings' | 'messages' | 'testimonials' | 'profile';

// ── Messages Section ─────────────────────────────────────────────────────────
function MessagesSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

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

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleMarkRead = async (id: string | number) => {
    setActionLoading(`read-${id}`);
    try {
      await markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
      setToast({ type: 'success', title: 'Acknowledged', message: 'Message marked as read.' });
    } catch {
      setToast({ type: 'error', title: 'Failed', message: 'Could not mark message as read.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = (id: string | number) => {
    setConfirmModal({
      title: 'Delete Message',
      message: 'Are you sure you want to permanently delete this message? This cannot be undone.',
      onConfirm: async () => {
        setConfirmModal(null);
        setActionLoading(`del-${id}`);
        try {
          await deleteMessage(id);
          setMessages((prev) => prev.filter((m) => m.id !== id));
          if (selected?.id === id) setSelected(null);
          setToast({ type: 'success', title: 'Deleted', message: 'Message has been removed.' });
        } catch {
          setToast({ type: 'error', title: 'Failed', message: 'Could not delete message.' });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const totalPages = Math.max(1, Math.ceil(messages.length / PAGE_SIZE));
  const paginated = messages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-7 h-7 text-[#0EA5E9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {toast && <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel="Yes, Delete"
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B192C]">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">Client contact messages</p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-xl text-sm font-medium hover:bg-[#0EA5E9]/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No messages yet</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-50">
              {paginated.map((msg) => (
                <div key={msg.id} className={`p-4 sm:p-5 hover:bg-slate-50/50 transition-colors ${!msg.is_read ? 'bg-[#F0F9FF]/30' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0EA5E9] font-bold text-sm">{msg.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-[#0B192C] text-sm">{msg.name}</p>
                          {!msg.is_read && <span className="w-2 h-2 bg-[#0EA5E9] rounded-full flex-shrink-0" />}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-2">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>
                          {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{msg.phone}</span>}
                        </div>
                        <p className="text-slate-600 text-sm line-clamp-2">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setSelected(msg)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                        title="View message"
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      {!msg.is_read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          disabled={actionLoading === `read-${msg.id}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={actionLoading === `del-${msg.id}`}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B192C]">Message from {selected.name}</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                <XCircle className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-400 mb-1">Name</p><p className="text-sm font-semibold text-[#0B192C]">{selected.name}</p></div>
                <div><p className="text-xs text-slate-400 mb-1">Email</p><p className="text-sm font-semibold text-[#0B192C] break-all">{selected.email}</p></div>
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

// ── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

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
      setToast({ type: 'success', title: 'Approved', message: 'Testimonial is now publicly visible.' });
    } catch {
      setToast({ type: 'error', title: 'Failed', message: 'Could not approve testimonial.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = (id: string | number) => {
    setConfirmModal({
      title: 'Delete Testimonial',
      message: 'Are you sure you want to permanently delete this testimonial? This cannot be undone.',
      onConfirm: async () => {
        setConfirmModal(null);
        setActionLoading(`del-${id}`);
        try {
          await deleteTestimonial(id);
          setTestimonials((prev) => prev.filter((t) => t.id !== id));
          setToast({ type: 'success', title: 'Deleted', message: 'Testimonial has been removed.' });
        } catch {
          setToast({ type: 'error', title: 'Failed', message: 'Could not delete testimonial.' });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const totalPages = Math.max(1, Math.ceil(testimonials.length / PAGE_SIZE));
  const paginated = testimonials.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-7 h-7 text-[#0EA5E9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {toast && <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel="Yes, Delete"
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B192C]">Testimonials</h1>
          <p className="text-slate-500 text-sm mt-1">Manage client reviews and testimonials</p>
        </div>
        <button onClick={fetchTestimonials} className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-xl text-sm font-medium hover:bg-[#0EA5E9]/20 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No testimonials yet</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Customer', 'Service', 'Rating', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <p className="text-sm font-semibold text-[#0B192C]">{t.customer_name}</p>
                        <p className="text-xs text-slate-400">{t.location}</p>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600">{t.service_type}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {t.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          {!t.approved && (
                            <button
                              onClick={() => handleApprove(t.id)}
                              disabled={actionLoading === `approve-${t.id}`}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={actionLoading === `del-${t.id}`}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Admin Profile placeholder ─────────────────────────────────────────────────
function ProfileSection() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B192C]">Admin Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your admin account and security settings</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#0EA5E9]" />
        </div>
        <p className="text-[#0B192C] font-semibold text-lg mb-2">Admin Profile</p>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          Profile management coming soon.
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      case 'overview':    return <AdminDashboard />;
      case 'bookings':    return <AdminDashboard />;
      case 'messages':    return <MessagesSection />;
      case 'testimonials':return <TestimonialsSection />;
      case 'profile':     return <ProfileSection />;
      default:            return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section as Section)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#0B192C] border-b border-slate-800 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-white font-bold text-sm">
            AE<span className="text-[#0EA5E9]">$</span>R Admin
          </span>
        </div>
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
