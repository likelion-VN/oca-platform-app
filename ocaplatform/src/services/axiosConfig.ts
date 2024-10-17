import axios from 'axios';
import Cookies from 'js-cookie';
import { apiServiceUrl } from '../constants';

const axiosInstance = axios.create({
  baseURL: apiServiceUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicEndpoints = [''];
    if (!publicEndpoints.includes(config.url!)) {
      const token = Cookies.get('user_token')

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
