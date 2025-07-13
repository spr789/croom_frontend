"use client";

import useAuth from "@/lib/hooks/useAuth";
import TrippingForm from "@/lib/components/trippings/TrippingForm";

export default function NewTrippingPage() {
  useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Tripping Entry</h1>
      <TrippingForm />
    </div>
  );
}
