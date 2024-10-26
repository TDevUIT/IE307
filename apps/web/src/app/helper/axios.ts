import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:3001/api/v1',
  timeout: 10000,
  withCredentials: true, // This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
