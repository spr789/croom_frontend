import api from './api/client';
import { ENDPOINTS } from './api/endpoints';
import type { Tripping } from '../types/tripping';

interface FetchTrippingsParams {
  [key: string]: any; // optional query params
}

export const fetchTrippings = async (params?: FetchTrippingsParams): Promise<Tripping[]> => {
  console.log(`[TrippingService] Fetching trippings from ${ENDPOINTS.TRIPPING}...`);
  if (params) console.log('[TrippingService] Request params:', params);

  try {
    const { data } = await api.get<Tripping[]>(ENDPOINTS.TRIPPING, { params });
    console.log(`[TrippingService] Successfully fetched ${data.length} trippings.`);
    console.log('[TrippingService] Response payload:', data);
    return data;
  } catch (error: any) {
    console.error('[TrippingService] Failed to fetch trippings:', error);
    throw error;
  }
};


export const createTripping = async (data: Omit<Tripping, 'id'>): Promise<Tripping> => {
  const { data: created } = await api.post<Tripping>(ENDPOINTS.TRIPPING, data);
  return created;
};
