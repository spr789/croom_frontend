"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import type { Tripping } from "@/lib/types/tripping";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: Omit<Tripping, "id">) => void;
  triggerLabel?: string;
}

export default function NewTrippingDialog({ open, onOpenChange, onSubmit, triggerLabel = "New" }: Props) {
  const [substation, setSubstation] = useState("");
  const [feeder, setFeeder] = useState("");
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<Tripping["severity"] | "">("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!substation || !feeder || !reason || !severity) return;

    onSubmit({
      timestamp: new Date().toISOString(),
      substation,
      feeder,
      reason,
      employee: "EMP001", // could be taken from auth context
      status: "active",
      severity: severity as Tripping["severity"],
      description,
    });
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="substation">Substation</Label>
            <Select onValueChange={setSubstation}>
              <SelectTrigger>
                <SelectValue placeholder="Select substation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SS-MAIN-01">SS-MAIN-01</SelectItem>
                <SelectItem value="SS-SUB-02">SS-SUB-02</SelectItem>
                <SelectItem value="SS-DIST-03">SS-DIST-03</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feeder">Feeder/Equipment</Label>
            <Input id="feeder" placeholder="e.g., 132KV Feeder F-1" value={feeder} onChange={(e) => setFeeder(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Select onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Earth Fault">Earth Fault</SelectItem>
                <SelectItem value="Over Current">Over Current</SelectItem>
                <SelectItem value="Lightning">Lightning</SelectItem>
                <SelectItem value="Equipment Failure">Equipment Failure</SelectItem>
                <SelectItem value="Human Error">Human Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select onValueChange={(v) => setSeverity(v as Tripping["severity"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the tripping..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1" onClick={handleCreate}>
              Log Tripping
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
