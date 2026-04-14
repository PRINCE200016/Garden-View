// This centralizes API configuration so we don't have hardcoded localhost URLs
// Note: In Vite, environment variables must be prefixed with VITE_

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export const API = `${API_BASE_URL}/api`;
export const ADMIN_API = `${API_BASE_URL}/admin`;

export default API_BASE_URL;
