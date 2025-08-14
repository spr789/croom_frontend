"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Tripping } from "@/lib/types/tripping";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedStatus: "all" | Tripping["status"];
  setSelectedStatus: (v: "all" | Tripping["status"]) => void;
  statusCounts: {
    all: number;
    active: number;
    cleared: number;
    investigating: number;
  };
}

export default function TrippingFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  statusCounts,
}: Props) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search trippings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as "all" | Tripping["status"])}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
          <SelectItem value="active">Active ({statusCounts.active})</SelectItem>
          <SelectItem value="cleared">Cleared ({statusCounts.cleared})</SelectItem>
          <SelectItem value="investigating">Investigating ({statusCounts.investigating})</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
