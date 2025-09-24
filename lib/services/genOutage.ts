import api from "./api/client";
import { ENDPOINTS } from "./api/endpoints";
import type { GenOutage, GenOutageCreate, GenOutageUpdate } from "@/lib/types/genOutage";

export const genOutageService = {
  async list(): Promise<GenOutage[]> {
    const res = await api.get<GenOutage[]>(ENDPOINTS.GEN_OUTAGE);
    return res.data;
  },

  async retrieve(id: number): Promise<GenOutage> {
    const res = await api.get<GenOutage>(`${ENDPOINTS.GEN_OUTAGE}${id}/`);
    return res.data;
  },

  async create(payload: GenOutageCreate): Promise<GenOutage> {
    const res = await api.post<GenOutage>(ENDPOINTS.GEN_OUTAGE, payload);
    return res.data;
  },

  async update(id: number, payload: GenOutageUpdate): Promise<GenOutage> {
    const res = await api.put<GenOutage>(`${ENDPOINTS.GEN_OUTAGE}${id}/`, payload);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINTS.GEN_OUTAGE}${id}/`);
  },
};
