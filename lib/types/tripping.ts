export interface Tripping {
  id: string;
  connection_info: {
    element_type: string;
    voltage_level: string;
    from_ss: string;
    to_ss?: string | null;
    number: number;
  };
  tripping_datetime: string;
  restoration_datetime?: string;
  reason?: { id: string; name: string };
  from_indication?: string;
  to_indication?: string;
  remarks?: string;
  status: "active" | "cleared" | "investigating";
  clearTime?: string;
  duration?: string;
}
