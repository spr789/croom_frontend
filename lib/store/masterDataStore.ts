"use client"; // must be at the top for client logs
import { create } from "zustand";
import api from "@/lib/services/api/client";
import { ENDPOINTS } from "@/lib/services/api";
import { mapMasterData } from "@/lib/utils/mapMasterData";

// Types for master data
interface MasterData {
  utilities: any[];
  voltage_levels: any[];
  circles: any[];
  element_types: any[];
  substations: any[];
  plants: any[];
  mva_capacities: any[];
  conductor_types: any[];
  gen_out_reasons: any[];
  grid_element_reasons: any[];
}

interface SSConnectionsData {
  ss_connections: any[];
}

interface MasterDataStore {
  masterData: MasterData | null;
  ssConnections: SSConnectionsData | null;
  loading: boolean;
  error: string | null;
  fetchMasterData: () => Promise<void>;
  fetchSSConnections: () => Promise<void>;
}

export const useMasterDataStore = create<MasterDataStore>((set) => ({
  masterData: null,
  ssConnections: null,
  loading: false,
  error: null,

  fetchMasterData: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<MasterData>(ENDPOINTS.MASTER_DATA);
      const mappedData = mapMasterData(data);

      console.log("🔍 Raw Master Data:", data);
      console.log("✅ Mapped Master Data:", mappedData);

      set({ masterData: mappedData, loading: false });
    } catch {
      set({ error: "Failed to fetch master data", loading: false });
    }
  },

  fetchSSConnections: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<SSConnectionsData>(ENDPOINTS.SS_CONNECTIONS);
  
      // Map ss_connections for dropdowns
      const mappedConnections = (data.ss_connections || []).map((item: any) => ({
        label: `${item.from_ss?.name} → ${item.to_ss?.name} (${item.voltage_level?.name}) [${item.number}]`,
        value: item.id,
      }));
  
      console.log("🔍 Raw SS Connections:", data);
      console.log("✅ Mapped SS Connections:", mappedConnections);
  
      set({ ssConnections: { ss_connections: mappedConnections }, loading: false });
    } catch {
      set({ error: "Failed to fetch SS connections", loading: false });
    }
  },
  
}));
