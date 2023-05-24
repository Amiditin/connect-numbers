import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IResultsService } from './types';

const resultsRoute = apiRoutes.results.root;

export const resultsService: IResultsService = {
  findAll: async (_, config) => {
    return await axios.get(resultsRoute, config);
  },
  findById: async ({ id }, config) => {
    return await axios.get(`${resultsRoute}/${id}`, config);
  },
  create: async (params, config) => {
    return await axios.post(resultsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return await axios.patch(`${resultsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return await axios.delete(`${resultsRoute}/${id}`, config);
  },
};
