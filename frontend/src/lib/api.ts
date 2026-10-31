import axios, { AxiosError } from 'axios';

// Central API Base URL definition following the specified pattern
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  (import.meta.env.PROD ? 'https://hakathon-odoo.onrender.com' : 'http://localhost:5000');

export const apiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

// Configured Axios client for backend communication
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to inject JWT Authorization token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor with descriptive error messaging
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string }>) => {
    let message = 'An unexpected error occurred while contacting the server.';

    if (!error.response) {
      message = `Cannot connect to server at ${API_BASE_URL}. Ensure the backend is running and CORS is configured.`;
    } else if (error.response.status === 401) {
      message = 'Session expired. Please log in again.';
    } else if (error.response.data?.message) {
      message = error.response.data.message;
    } else if (error.response.data?.detail) {
      message = error.response.data.detail;
    }

    console.warn(`[API Error ${error.response?.status || 'Network'}]:`, message);
    return Promise.reject(new Error(message));
  }
);

export interface HealthResponse {
  status: string;
  service: string;
  time?: string;
  timestamp?: string;
}

/**
 * Health check to verify connection to Render backend
 */
export async function fetchHealth(): Promise<HealthResponse> {
  try {
    const res = await api.get<HealthResponse>('/api/health');
    return res.data;
  } catch {
    return {
      status: 'offline',
      service: 'SunPower Solutions (Local Cache / Simulated)',
      time: new Date().toISOString(),
    };
  }
}
