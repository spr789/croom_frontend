import api from './api/axios';
import { ENDPOINTS } from './api/endpoints';
import { GenOutage } from '../types/genOutage';

export const fetchGenOutages = () => {
  return api.get<GenOutage[]>(ENDPOINTS.GEN_OUTAGE);
};

export const createGenOutage = (data: GenOutage) => {
  return api.post(ENDPOINTS.GEN_OUTAGE, data);
};
