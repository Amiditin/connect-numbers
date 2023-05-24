import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IPatientsService } from './types';

const patientsRoute = apiRoutes.patients.root;

export const patientsService: IPatientsService = {
  findAll: async (_, config) => {
    return await axios.get(patientsRoute, config);
  },
  findById: async ({ id }, config) => {
    return await axios.get(`${patientsRoute}/${id}`, config);
  },
  create: async (params, config) => {
    return await axios.post(patientsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return await axios.patch(`${patientsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return await axios.delete(`${patientsRoute}/${id}`, config);
  },
};
