// /lib/services/trippingService.ts

import api from './api/client';
import { ENDPOINTS } from './api/endpoints';
import type { Tripping, TrippingCreate } from '../types/tripping';




// ✅ Fetch existing trippings
export const fetchTrippings = async (params?: Record<string, any>): Promise<Tripping[]> => {
  console.log(`[TrippingService] Fetching trippings from ${ENDPOINTS.TRIPPING}...`);
  if (params) console.log('[TrippingService] Request params:', params);

  try {
    const { data } = await api.get<Tripping[]>(ENDPOINTS.TRIPPING, { params });
    return data;
  } catch (error: any) {
    console.error('[TrippingService] Failed to fetch trippings:', error);
    throw error;
  }
};

// ✅ Create new tripping
export const createTripping = async (data: TrippingCreate): Promise<Tripping> => {
  const { data: created } = await api.post<Tripping>(ENDPOINTS.TRIPPING, data);
  return created;
};
