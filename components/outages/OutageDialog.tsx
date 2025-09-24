"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGenOutage } from "@/lib/services/genOutage";
import type { GenOutageCreate } from "@/lib/types/genOutage";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function OutageDialog({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<GenOutageCreate>({
    plant: "",
    outage_type: "planned",
    trip_time: "",
    sync_time: "",
    remarks: "",
  });

  const mutation = useMutation({
    mutationFn: (data: GenOutageCreate) => createGenOutage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genOutages"] });
      setOpen(false);
      setForm({
        plant: "",
        outage_type: "planned",
        trip_time: "",
        sync_time: "",
        remarks: "",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log New Outage</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Plant */}
          <div>
            <Label htmlFor="plant">Plant</Label>
            <Input
              id="plant"
              name="plant"
              value={form.plant}
              onChange={handleChange}
              placeholder="Enter plant ID or name"
            />
          </div>

          {/* Outage Type */}
          <div>
            <Label htmlFor="outage_type">Outage Type</Label>
            <Select
              value={form.outage_type}
              onValueChange={(val) => setForm({ ...form, outage_type: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="forced">Forced</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trip Time */}
          <div>
            <Label htmlFor="trip_time">Trip Time</Label>
            <Input
              type="datetime-local"
              id="trip_time"
              name="trip_time"
              value={form.trip_time}
              onChange={handleChange}
            />
          </div>

          {/* Sync Time */}
          <div>
            <Label htmlFor="sync_time">Sync Time</Label>
            <Input
              type="datetime-local"
              id="sync_time"
              name="sync_time"
              value={form.sync_time || ""}
              onChange={handleChange}
            />
          </div>

          {/* Remarks */}
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              name="remarks"
              value={form.remarks || ""}
              onChange={handleChange}
              placeholder="Enter remarks"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Outage"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
