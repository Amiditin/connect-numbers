import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IPatientsService } from './types';

const patientsRoute = apiRoutes.patients.root;

export const patientsService: IPatientsService = {
  findAll: async (_, config) => {
    return axios.get(patientsRoute, config);
  },
  findById: async ({ id }, config) => {
    return axios.get(`${patientsRoute}/${id}`, config);
  },
  create: async (params, config) => {
    return axios.post(patientsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return axios.patch(`${patientsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return axios.delete(`${patientsRoute}/${id}`, config);
  },
};
