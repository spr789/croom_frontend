import { getToken } from "@/lib/utils/storage";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

const onFulfilled = (config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onRejected = (error: AxiosError) => {
  return Promise.reject(error);
};

export default { onFulfilled, onRejected };
