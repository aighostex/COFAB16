// src/api.js
import axios from 'axios';


const API_BASAE_URL = "https://confabevent.chroniclesoft.com/api";

const api = axios.create({
  baseURL: API_BASAE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminAuth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // You can modify the response here before it's passed to components
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

export default api;