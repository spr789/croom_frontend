import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OutageItem from "./OutageItem";
import type { GenOutage } from "@/lib/types/genOutage";

export default function OutageList({ outages }: { outages: GenOutage[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Outages ({outages.length})</span>
          <div className="flex space-x-2">
            <Badge variant="destructive">
              {outages.filter((o) => !o.sync_time).length} Active
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {outages.map((outage) => (
            <OutageItem key={outage.id} outage={outage} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
