import axios from 'axios';
import {getAccessToken} from '../utils/storage';
import {logApiEvent} from './apiLogger';
import {getCachedToken} from './tokenCache';

const axiosInstance = axios.create({
  baseURL: 'https://caryaar.onrender.com/api/v1',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async config => {
    try {
      config.metadata = {startTime: new Date().getTime()}; // 👈 Track request start time

      if (!config?.skipAuth) {
        // const token = await getAccessToken();
        const token = await getCachedToken();

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      logApiEvent({
        type: 'request',
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.data,
      });

      return config;
    } catch (error) {
      logApiEvent({
        type: 'request_error',
        method: config?.method,
        url: config?.url,
        error: error?.message,
      });
      return Promise.reject(error);
    }
  },
  error => {
    logApiEvent({
      type: 'request_error',
      method: error?.config?.method,
      url: error?.config?.url,
      error: error.message,
    });
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    const duration =
      new Date().getTime() - (response.config?.metadata?.startTime || 0);
    logApiEvent({
      type: 'response',
      method: response?.config?.method,
      url: response?.config?.url,
      status: response?.status,
      duration, // ⏱️ log time in ms
      data: response?.data,
    });
    return response;
  },
  error => {
    const config = error?.response?.config || error?.config || {};
    const duration = new Date().getTime() - (config?.metadata?.startTime || 0);

    logApiEvent({
      type: 'response_error',
      method: config.method,
      url: config.url,
      status: error?.response?.status,
      error: error.message,
      duration, // ⏱️ log time in ms
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
