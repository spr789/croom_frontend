import axios, { AxiosResponse, AxiosError } from "axios";
import { getRefreshToken, setToken, clearTokens } from "@/lib/utils/storage";
import type { RefreshTokenResponse } from "@/lib/types/auth";
import instance from "@/lib/services/api";

const onFulfilled = (response: AxiosResponse) => response;

const onRejected = async (error: AxiosError) => {
  const originalRequest: any = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const response = await axios.post<RefreshTokenResponse>(
        process.env.NEXT_PUBLIC_REFRESH_URL as string,
        { refresh: refreshToken }
      );

      const newAccessToken = response.data.access;
      setToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return instance(originalRequest);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

export default { onFulfilled, onRejected };
