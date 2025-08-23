// tripping.types.ts

export interface ConnectionInfo {
  voltage_level: string;       // e.g., "220KV"
  element_type: string;        // e.g., "Bus"
  from_substation: string;     // e.g., "Garividi"
  to_substation: string | null;
  number: number;
}

// Response for list and detail
export interface Tripping {
  id: number;
  connection_info: ConnectionInfo;
  voltage_level_display: string;
  element_type_display: string;
  from_ss_display: string;
  to_ss_display: string | null;
  tripping_datetime: string;   // ISO string
  restoration_datetime: string;
  srldc_code: string;
  reason: number;              // ID from grid_element_reasons
  from_indication: string;
  to_indication: string;
  remarks: string;
  status: string; // e.g., "TRIPPED", "RESTORED"
}

export type TrippingList = Tripping[];
export type TrippingDetail = Tripping;

// ==============================
// Request types for CREATE/UPDATE
// ==============================
export interface TrippingCreate {
  element_type: number;        // element_type ID
  voltage_level: number;       // voltage_level ID
  from_ss: number;             // Substation ID
  to_ss: number | null;        // Substation ID or null
  number: number;              // Feeder/Bus number
  tripping_datetime: string;   // ISO timestamp
  restoration_datetime: string; // ISO timestamp
  srldc_code: string;
  reason: number;              // reason ID
  from_indication: string;
  to_indication: string;
  remarks: string;
}

export type TrippingUpdate = Partial<TrippingCreate>; // For PATCH requests
