"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Zap } from "lucide-react";

import { useTrippings } from "@/lib/hooks/useTrippings";
import type { Tripping, TrippingCreate } from "@/lib/types/tripping";
import TrippingFilters from "@/components/trippings/TrippingFilters";
import TrippingCard from "@/components/trippings/TrippingCard";
import NewTrippingDialog from "@/components/trippings/NewTrippingDialog";

export default function TrippingsView() {
  const { trippings, loading, error, createTripping, setTrippings } = useTrippings();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | Tripping["status"]>("all");
  const [isNewTrippingOpen, setIsNewTrippingOpen] = useState(false);

  // Filtered and status counts
  const statusCounts = useMemo(() => ({
    all: trippings.length,
    active: trippings.filter((t) => t.status === "active").length,
    cleared: trippings.filter((t) => t.status === "cleared").length,
    investigating: trippings.filter((t) => t.status === "investigating").length,
  }), [trippings]);

  const filteredTrippings = useMemo(() => {
    return trippings.filter((t) => {
      const matchesSearch =
        t.element_type_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.from_ss_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.to_ss_display?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchesStatus = selectedStatus === "all" || t.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [trippings, searchTerm, selectedStatus]);

  // Handle creating new tripping
  const handleCreate = async (data: TrippingCreate) => {
    try {
      const created: Tripping = await createTripping(data);
      setTrippings((prev) => [created, ...prev]);
      setIsNewTrippingOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark tripping as cleared
  const markCleared = (id: number) => {
    setTrippings((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "cleared",
              clearTime: new Date().toISOString(),
              duration: t.tripping_datetime
                ? `${Math.round(
                    (Date.now() - new Date(t.tripping_datetime).getTime()) / 60000
                  )} min`
                : undefined,
            }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="h-6 w-6 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold">Trippings Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage electrical system trippings</p>
          </div>
        </div>

        <NewTrippingDialog
          open={isNewTrippingOpen}
          onOpenChange={setIsNewTrippingOpen}
          onSubmit={handleCreate}  // <-- call handleCreate when tripping is logged
          triggerLabel="New Tripping"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <TrippingFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            statusCounts={statusCounts}
          />
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trippings ({filteredTrippings.length})</span>
            <div className="flex space-x-2">
              <Badge variant="destructive">{statusCounts.active} Active</Badge>
              <Badge variant="secondary">{statusCounts.investigating} Investigating</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading trippings...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {filteredTrippings.map((t) => (
              <TrippingCard
                key={t.id}
                tripping={t}
                onMarkCleared={() => markCleared(t.id)}
                actions={
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
