// src/lib/utils/mapMasterData.ts
import { MasterData, SSConnection, Substation } from "@/lib/types/masterData";
import { Option, SubstationOption, SSConnectionOption, MappedMasterData } from "@/lib/types/ui"; // ✅ import from ui.ts



/**
 * Generic function to convert an array of objects into dropdown options
 */
const mapToOptions = <T extends Record<string, any>>(
  list: T[] = [],
  labelKey: keyof T = "name",
  valueKey: keyof T = "id"
): Option[] => {
  return list
    .filter(item => item && item[valueKey] !== undefined)
    .map(item => ({
      label: String(item[labelKey]) || "Unknown",
      value: Number(item[valueKey]), // ✅ convert to number
    }));
};


/**
 * Maps MasterData API response into dropdown-friendly format
 */
export const mapMasterData = (data: MasterData | null): MappedMasterData | null => {
  if (!data) return null;

  return {
    utilities: mapToOptions(data.utilities), // mapToOptions should return {label, value:number}
    voltage_levels: mapToOptions(data.voltage_levels, "voltage_level", "id"),
    circles: mapToOptions(data.circles),
    element_types: mapToOptions(data.element_types, "element_type", "id"),
    plants: mapToOptions(data.plants),
    mva_capacities: mapToOptions(data.mva_capacities, "capacity"),
    conductor_types: mapToOptions(data.conductor_types),
    gen_out_reasons: mapToOptions(data.gen_out_reasons),
    grid_element_reasons: mapToOptions(data.grid_element_reasons),

    // Substations
    substations: (data.substations || []).map((s: Substation): SubstationOption => ({
      label: s.name,
      value: s.id,                   // ✅ number
      circle: s.circle,
      voltage_level: String(s.voltage_level), // ✅ convert to string if UI expects string
    })),

    // SS Connections
    ss_connections: (data.ss_connections || []).map((item: SSConnection): SSConnectionOption => {
      const isFeeder = item.element_type.element_type === "Feeder";
    
      const label = isFeeder
        ? `${item.from_ss?.name || "?"} → ${item.to_ss?.name || "-"} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`
        : `${item.from_ss?.name || "?"} ${item.element_type?.element_type || ""} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`;
    
      return {
        id: item.id,                        // ✅ required
        value: item.id,                     // keep value as number
        label,
        from_ss: item.from_ss?.id || null,
        to_ss: item.to_ss?.id || null,
        voltage_level: item.voltage_level?.id || null,
        element_type: item.element_type?.id || null,
        number: item.number || null,        // ✅ required
      };
    }),
    
  };
};

