import axios from "@/lib/services/api/client";
import type { ApiResponse } from "@/lib/types/api";

// Infer the request config type directly from axios.get
type AxiosRequestConfig = Parameters<typeof axios.get>[1];

// Generic GET
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await axios.get<ApiResponse<T>>(url, config);
  return res.data.data;
}

// Generic POST
export async function apiPost<T, B = unknown>(url: string, body: B, config?: AxiosRequestConfig): Promise<T> {
  const res = await axios.post<ApiResponse<T>>(url, body, config);
  return res.data.data;
}
