import axios from 'axios';

const API_URL =
  process.env.REACT_APP_API_URL ||
  `${window.location.origin}/api`; // use hosting rewrite or explicit URL in env

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('firebaseToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('firebaseToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
