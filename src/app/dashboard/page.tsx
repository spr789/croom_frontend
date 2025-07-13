"use client";

import useAuth from "@/lib/hooks/useAuth";
import DashboardCard from "@/lib/components/dashboard/DashboardCard";


export default function DashboardPage() {
  const loading = useAuth();

  if (loading) {
    return (

      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Checking authentication…</p>
        </div>
      </div>
    );
  }

  return (

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">CROOM Dashboard</h1>
        <p className="text-lg text-gray-700">Welcome to the protected dashboard.</p>

        <div className="flex flex-col space-y-4 mt-6">
          <DashboardCard
            title="View Trippings Log"
            href="/trippings"
            color="bg-indigo-600"
            icon="📄"
          />

          <DashboardCard
            title="New Tripping Entry"
            href="/trippings/new"
            color="bg-green-600"
            icon="➕"
          />

          <DashboardCard
            title="Logout"
            color="bg-red-600"
            icon="🚪"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          />
        </div>
      </div>

  );
}
