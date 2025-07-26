import api from './api/axios';
import { ENDPOINTS } from './api/endpoints';
import {
  Utility,
  VoltageLevel,
  Circle,
  ElementType,
  Substation,
  Plant,
  MVACapacity,
  ConductorType,
  GenOutReason,
  GridElementReason,
  SSConnection,
} from '../types/masterData';

export const fetchMasterData = () => {
  return api.get<{
    utilities: Utility[];
    voltage_levels: VoltageLevel[];
    circles: Circle[];
    element_types: ElementType[];
    substations: Substation[];
    plants: Plant[];
    mva_capacities: MVACapacity[];
    conductor_types: ConductorType[];
    gen_out_reasons: GenOutReason[];
    grid_element_reasons: GridElementReason[];
  }>(ENDPOINTS.MASTER_DATA);
};

export const fetchSSConnections = () => {
  return api.get<{ ss_connections: SSConnection[] }>(ENDPOINTS.SS_CONNECTIONS);
};
