"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMasterDataStore } from "@/lib/store/masterDataStore";
import type { Tripping } from "@/lib/types/tripping";

import Dropdown from "./Dropdown";
import { filterSubstations, filterSSConnections } from "./filters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel?: string;
};

export default function NewTrippingDialog({
  open,
  onOpenChange,
  triggerLabel = "New Tripping",
}: Props) {
  const { masterData, ssConnections, loading } = useMasterDataStore();

  // local state
  const [circle, setCircle] = useState("");
  const [voltage, setVoltage] = useState("");
  const [substation, setSubstation] = useState("");
  const [elementType, setElementType] = useState("");
  const [ssConnection, setSsConnection] = useState("");
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<Tripping["severity"] | "">("");
  const [description, setDescription] = useState("");

  // ---- Filtering ----
  const filteredSubstations = filterSubstations(
    masterData?.substations ?? [],
    circle,
    voltage
  );

  const filteredSSConnections = filterSSConnections(
    ssConnections?.ss_connections ?? [],
    substation,
    elementType
  );

  // ---- Submit ----
  const handleCreate = () => {
    const payload: Partial<Tripping> = {
      circle: Number(circle),
      voltage_level: Number(voltage),
      substation: Number(substation),
      element_type: Number(elementType),
      ss_connection: Number(ssConnection),
      reason,
      severity: severity as Tripping["severity"],
      description,
    };

    console.log("Submitting tripping:", payload);
    // TODO: API call
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log New Tripping</DialogTitle>
        </DialogHeader>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}

        <div className="space-y-4">
          <Dropdown
            label="Circle"
            options={masterData?.circles ?? []}
            value={circle}
            onChange={setCircle}
            placeholder="Select circle"
          />

          <Dropdown
            label="Voltage Level"
            options={masterData?.voltage_levels ?? []}
            value={voltage}
            onChange={setVoltage}
            placeholder="Select voltage level"
          />

          <Dropdown
            label="Substation"
            options={filteredSubstations ?? []}
            value={substation}
            onChange={setSubstation}
            placeholder="Select substation"
          />

          <Dropdown
            label="Element Type"
            options={masterData?.element_types ?? []}
            value={elementType}
            onChange={setElementType}
            placeholder="Select element type"
          />

          <Dropdown
            label="SS Connection"
            options={filteredSSConnections ?? []}
            value={ssConnection}
            onChange={setSsConnection}
            placeholder="Select SS connection"
          />

          <Dropdown
            label="Reason"
            options={[
              { value: "Earth Fault", label: "Earth Fault" },
              { value: "Over Current", label: "Over Current" },
              { value: "Lightning", label: "Lightning" },
              { value: "Equipment Failure", label: "Equipment Failure" },
              { value: "Human Error", label: "Human Error" },
            ]}
            value={reason}
            onChange={setReason}
            placeholder="Select reason"
          />

          <Dropdown
            label="Severity"
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
            value={severity}
            onChange={setSeverity}
            placeholder="Select severity"
          />

          {/* Description */}
          <div className="space-y-2">
            <label>Description</label>
            <Textarea
              placeholder="Detailed description..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={handleCreate}>
              Log Tripping
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
