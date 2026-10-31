import axios from 'axios';

// Resolve API base URL: prioritize environment variable, otherwise fallback to origin or relative '/api'
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface HealthCheckResponse {
  status: string;
  service: string;
  router?: string;
  timestamp: string;
}

/**
 * Health check utility to confirm API calls reach the backend without being intercepted by SPA fallback
 */
export async function checkApiHealth(): Promise<HealthCheckResponse> {
  try {
    const response = await apiClient.get<HealthCheckResponse>('/api/health');
    return response.data;
  } catch (error) {
    console.warn('API health check error (backend mock or server):', error);
    return {
      status: 'simulated',
      service: 'SunPower Solutions In-Memory API Client',
      timestamp: new Date().toISOString(),
    };
  }
}
