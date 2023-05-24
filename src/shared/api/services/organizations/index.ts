import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IOrganizationsService } from './types';

const organizationsRoute = apiRoutes.organizations.root;

export const organizationsService: IOrganizationsService = {
  findAll: async (_, config) => {
    return await axios.get(organizationsRoute, config);
  },
  create: async (params, config) => {
    return await axios.post(organizationsRoute, params, config);
  },
  update: async ({ id, ...params }, config) => {
    return await axios.patch(`${organizationsRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return await axios.delete(`${organizationsRoute}/${id}`, config);
  },
};
