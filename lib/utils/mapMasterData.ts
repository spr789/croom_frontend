// src/lib/utils/mapMasterData.ts

/**
 * Generic mapper to convert list of objects to { label, value } format
 * @param list - Array of objects from API
 * @param labelKey - Key to use for label
 * @param valueKey - Key to use for value
 */
const mapToOptions = (
    list: any[] = [],
    labelKey: string = "name",
    valueKey: string = "id"
  ) => {
    return list.map(item => ({
      label: item[labelKey],
      value: item[valueKey],
    }));
  };
  
  /**
   * Map master data response into frontend-friendly dropdown options
   * @param data - Raw master data from backend
   */
  export const mapMasterData = (data: any) => {
    if (!data) return null;
  
    return {
      ...data,
      utilities: mapToOptions(data.utilities),
      voltage: mapToOptions(data.voltage_levels),
      circles: mapToOptions(data.circles),
      element_types: mapToOptions(data.element_types),
      substations: mapToOptions(data.substations),
      plants: mapToOptions(data.plants),
      mva_capacities: mapToOptions(data.mva_capacities, "capacity"),
      conductor_types: mapToOptions(data.conductor_types),
      gen_out_reasons: mapToOptions(data.gen_out_reasons),
      grid_element_reasons: mapToOptions(data.grid_element_reasons),
      ss_connections: (data.ss_connections || []).map((item: any) => ({
        label: `${item.from_ss?.name} → ${item.to_ss?.name} (${item.voltage_level?.name})`,
        value: item.id,
      })),
    };
  };
  
  