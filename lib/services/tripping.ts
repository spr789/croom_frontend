import api from './api/axios';
import { ENDPOINTS } from './api/endpoints';
import { Tripping } from '../types/tripping';

export const fetchTrippings = () => {
  return api.get<Tripping[]>(ENDPOINTS.TRIPPING);
};

export const createTripping = (data: Tripping) => {
  return api.post(ENDPOINTS.TRIPPING, data);
};
