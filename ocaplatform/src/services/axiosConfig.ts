import { message } from "antd";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { apiServiceUrl } from "../constants";
import { isTokenExpired } from "../utils";
import { safeNavigate } from "../utils/helper";

const axiosInstance = axios.create({
  baseURL: apiServiceUrl,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const publicEndpoints: string[] = [""];

    if (!publicEndpoints.includes(config.url!)) {
      const token = Cookies.get("user_token");
      if (token) {
        if (isTokenExpired(token)) {
          message.error('Login session has expired! Please login again!')
          safeNavigate('/sign-in')
        } else {
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          if (config.headers instanceof AxiosHeaders) {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // Handle 401 Unauthorized or 302 Redirect
    if (status === 401 || status === 302) {
      message.error("Session expired or unauthorized access. Redirecting to sign-in...");
      safeNavigate("/sign-in");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
