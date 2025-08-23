"use client";

import { create } from "zustand";
import api from "@/lib/services/api/client";
import { ENDPOINTS } from "@/lib/services/api";
import { mapMasterData } from "@/lib/utils/mapMasterData";
import { MasterData, SSConnectionsResponse } from "@/lib/types/masterData";
import { SSConnectionOption, MappedMasterData } from "@/lib/types/ui";

interface MasterDataStore {
  masterData: MasterData | null; // Raw API response
  mappedMasterData: MappedMasterData | null; // UI-ready data
  ssConnections: SSConnectionOption[]; // SS Connections mapped separately
  loading: boolean;
  error: string | null;

  fetchMasterData: () => Promise<void>;
  fetchSSConnections: () => Promise<void>;
}

export const useMasterDataStore = create<MasterDataStore>((set) => ({
  masterData: null,
  mappedMasterData: null,
  ssConnections: [],
  loading: false,
  error: null,

  /**
   * Fetch and map all master data from API
   */
  fetchMasterData: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<MasterData>(ENDPOINTS.MASTER_DATA);
      const mappedData = mapMasterData(data);

      console.log("🔍 Raw Master Data:", data);
      console.log("✅ Mapped Master Data:", mappedData);

      set({
        masterData: data,
        mappedMasterData: mappedData,
        loading: false,
      });
    } catch (err) {
      console.error("❌ Master data fetch error:", err);
      set({ error: "Failed to fetch master data", loading: false });
    }
  },

  /**
   * Fetch SS connections separately and map them for UI dropdowns
   */
  fetchSSConnections: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<SSConnectionsResponse>(ENDPOINTS.SS_CONNECTIONS);

      const mappedConnections: SSConnectionOption[] = (data.ss_connections || []).map((item) => {
        const isFeeder = item.element_type?.element_type === "Feeder";

        return {
          id: item.id,
          value: item.id,
          label: isFeeder
            ? `${item.from_ss?.name || "?"} → ${item.to_ss?.name || "-"} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`
            : `${item.from_ss?.name || "?"} ${item.element_type?.element_type || ""} (${item.voltage_level?.voltage_level || "?"}) [${item.number ?? "-"}]`,
          from_ss: item.from_ss?.id || null,
          to_ss: item.to_ss?.id || null,
          voltage_level: item.voltage_level?.id || null,
          element_type: item.element_type?.id || null,
          number: item.number || null,
        };
      });

      console.log("🔍 Raw SS Connections:", data);
      console.log("✅ Mapped SS Connections:", mappedConnections);

      set({ ssConnections: mappedConnections, loading: false });
    } catch (err) {
      console.error("❌ SS connections fetch error:", err);
      set({ error: "Failed to fetch SS connections", loading: false });
    }
  },
}));
