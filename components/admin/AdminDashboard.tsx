'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CalendarCheck,
  Clock,
  MessageSquare,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  getBookings,
  getAdminStats,
  updateBookingStatus,
  deleteBooking,
  type Booking,
  type AdminStats,
} from '@/lib/api';
import { Toast } from '@/components/ui/Toast';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Pagination } from '@/components/ui/Pagination';

const PAGE_SIZE = 10;

const statusConfig: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Pending',   color: 'bg-yellow-100 text-yellow-700' },
  approved:   { label: 'Approved',  color: 'bg-[#0EA5E9]/10 text-[#0284C7]' },
  completed:  { label: 'Completed', color: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Cancelled', color: 'bg-red-100 text-red-600' },
  in_progress:{ label: 'In Progress', color: 'bg-purple-100 text-purple-700' },
};

function StatCard({
  icon: Icon,
  value,
  label,
  change,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  change?: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`w-9 h-9 sm:w-12 sm:h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${iconColor}`} />
        </div>
        {change && (
          <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-[#0B192C] mb-1">{value}</p>
      <p className="text-slate-500 text-xs sm:text-sm">{label}</p>
    </div>
  );
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Toast state
  const [toast, setToast] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = (type: 'success' | 'error', title: string, message: string) => {
    setToast({ type, title, message });
  };

  const fetchStats = useCallback(async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch {
      setStats({ total_bookings: 0, pending_bookings: 0, messages: 0, revenue: 0 });
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const data = await getBookings();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchBookings()]);
      setLoading(false);
    };
    init();
  }, [fetchStats, fetchBookings]);

  const handleStatusChange = async (
    id: string | number,
    status: 'pending' | 'approved' | 'completed' | 'cancelled'
  ) => {
    setActionLoading(`status-${id}`);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      if (selectedBooking?.id === id) setSelectedBooking((prev) => prev ? { ...prev, status } : null);
      showToast('success', 'Status Updated', `Booking #${id} marked as ${status}.`);
    } catch {
      showToast('error', 'Update Failed', 'Failed to update booking status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = (id: string | number) => {
    setConfirmModal({
      title: 'Delete Booking',
      message: `Are you sure you want to permanently delete booking #${id}? This cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(null);
        setActionLoading(`delete-${id}`);
        try {
          await deleteBooking(id);
          setBookings((prev) => prev.filter((b) => b.id !== id));
          if (selectedBooking?.id === id) setSelectedBooking(null);
          showToast('success', 'Booking Deleted', `Booking #${id} has been removed.`);
        } catch {
          showToast('error', 'Delete Failed', 'Failed to delete booking. Please try again.');
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // Pagination
  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));
  const paginatedBookings = bookings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#0EA5E9] animate-spin" />
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel="Yes, Delete"
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B192C]">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <button
          onClick={() => { fetchStats(); fetchBookings(); }}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-xl text-sm font-medium hover:bg-[#0EA5E9]/20 transition-colors flex-shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          icon={CalendarCheck}
          value={stats?.total_bookings ?? 0}
          label="Total Bookings"
          change="+12%"
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          icon={Clock}
          value={stats?.pending_bookings ?? 0}
          label="Pending"
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
        />
        <StatCard
          icon={MessageSquare}
          value={stats?.messages ?? 0}
          label="Messages"
          change="+5%"
          iconBg="bg-[#0EA5E9]/10"
          iconColor="text-[#0284C7]"
        />
        <StatCard
          icon={DollarSign}
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
          label="Revenue"
          change="+18%"
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-2xl p-5 text-[#0B192C]">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6" />
            <span className="font-semibold">New Booking</span>
          </div>
          <p className="text-sm opacity-80">View and manage incoming booking requests</p>
        </div>
        <div className="bg-gradient-to-br from-[#0B192C] to-[#1E2E42] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-6 h-6 text-[#0EA5E9]" />
            <span className="font-semibold">Messages</span>
          </div>
          <p className="text-sm opacity-70">Respond to client inquiries and messages</p>
        </div>
        <div className="bg-[#F0F9FF] rounded-2xl p-5 text-[#0B192C]">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-[#0EA5E9]" />
            <span className="font-semibold">Reports</span>
          </div>
          <p className="text-sm text-slate-600">Track performance and revenue metrics</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B192C]">Recent Bookings</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {bookings.length} total · showing {PAGE_SIZE} per page
            </p>
          </div>
          {bookingsLoading && <RefreshCw className="w-5 h-5 text-[#0EA5E9] animate-spin" />}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['ID', 'Client', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <CalendarCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No bookings yet</p>
                    <p className="text-sm mt-1">Bookings will appear here once clients submit requests.</p>
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-slate-500">#{booking.id}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <p className="text-sm font-semibold text-[#0B192C]">{booking.full_name}</p>
                      <p className="text-xs text-slate-400 hidden sm:block">{booking.email}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600">{booking.service_type}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                      {new Date(booking.preferred_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className={`inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[booking.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                        {statusConfig[booking.status]?.label || booking.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'approved')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-50 text-[#0284C7] rounded-lg flex items-center justify-center hover:bg-teal-100 transition-colors disabled:opacity-50"
                            title="Approve booking"
                          >
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        {booking.status === 'approved' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                            title="Mark as completed"
                          >
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        {(booking.status === 'pending' || booking.status === 'approved') && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-100 transition-colors disabled:opacity-50"
                            title="Cancel booking"
                          >
                            <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          disabled={actionLoading === `delete-${booking.id}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                          title="Delete booking"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0B192C]">Booking Details</h3>
                <p className="text-slate-500 text-sm">#{selectedBooking.id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <XCircle className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Client Name',      value: selectedBooking.full_name },
                { label: 'Email',            value: selectedBooking.email },
                { label: 'Phone',            value: selectedBooking.phone },
                { label: 'Service',          value: selectedBooking.service_type },
                { label: 'Preferred Date',   value: selectedBooking.preferred_date },
                { label: 'Preferred Time',   value: selectedBooking.preferred_time },
                { label: 'Property Address', value: selectedBooking.address },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm font-medium text-slate-500">{label}</span>
                  <span className="text-sm text-[#0B192C] font-semibold text-right max-w-xs">{value}</span>
                </div>
              ))}
              {selectedBooking.special_instructions && (
                <div className="py-2">
                  <p className="text-sm font-medium text-slate-500 mb-2">Special Instructions</p>
                  <p className="text-sm text-[#0B192C] bg-slate-50 rounded-xl p-3">
                    {selectedBooking.special_instructions}
                  </p>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-slate-500">Status</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[selectedBooking.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                  {statusConfig[selectedBooking.status]?.label || selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'approved')}
                  disabled={!!actionLoading}
                  className="flex-1 px-4 py-3 bg-[#0EA5E9] text-white font-semibold rounded-xl hover:bg-[#0284C7] transition-colors disabled:opacity-50"
                >
                  Approve
                </button>
              )}
              {selectedBooking.status === 'approved' && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                  disabled={!!actionLoading}
                  className="flex-1 px-4 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  Mark Completed
                </button>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex-1 px-4 py-3 bg-[#0B192C] text-white rounded-xl font-semibold hover:bg-[#1E2E42] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
