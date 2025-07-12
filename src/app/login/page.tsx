"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/lib/components/auth/LoginForm";
import Spinner from "@/lib/components/ui/Spinner";

export default function LoginPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return <Spinner message="Checking authentication…" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
