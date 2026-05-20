import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('aer_admin_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('aer_admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface BookingPayload {
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  property_address: string;
  special_instructions?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Booking {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  property_address: string;
  special_instructions?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Message {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface Testimonial {
  id: string | number;
  customer_name: string;
  location: string;
  rating: number;
  quote: string;
  service_type: string;
  created_at: string;
  approved: boolean;
}

export interface AdminStats {
  total_bookings: number;
  pending_bookings: number;
  messages: number;
  revenue: number;
}

// Public API functions
export const createBooking = async (payload: BookingPayload) => {
  const response = await apiClient.post('/api/bookings', payload);
  return response.data;
};

export const submitContact = async (payload: ContactPayload) => {
  const response = await apiClient.post('/api/contact', payload);
  return response.data;
};

// Admin Auth
export const adminLogin = async (payload: LoginPayload) => {
  const response = await apiClient.post('/api/auth/login', payload);
  return response.data;
};

export const adminLogout = async () => {
  const response = await apiClient.post('/api/auth/logout');
  return response.data;
};

// Admin Bookings
export const getBookings = async (params?: { status?: string; page?: number }) => {
  const response = await apiClient.get('/api/admin/bookings', { params });
  return response.data;
};

export const getBookingById = async (id: string | number) => {
  const response = await apiClient.get(`/api/admin/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (
  id: string | number,
  status: 'pending' | 'approved' | 'completed' | 'cancelled'
) => {
  const response = await apiClient.patch(`/api/admin/bookings/${id}/status`, { status });
  return response.data;
};

export const deleteBooking = async (id: string | number) => {
  const response = await apiClient.delete(`/api/admin/bookings/${id}`);
  return response.data;
};

// Admin Messages
export const getMessages = async () => {
  const response = await apiClient.get('/api/admin/messages');
  return response.data;
};

export const markMessageRead = async (id: string | number) => {
  const response = await apiClient.patch(`/api/admin/messages/${id}/read`);
  return response.data;
};

export const deleteMessage = async (id: string | number) => {
  const response = await apiClient.delete(`/api/admin/messages/${id}`);
  return response.data;
};

// Admin Testimonials
export const getTestimonials = async () => {
  const response = await apiClient.get('/api/admin/testimonials');
  return response.data;
};

export const approveTestimonial = async (id: string | number) => {
  const response = await apiClient.patch(`/api/admin/testimonials/${id}/approve`);
  return response.data;
};

export const deleteTestimonial = async (id: string | number) => {
  const response = await apiClient.delete(`/api/admin/testimonials/${id}`);
  return response.data;
};

// Admin Stats
export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await apiClient.get('/api/admin/stats');
  return response.data;
};

export default apiClient;
