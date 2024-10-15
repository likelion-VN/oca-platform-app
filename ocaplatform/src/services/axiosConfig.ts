import axios from 'axios';
import { apiServiceUrl } from '../constants';
import auth from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: apiServiceUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicEndpoints = [''];
    if (!publicEndpoints.includes(config.url!)) {
      const token = auth.accessToken() || document.cookie
        .split('; ')
        .find(row => row.startsWith('j_user_token='))
        ?.split('=')[1];

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
