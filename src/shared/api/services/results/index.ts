import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IResultsService } from './types';

const resultsRoute = apiRoutes.results.root;

export const resultsService: IResultsService = {
  findAll: async (_, config) => {
    return axios.get(resultsRoute, config);
  },
  findById: async ({ id }, config) => {
    return axios.get(`${resultsRoute}/${id}`, config);
  },
  create: async (params, config) => {
    return axios.post(resultsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return axios.patch(`${resultsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return axios.delete(`${resultsRoute}/${id}`, config);
  },
};
