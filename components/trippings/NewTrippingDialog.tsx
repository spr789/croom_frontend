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
  const [elementType, setElementType] = useState("");
  const [selectedSSConnection, setSelectedSSConnection] = useState<
    (typeof ssConnections)[0] | null
  >(null);

  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<TrippingCreate["severity"] | "">("");
  const [fromIndication, setFromIndication] = useState("");
  const [toIndication, setToIndication] = useState("");
  const [description, setDescription] = useState("");
// Function to get current local datetime in YYYY-MM-DDTHH:mm
const getLocalDateTimeString = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // months are 0-based
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Use for state and max
const [trippingDatetime, setTrippingDatetime] = useState<string>(
  getLocalDateTimeString()
);
const nowLocal = getLocalDateTimeString(); // max attribute


  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter dropdowns
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
    reason &&
    selectedSSConnection;

    const handleCreate = async () => {
      if (!isFormValid) {
        toast.error("Please fill all required fields.");
        return;
      }
    
      // Prevent future tripping date
      if (trippingDatetime && new Date(trippingDatetime) > new Date()) {
        toast.error("Tripping date cannot be in the future.");
        return;
      }
    
      const payload: TrippingCreate = {
        element_type: Number(elementType),
        voltage_level: Number(voltage),
        from_ss: selectedSSConnection?.from_ss ?? Number(fromSS),
        to_ss: selectedSSConnection?.to_ss ?? null,
        number: selectedSSConnection?.number ?? 0,
        tripping_datetime: trippingDatetime
          ? new Date(trippingDatetime).toISOString()
          : new Date().toISOString(),
        restoration_datetime: null,
        srldc_code: "",
        reason: Number(reason),
        from_indication: fromIndication,
        to_indication: toIndication,
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

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Log New Tripping</DialogTitle>
        </DialogHeader>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
  label="SS Connection"
  options={filteredSSConnections?.map((c) => ({
    value: String(c.value), // convert number to string
    label: c.label,
    data: c,
  })) ?? []}
  value={selectedSSConnection ? String(selectedSSConnection.value) : ""}
  onChange={(val) => {
    const conn = filteredSSConnections.find(
      (c) => c.value === Number(val) // convert back to number for lookup
    );
    setSelectedSSConnection(conn ?? null);
  }}
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
    max={nowLocal} // prevents selecting future date
  />
</div>


          <div className="space-y-2">
            <label>From Indication</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={fromIndication}
              onChange={(e) => setFromIndication(e.target.value)}
              placeholder="Enter from indication"
            />
          </div>

          <div className="space-y-2">
            <label>To Indication</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={toIndication}
              onChange={(e) => setToIndication(e.target.value)}
              placeholder="Enter to indication"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label>Description / Remarks</label>
            <Textarea
              placeholder="Detailed description..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 md:col-span-2">
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
