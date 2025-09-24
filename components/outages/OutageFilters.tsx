import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { GenOutage } from "@/lib/types/genOutage";
import { Card, CardContent } from "@/components/ui/card";

export default function OutageFilters({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  outages
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedType: string;
  setSelectedType: (v: string) => void;
  outages: GenOutage[];
}) {
  const typeCounts = {
    all: outages.length,
    planned: outages.filter((o) => o.outage_type === "planned").length,
    forced: outages.filter((o) => o.outage_type === "forced").length,
  };

  return (
    <Card>
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search outages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({typeCounts.all})</SelectItem>
            <SelectItem value="planned">Planned ({typeCounts.planned})</SelectItem>
            <SelectItem value="forced">Forced ({typeCounts.forced})</SelectItem>
            <SelectItem value="emergency">Emergency ({typeCounts.emergency})</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
