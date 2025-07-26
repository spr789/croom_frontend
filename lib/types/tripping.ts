// tripping.ts

export interface Tripping {
  id?: number;
  connection: number;
  voltage_level?: string;
  element_type?: string;
  from_ss?: string;
  to_ss?: string;
  tripping_datetime: string;
  restoration_datetime?: string;
  srldc_code?: string;
  reason?: number;
  from_indication?: string;
  to_indication?: string;
  remarks?: string;
}
