'use client';

import axios from 'axios';
import { getAuthHeaders, API_BASE_URL, removeToken } from './auth';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth headers to requests
api.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...getAuthHeaders() };
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;