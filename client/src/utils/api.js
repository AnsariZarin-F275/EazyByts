import axios from 'axios';

// Prefer env override; fall back to deployed Render backend.
const apiBaseUrl = process.env.REACT_APP_API_BASE || 'https://portfolio-backend-abs2.onrender.com/api';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;



