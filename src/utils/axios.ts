/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "@/helpers/local-storage";
import { authKey } from "@/constants/storageKey";

// Create instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // needed for sending cookies like refreshToken
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage(authKey);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res?.data?.data?.accessToken;
        if (newAccessToken) {
          setToLocalStorage(authKey, newAccessToken);
          originalRequest.headers.Authorization = newAccessToken;
          return axiosInstance(originalRequest);
        }
      } catch (refreshErr) {
        // Refresh failed, redirect to login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
