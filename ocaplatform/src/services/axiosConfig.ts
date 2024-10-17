import axios from 'axios';
import { apiServiceUrl } from '../constants';
import { getCookieValue } from '../utils';

const axiosInstance = axios.create({
  baseURL: apiServiceUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicEndpoints = [''];
    if (!publicEndpoints.includes(config.url!)) {
      const token = getCookieValue('user_token')

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
