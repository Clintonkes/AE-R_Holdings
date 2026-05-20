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

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', color: 'bg-[#2DD4BF]/10 text-[#14B8A6]' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600' },
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {change && (
          <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-[#0F172A] mb-1">{value}</p>
      <p className="text-slate-500 text-sm">{label}</p>
    </div>
  );
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch {
      // Use placeholder stats if API is not available
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
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      setError('Failed to update booking status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    setActionLoading(`delete-${id}`);
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError('Failed to delete booking. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#2DD4BF] animate-spin" />
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <button
          onClick={() => { fetchStats(); fetchBookings(); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#EAF6FF] text-[#2DD4BF] rounded-xl text-sm font-medium hover:bg-[#2DD4BF]/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
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
          label="Pending Bookings"
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
        />
        <StatCard
          icon={MessageSquare}
          value={stats?.messages ?? 0}
          label="New Messages"
          change="+5%"
          iconBg="bg-[#2DD4BF]/10"
          iconColor="text-[#14B8A6]"
        />
        <StatCard
          icon={DollarSign}
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
          label="Total Revenue"
          change="+18%"
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-2xl p-5 text-[#0F172A]">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6" />
            <span className="font-semibold">New Booking</span>
          </div>
          <p className="text-sm opacity-80">View and manage incoming booking requests</p>
        </div>
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-6 h-6 text-[#2DD4BF]" />
            <span className="font-semibold">Messages</span>
          </div>
          <p className="text-sm opacity-70">Respond to client inquiries and messages</p>
        </div>
        <div className="bg-[#EAF6FF] rounded-2xl p-5 text-[#0F172A]">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-[#2DD4BF]" />
            <span className="font-semibold">Reports</span>
          </div>
          <p className="text-sm text-slate-600">Track performance and revenue metrics</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Recent Bookings</h2>
            <p className="text-slate-500 text-sm mt-0.5">Manage and track all booking requests</p>
          </div>
          {bookingsLoading && (
            <RefreshCw className="w-5 h-5 text-[#2DD4BF] animate-spin" />
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['ID', 'Client', 'Service', 'Date', 'Status', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <CalendarCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No bookings yet</p>
                    <p className="text-sm mt-1">Bookings will appear here once clients submit requests.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500">#{booking.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{booking.full_name}</p>
                        <p className="text-xs text-slate-400">{booking.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{booking.service_type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(booking.preferred_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          statusConfig[booking.status]?.color || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {statusConfig[booking.status]?.label || booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {/* View */}
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* Approve */}
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'approved')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-8 h-8 bg-teal-50 text-[#14B8A6] rounded-lg flex items-center justify-center hover:bg-teal-100 transition-colors disabled:opacity-50"
                            title="Approve booking"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {/* Complete */}
                        {booking.status === 'approved' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                            title="Mark as completed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {/* Cancel */}
                        {(booking.status === 'pending' || booking.status === 'approved') && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            disabled={actionLoading === `status-${booking.id}`}
                            className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-100 transition-colors disabled:opacity-50"
                            title="Cancel booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          disabled={actionLoading === `delete-${booking.id}`}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Booking Details</h3>
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
                { label: 'Client Name', value: selectedBooking.full_name },
                { label: 'Email', value: selectedBooking.email },
                { label: 'Phone', value: selectedBooking.phone },
                { label: 'Service', value: selectedBooking.service_type },
                { label: 'Preferred Date', value: selectedBooking.preferred_date },
                { label: 'Preferred Time', value: selectedBooking.preferred_time },
                { label: 'Property Address', value: selectedBooking.property_address },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm font-medium text-slate-500">{label}</span>
                  <span className="text-sm text-[#0F172A] font-semibold text-right max-w-xs">{value}</span>
                </div>
              ))}
              {selectedBooking.special_instructions && (
                <div className="py-2">
                  <p className="text-sm font-medium text-slate-500 mb-2">Special Instructions</p>
                  <p className="text-sm text-[#0F172A] bg-slate-50 rounded-xl p-3">
                    {selectedBooking.special_instructions}
                  </p>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-slate-500">Status</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    statusConfig[selectedBooking.status]?.color || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {statusConfig[selectedBooking.status]?.label || selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full px-4 py-3 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-[#1E293B] transition-colors"
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
