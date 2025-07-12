import api from "@/lib/services/api";
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "@/lib/types/auth";


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/accounts/token/", {
    employee_id: data.employeeId,  // convert camelCase → snake_case here
    password: data.password,
  });
  return response.data;
};


// Token refresh function
export const refreshToken = async (refresh: string): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>("/accounts/token/refresh/", { refresh });
  return response.data;
};

// Logout utility (clearing local storage tokens)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};
