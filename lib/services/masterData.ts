import api from './api/client';
import { ENDPOINTS } from './api/endpoints';
import { MasterData, SSConnectionsResponse } from '@/lib/types/masterData'; // ✅ Use unified types file

/**
 * Fetch all master data
 */
export const fetchMasterData = () => {
  return api.get<MasterData>(ENDPOINTS.MASTER_DATA);
};

/**
 * Fetch SS Connections separately
 */
export const fetchSSConnections = () => {
  return api.get<SSConnectionsResponse>(ENDPOINTS.SS_CONNECTIONS);
};
