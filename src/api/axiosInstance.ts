// src/api/axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://caryaar.onrender.com/api/v1',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.request.use(async config => {
  // Only attach token if skipAuth flag is NOT true
  if (!config?.skipAuth) {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
