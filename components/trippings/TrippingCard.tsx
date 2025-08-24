"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Tripping } from "@/lib/types/tripping";
import { getStatusColor, getStatusIcon } from "./trippingHelpers";
import { getEmployeeName } from "@/lib/utils/storage";

interface Props {
  tripping: Tripping;
  onMarkCleared?: () => void;
  onMarkInvestigating?: () => void;
  actions?: ReactNode;
}

// Format main label for the card
const formatTrippingLabel = (tripping: Tripping) => {
  const elementType = (tripping as any).connection_info?.element_type ?? tripping.element_type;
  const voltageLevel = (tripping as any).connection_info?.voltage_level ?? tripping.voltage_level;
  const fromSS = (tripping as any).connection_info?.from_substation ?? tripping.from_ss;
  const toSS = (tripping as any).connection_info?.to_substation ?? tripping.to_ss;
  const number = (tripping as any).connection_info?.number ?? tripping.number;

  return `${elementType}: ${voltageLevel} ${fromSS}${toSS ? ` - ${toSS}` : ""} - ${number ?? "-"}`;
};

export default function TrippingCard({ tripping, onMarkCleared, onMarkInvestigating, actions }: Props) {
  const status = tripping.restoration_datetime ? "cleared" : tripping.status || "active";

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              {getStatusIcon(status)}
              <Badge
                className={getStatusColor(status)}
                variant="outline"
              >
                {status.toUpperCase()}
              </Badge>

              <span className="font-medium">{formatTrippingLabel(tripping)}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reason: {tripping.reason || "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">{actions}</div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{tripping.remarks || "-"}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{new Date(tripping.tripping_datetime).toLocaleString()}</span>
        </div>

        {tripping.restoration_datetime && (
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(tripping.restoration_datetime).toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3" />
          <span>{tripping.from_ss}</span>
        </div>

        {tripping.to_ss && (
          <div className="flex items-center space-x-1">
            <ArrowRight className="h-3 w-3" />
            <span>{tripping.to_ss}</span>
          </div>
        )}

        {tripping.from_indication && (
          <div className="flex items-center space-x-1">
            <span className="font-medium">From:</span>
            <span>{tripping.from_indication}</span>
          </div>
        )}

        {tripping.to_indication && (
          <div className="flex items-center space-x-1">
            <span className="font-medium">To:</span>
            <span>{tripping.to_indication}</span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{getEmployeeName() || "-"}</span>
        </div>

        {tripping.duration && (
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Duration: {tripping.duration}</span>
          </div>
        )}
      </div>

      {status === "active" && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
              onClick={onMarkCleared}
            >
              Mark as Cleared
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              onClick={onMarkInvestigating}
            >
              Under Investigation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
