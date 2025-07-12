"use client";

import useAuth from "@/lib/hooks/useAuth";
import axios from "@/lib/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Tripping {
  id: number;
  element_name: string;
  substation: string;
  voltage_level: string;
  tripping_time: string;
  remarks: string;
}

export default function TrippingsPage() {
  useAuth();
  const [trippings, setTrippings] = useState<Tripping[]>([]);

  useEffect(() => {
    const fetchTrippings = async () => {
      try {
        const response = await axios.get("trippings/trippings/");
        setTrippings(response.data);
      } catch (error) {
        console.error("Failed to fetch trippings:", error);
      }
    };

    fetchTrippings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trippings Log</h1>
        <Link
          href="/trippings/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Tripping
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Element</th>
              <th className="p-3 border">Substation</th>
              <th className="p-3 border">Voltage Level</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {trippings.map((trip) => (
              <tr key={trip.id} className="border-b text-sm">
                <td className="p-3 border">{trip.id}</td>
                <td className="p-3 border">{trip.element_name}</td>
                <td className="p-3 border">{trip.substation}</td>
                <td className="p-3 border">{trip.voltage_level}</td>
                <td className="p-3 border">{new Date(trip.tripping_time).toLocaleString()}</td>
                <td className="p-3 border">{trip.remarks}</td>
              </tr>
            ))}
            {trippings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No trippings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
