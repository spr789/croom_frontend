import { Card, CardContent } from "@/components/ui/card";
import { Power, User, Clock, Calendar } from "lucide-react";
import type { GenOutage } from "@/lib/types/genOutage";

export default function OutageSummaryCards({ outages }: { outages: GenOutage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Outages</p>
              <p className="text-2xl font-bold text-red-600">{outages.length}</p>
            </div>
            <Power className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Plants Affected</p>
              <p className="text-2xl font-bold text-orange-600">
                {[...new Set(outages.map((o) => o.plant))].length}
              </p>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">With Remarks</p>
              <p className="text-2xl font-bold text-blue-600">
                {outages.filter((o) => o.remarks).length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {outages.filter((o) =>
                  new Date(o.trip_time).getMonth() === new Date().getMonth()
                ).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
