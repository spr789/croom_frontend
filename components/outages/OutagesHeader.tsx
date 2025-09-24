import { Power, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import OutageDialog from "./OutageDialog";

export default function OutagesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Power className="h-6 w-6 text-orange-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Outages Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage planned and unplanned outages
          </p>
        </div>
      </div>
      <OutageDialog>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Log Outage
        </Button>
      </OutageDialog>
    </div>
  );
}
