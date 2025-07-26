import { login, registerEmployee, refreshToken, logout } from "@/lib/services/auth";
import api from "@/lib/services/api/client";

// Setup localStorage mock
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: jest.fn((key) => {
      if (key === 'token') return 'dummy_access_token';
      if (key === 'refreshToken') return 'dummy_refresh_token';
      return null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Prevent window.location.href crash
delete (window as any).location;
(window as any).location = { href: jest.fn() };

// Set base URL manually
api.defaults.baseURL = "http://localhost:8000/api";

describe('Auth Flow', () => {
  test('register, login, refresh, logout', async () => {
    const employee = {
      employee_id: "EMP999",
      name: "Test User",
      password: "test123",
    };

    const registerResponse = await registerEmployee(employee);
    expect(registerResponse).toBeDefined();

    const tokens = await login({ employee_id: employee.employee_id, password: employee.password });
    console.log("Logged in:", tokens);
    expect(tokens.access).toBeDefined();
    expect(tokens.refresh).toBeDefined();

    const refreshed = await refreshToken(tokens.refresh);
    console.log("Refreshed:", refreshed);
    expect(refreshed.access).toBeDefined();

    logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("refreshToken");
  });
});
