"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const pathname = usePathname();

  // Example: dynamic title based on route
  const getPageTitle = () => {
    if (pathname.startsWith("/trippings/new")) return "New Tripping Entry";
    if (pathname.startsWith("/trippings")) return "Trippings Log";
    return "Control Room Logbook";
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow">
      <h1 className="text-lg font-semibold">{getPageTitle()}</h1>

      <div className="space-x-3 text-sm">
        {pathname !== "/dashboard" && (
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 px-3 py-1.5 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>
        )}
        {pathname !== "/trippings" && (
          <Link
            href="/trippings"
            className="bg-white text-blue-600 px-3 py-1.5 rounded hover:bg-gray-100"
          >
            Trippings
          </Link>
        )}
      </div>
    </header>
  );
}
