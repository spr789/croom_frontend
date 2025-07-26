"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "@/lib/services/api/client";
import type { JWTPayload, User } from "@/lib/types/auth";

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

type TokenResponse = {
  access: string;
  refresh: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
  
    if (token && userData) {
      try {
        const decoded: JWTPayload = jwtDecode(token);
        const now = Date.now() / 1000;
  
        if (decoded.exp && decoded.exp > now) {
          setUser(JSON.parse(userData));
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
  
    setIsLoading(false);
  
    const warningTimeout = setTimeout(() => {
      const confirmed = confirm("Your session will expire in 5 minutes. Do you want to continue?");
      if (!confirmed) logout();
    }, 25 * 60 * 1000);
  
    const logoutTimeout = setTimeout(() => {
      alert("Session expired. Please login again.");
      logout();
    }, 30 * 60 * 1000);
  
    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
    };
  }, []); // ✅ Empty dependency: run only once on mount
  

  const login = async (employeeId: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post<TokenResponse>("/accounts/token/", {
        employee_id: employeeId,
        password,
      });
      
      const { access, refresh } = response.data;
      const decoded: JWTPayload = jwtDecode(access);

      const loggedInUser: User = {
        id: decoded.user_id,
        employeeId,
        name: decoded.name || `User ${employeeId}`,
        role: "Unknown", // replace if backend sends role
        lastLoginTime: new Date().toISOString(),
        lastLoginIP: "0.0.0.0", // replace if backend sends IP
      };

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
