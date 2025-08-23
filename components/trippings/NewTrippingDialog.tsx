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
import type { TrippingCreate } from "@/lib/services/tripping";
import Dropdown from "./Dropdown";
import { filterSubstations, filterSSConnections } from "./filters";
import { createTripping } from "@/lib/services/tripping";
import { toast } from "sonner";

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

  // Form states
  const [circle, setCircle] = useState("");
  const [voltage, setVoltage] = useState("");
  const [fromSS, setFromSS] = useState("");
  const [toSS, setToSS] = useState("");
  const [elementType, setElementType] = useState("");
  const [ssConnection, setSsConnection] = useState("");

  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<TrippingCreate["severity"] | "">("");
  const [description, setDescription] = useState("");
  const [trippingDatetime, setTrippingDatetime] = useState<string>("");
  const [number, setNumber] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered dropdown options
  const filteredSubstations = filterSubstations(
    masterData?.substations ?? [],
    circle,
    voltage
  );

  const filteredSSConnections = filterSSConnections(
    ssConnections ?? [],
    fromSS,
    elementType
  );

  const isFormValid =
    circle &&
    voltage &&
    fromSS &&
    elementType &&
    severity &&
    reason;

  const handleCreate = async () => {
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload: TrippingCreate = {
      voltage_level: Number(voltage),
      element_type: Number(elementType),
      from_ss: Number(fromSS),
      to_ss: toSS ? Number(toSS) : null,
      number: Number(number),  // <-- use actual value from user
      tripping_datetime: trippingDatetime
        ? new Date(trippingDatetime).toISOString()
        : new Date().toISOString(),
      restoration_datetime: null, // <-- send null instead of empty string
      srldc_code: "",
      reason: Number(reason),
      from_indication: "",
      to_indication: "",
      remarks: description,
    };

    try {
      setIsSubmitting(true);
      const created = await createTripping(payload);
      toast.success("Tripping logged successfully!");
      console.log("Created tripping:", created);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to create tripping:", error);
      toast.error(error.response?.data?.message || "Failed to log tripping");
    } finally {
      setIsSubmitting(false);
    }
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
            options={(masterData?.circles ?? []).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value={circle}
            onChange={setCircle}
            placeholder="Select circle"
          />

          <Dropdown
            label="Voltage Level"
            options={(masterData?.voltage_levels ?? []).map((vl) => ({
              value: vl.id,
              label: vl.voltage_level,
            }))}
            value={voltage}
            onChange={setVoltage}
            placeholder="Select voltage level"
          />

          <Dropdown
            label="From Substation"
            options={(filteredSubstations ?? []).map((ss) => ({
              value: ss.id,
              label: ss.name,
            }))}
            value={fromSS}
            onChange={setFromSS}
            placeholder="Select originating substation"
          />

          <Dropdown
            label="To Substation"
            options={(filteredSubstations ?? []).map((ss) => ({
              value: ss.id,
              label: ss.name,
            }))}
            value={toSS}
            onChange={setToSS}
            placeholder="Select terminating substation (optional)"
          />

          <Dropdown
            label="Element Type"
            options={(masterData?.element_types ?? []).map((et) => ({
              value: et.id,
              label: et.element_type,
            }))}
            value={elementType}
            onChange={setElementType}
            placeholder="Select element type"
          />

<Dropdown
  label="Number"
  options={filteredSSConnections?.map((c) => ({
    value: c.number,
    label: String(c.number),
  })) ?? []}
  value={number}
  onChange={setNumber}
  placeholder="Select number"
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
            options={(masterData?.grid_element_reasons ?? []).map((r) => ({
              value: r.id,
              label: r.name,
            }))}
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
            onChange={(val) =>
              setSeverity(val as "low" | "medium" | "high" | "")
            }
            placeholder="Select severity"
          />

          <div className="space-y-2">
            <label>Tripping Date & Time</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={trippingDatetime}
              onChange={(e) => setTrippingDatetime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label>Description / Remarks</label>
            <Textarea
              placeholder="Detailed description..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex-1"
              onClick={handleCreate}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Logging..." : "Log Tripping"}
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
