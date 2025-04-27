// src/api/axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://caryaar.onrender.com/api/v1',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async config => {
    if (!config?.skipAuth) {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // 🔵 Log the request
    console.log(
      '🚀 [Request]',
      config.method?.toUpperCase(),
      config.url,
      config,
    );

    return config;
  },
  error => {
    console.error('❌ [Request Error]', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    // 🟢 Log the response
    console.log('📦 [Response]', response.config.url, response);
    return response;
  },
  error => {
    if (error.response) {
      console.error(
        '❌ [Response Error]',
        error.response.config.url,
        error.response,
      );
    } else {
      console.error('❌ [Network Error]', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
