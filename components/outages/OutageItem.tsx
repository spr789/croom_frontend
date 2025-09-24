import type { GenOutage } from "@/lib/types/genOutage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Clock } from "lucide-react";

export default function OutageItem({ outage }: { outage: GenOutage }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge>{outage.outage_type.toUpperCase()}</Badge>
            <span className="font-medium text-gray-900 dark:text-white">
              Plant #{outage.plant}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{outage.remarks || "No remarks"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-3 w-3 mr-1" /> View
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
      </div>
      <div className="flex items-center text-xs text-gray-500 space-x-2">
        <Clock className="h-3 w-3" />
        <span>{new Date(outage.trip_time).toLocaleString()}</span>
      </div>
    </div>
  );
}
