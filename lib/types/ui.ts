// lib/types/ui.ts (or inside the store file if it's small)
export interface Option {
    value: number;
    label: string;
  }
  
  export interface SubstationOption extends Option {
    voltage_level: string;
    circle: number;        // ✅ add circle

  }
  
  export interface SSConnectionOption extends Option {
    id: number;
    from_ss: number | null;
    to_ss: number | null;
    voltage_level: number | null;
    element_type: number | null;
    number: number | null;
  }
  
  export interface MappedMasterData {
    utilities: Option[];
    voltage_levels: Option[];
    circles: Option[];
    element_types: Option[];
    plants: Option[];
    mva_capacities: Option[];
    conductor_types: Option[];
    gen_out_reasons: Option[];
    grid_element_reasons: Option[];
    substations: SubstationOption[];
    ss_connections: SSConnectionOption[];
  }