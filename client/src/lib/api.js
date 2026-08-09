import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token if available in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorObj = error.response?.data?.error || {
      code: 'NETWORK_ERROR',
      message: error.message || 'Network request failed. Please check your internet connection.',
    };
    return Promise.reject(errorObj);
  }
);

export default api;
