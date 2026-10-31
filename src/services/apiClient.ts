import { api, API_BASE_URL, apiUrl, fetchHealth, HealthResponse } from '../lib/api';

export { API_BASE_URL, apiUrl };
export const apiClient = api;

export type HealthCheckResponse = HealthResponse;

export async function checkApiHealth(): Promise<HealthCheckResponse> {
  const data = await fetchHealth();
  return {
    status: data.status,
    service: data.service,
    timestamp: data.time || data.timestamp || new Date().toISOString(),
  };
}
