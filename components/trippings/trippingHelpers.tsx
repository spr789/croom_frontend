import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import type { Tripping } from "@/lib/types/tripping";

export const getStatusColor = (status: Tripping["status"]) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800 border-red-200";
    case "cleared":
      return "bg-green-100 text-green-800 border-green-200";
    case "investigating":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getSeverityColor = (severity: Tripping["severity"]) => {
  switch (severity) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const getStatusIcon = (status: Tripping["status"]) => {
  switch (status) {
    case "active":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "cleared":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "investigating":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export const filterTrippings = (
  data: Tripping[],
  searchTerm: string,
  selectedStatus: "all" | Tripping["status"]
) => {
  const q = searchTerm.trim().toLowerCase();
  return data.filter((t) => {
    const matchesSearch =
      !q ||
      t.feeder.toLowerCase().includes(q) ||
      t.substation.toLowerCase().includes(q) ||
      t.reason.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === "all" || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
};
