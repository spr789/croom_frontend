import api from "@/lib/services/api/client";
import { ENDPOINTS } from "./api/endpoints";
import type {
  EmployeeCreate,
  EmployeeTokenObtainPair,
  TokenResponse,
  RefreshTokenResponse,
} from "@/lib/types/auth";

/**
 * Register a new employee
 */
export const registerEmployee = (data: EmployeeCreate) => {
  return api.post<void>(ENDPOINTS.REGISTER, data);
};

/**
 * Login employee and return token pair
 */
export const login = async (
  data: EmployeeTokenObtainPair
): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>(ENDPOINTS.LOGIN, data);
  const { access, refresh } = response.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  return response.data;
};

/**
 * Refresh JWT access token
 */
export const refreshToken = async (
  refresh: string
): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>(
    "/accounts/token/refresh/",
    { refresh }
  );
  return response.data;
};

/**
 * Logout the user
 */
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};
