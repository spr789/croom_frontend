export const filterSubstations = (substations: any[], circle: string, voltage: string) => {
    console.log("🔍 Filtering Substations", { circle, voltage, substations });
    return (
      substations?.filter(
        (s: any) =>
          (!circle || s.circle === Number(circle)) &&
          (!voltage || s.voltage_level === Number(voltage))
      ) ?? []
    );
  };
  
  export const filterSSConnections = (
    connections: any[],
    substation: string,
    elementType: string
  ) => {
    console.log("🔍 Filtering SS Connections", { substation, elementType, connections });
  
    return (
      connections?.filter((ss: any) => {
        const matchesSubstation =
          !substation ||
          ss.from_ss === Number(substation) ||
          ss.to_ss === Number(substation); // ✅ check both ends
  
        const matchesElementType =
          !elementType || String(ss.element_type) === String(elementType); // ✅ cast to string for safety
  
        return matchesSubstation && matchesElementType;
      }) ?? []
    );
  };
  
  