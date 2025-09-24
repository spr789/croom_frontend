// lib/types/genOutage.ts

export interface GenOutage {
  id: number;
  plant: number;                // FK → Plant.id
  outage_type: "Planned" | "Forced";
  reason?: number | null;       // FK → GenOutReason.id (nullable)
  trip_time: string;            // ISO datetime string
  sync_time?: string | null;    // ISO datetime string | null
  expected_sync_time?: string | null; // ISO datetime string | null
  remarks?: string | null;
  duration?: string | null;     // Computed property from backend
}

// ✅ For creation request (POST)
export interface GenOutageCreate {
  plant: number;
  outage_type: "Planned" | "Forced";
  reason?: number | null;
  trip_time: string;
  expected_sync_time?: string | null;
  remarks?: string | null;
}

// ✅ For update (PUT/PATCH)
export interface GenOutageUpdate {
  plant?: number;
  outage_type?: "Planned" | "Forced";
  reason?: number | null;
  trip_time?: string;
  sync_time?: string | null;
  expected_sync_time?: string | null;
  remarks?: string | null;
}
