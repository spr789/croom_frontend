import type { Tripping } from "@/lib/types/tripping";

export const trippings: Tripping[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:45",
    substation: "SS-MAIN-01",
    feeder: "132KV Feeder F-1",
    reason: "Earth Fault",
    employee: "EMP001",
    status: "active",
    severity: "high",
    description: "Earth fault detected on 132KV line due to tree contact during high winds",
  },
  {
    id: "2",
    timestamp: "2024-01-15 13:15:20",
    substation: "SS-SUB-02",
    feeder: "11KV Feeder F-3",
    reason: "Over Current",
    employee: "EMP002",
    status: "cleared",
    severity: "medium",
    description: "Over current protection operated due to temporary overload",
    clearTime: "2024-01-15 13:45:30",
    duration: "30 min",
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:45:10",
    substation: "SS-DIST-03",
    feeder: "11KV Feeder F-5",
    reason: "Lightning",
    employee: "EMP003",
    status: "investigating",
    severity: "high",
    description: "Lightning strike caused protection to operate",
  },
];
