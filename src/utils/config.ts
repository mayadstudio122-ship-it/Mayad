// ============================================================
// MAYAD FRONTEND — BACKEND URL CONFIG
// Dynamic resolution for Localhost and Vercel Production
// ============================================================

export const getBackendUrl = (): string => {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:5000';
  }
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  }
  return 'https://mayad-backend-mu.vercel.app';
};

export const getApiBaseUrl = (): string => {
  return `${getBackendUrl()}/api`;
};

export const BACKEND_URL = getBackendUrl();
export const API_BASE_URL = getApiBaseUrl();
export const MAYAD_OFFICIAL_URL = 'https://mayad.in/';
