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
          message.error('Login session has expired! Please log in again!')
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

export default axiosInstance;
