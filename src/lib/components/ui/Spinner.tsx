"use client";

import React from "react";

type SpinnerProps = {
  message?: string;
};

export default function Spinner({ message = "Loading..." }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
