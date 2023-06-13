import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IOrganizationsService } from './types';

const organizationsRoute = apiRoutes.organizations.root;

export const organizationsService: IOrganizationsService = {
  findAll: async (_, config) => {
    return axios.get(organizationsRoute, config);
  },
  create: async (params, config) => {
    return axios.post(organizationsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return axios.patch(`${organizationsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return axios.delete(`${organizationsRoute}/${id}`, config);
  },
};
