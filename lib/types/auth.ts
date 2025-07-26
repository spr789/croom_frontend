// types/auth.ts

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type RefreshTokenResponse = {
  access: string;
  refresh: string;
};

export type DecodedToken = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  name: string;
};

export type EmployeeCreate = {
  employee_id: string;
  name: string;
  password: string;
  designation?: string | null;
  mobile_number?: string | null;
};

export type EmployeeTokenObtainPair = {
  employee_id: string;
  password: string;
};

export type TokenResponse = {
  access: string;
  refresh: string;
};

// lib/types/auth.ts
export interface JWTPayload {
  user_id: string;
  name: string;
  exp: number;
  iat: number;
}

export interface User {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  lastLoginTime: string;
  lastLoginIP: string;
}
