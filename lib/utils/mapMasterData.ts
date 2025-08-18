// src/lib/utils/mapMasterData.ts

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
 */
export const mapMasterData = (data: any) => {
  if (!data) return null;

  return {
    ...data,

    utilities: mapToOptions(data.utilities),
    voltage_levels: mapToOptions(data.voltage_levels, "voltage_level", "id"),
    circles: mapToOptions(data.circles),
    element_types: mapToOptions(data.element_types, "element_type", "id"),

    substations: (data.substations || []).map((s: any) => ({
      label: s.name,
      value: s.id,
      circle: s.circle,
      voltage_level: s.voltage_level,
    })),

    plants: mapToOptions(data.plants),
    mva_capacities: mapToOptions(data.mva_capacities, "capacity"),
    conductor_types: mapToOptions(data.conductor_types),
    gen_out_reasons: mapToOptions(data.gen_out_reasons),
    grid_element_reasons: mapToOptions(data.grid_element_reasons),

    // ✅ SS Connections mapping (using nested objects directly)
    // inside mapMasterData

ss_connections: (data.ss_connections || []).map((item: any) => {
  const isFeeder = item.element_type?.element_type === "Feeder";

  let label = "";
  if (isFeeder) {
    label = `${item.from_ss?.name || "?"} → ${item.to_ss?.name || "-"} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`;
  } else {
    label = `${item.from_ss?.name || "?"} ${item.element_type?.element_type || ""} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`;
  }

  const mapped = {
    label,
    value: item.id,
    from_ss: item.from_ss?.id,
    to_ss: item.to_ss?.id,
    voltage_level: item.voltage_level?.id,
    element_type: item.element_type?.id,
  };

  console.log("🟢 Mapped SS Connection 123:", mapped);
  return mapped;
}),

  };
};
