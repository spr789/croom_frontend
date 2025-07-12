"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/authService";

export default function LoginForm() {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // 👇 Redirect to dashboard if already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await login({ employeeId, password });

      localStorage.setItem("token", result.access);
      localStorage.setItem("refreshToken", result.refresh);

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6"></div>
        <p className="text-lg font-medium text-gray-700">Logging in…</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">CROOM Login</h2>

      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        Login
      </button>
    </div>
  );
}
