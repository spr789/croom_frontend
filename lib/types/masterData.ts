// types.ts

export interface Utility {
  id: number;
  name: string;
}

export interface VoltageLevel {
  id: number;
  voltage_level: string;
}

export interface Circle {
  id: number;
  name: string;
}

export interface ElementType {
  id: number;
  element_type: string;
}

export interface Substation {
  id: number;
  name: string;
  sap_code: string | null;
  mobile_number: string | null;
  exp_no: string | null;
  circle: number; // Reference to Circle ID
  voltage_level: number; // Reference to VoltageLevel ID
  owner: number | null; // Reference to Utility ID (nullable)
}

export interface Plant {
  id: number;
  name: string;
  unit_no: string;
  ins_capacity: string; // Keeping as string because API returns "210.00"
  gen_type: string;
  commissioning_date: string | null;
  owner: number; // Reference to Utility ID
  connected_substation: number | null; // Reference to Substation ID
}

export interface MVACapacity {
  id: number;
  capacity: string; // "500.00"
  unit: string; // "MVA"
}

export interface ConductorType {
  id: number;
  name: string;
  description: string;
}

export interface GenOutReason {
  id: number;
  name: string;
  outage_type: string; // "FORCED" or "PLANNED"
}

export interface GridElementReason {
  id: number;
  name: string;
}

export interface SSConnection {
  id: number;
  voltage_level: VoltageLevel;
  element_type: ElementType;
  from_ss: Substation;
  to_ss: Substation | null; // Nullable for non-feeder types
  number: number;
  is_interstate: boolean;
  capacity: MVACapacity | null;
  conductor_type: ConductorType | null;
  is_active: boolean;
}

// The full response type for /master/master-data/
export interface MasterData {
  utilities: Utility[];
  voltage_levels: VoltageLevel[];
  circles: Circle[];
  element_types: ElementType[];
  substations: Substation[];
  plants: Plant[];
  mva_capacities: MVACapacity[];
  conductor_types: ConductorType[];
  gen_out_reasons: GenOutReason[];
  grid_element_reasons: GridElementReason[];
  ss_connections: SSConnection[];
}

export interface SSConnectionsResponse {
  ss_connections: SSConnection[];
}
