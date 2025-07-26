// genOutage.ts

export interface GenOutage {
  id?: number;
  plant: number;
  outage_type: "Planned" | "Forced";
  reason?: number;
  trip_time: string;
  sync_time?: string;
  expected_sync_time?: string;
  remarks?: string;
  duration?: string;
}
