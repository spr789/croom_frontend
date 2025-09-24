"use client";

import { useState } from "react";
import { useGenOutages } from "@/lib/hooks/useGenOutages";
import { Loader2 } from "lucide-react";

import OutagesHeader from "./OutagesHeader";
import OutageSummaryCards from "./OutageSummaryCards";
import OutageFilters from "./OutageFilters";
import OutageList from "./OutageList";

export default function OutagesView() {
  const { data: outages, isLoading, isError } = useGenOutages();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-600 p-6">Failed to load outages.</div>;
  }

  const filteredOutages = (outages || []).filter((o) => {
    const matchesSearch =
      o.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(o.plant).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || o.outage_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <OutagesHeader />
      <OutageSummaryCards outages={outages || []} />
      <OutageFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        outages={outages || []}
      />
      <OutageList outages={filteredOutages} />
    </div>
  );
}
