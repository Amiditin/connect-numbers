import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IResearchersService } from './types';

const researchersRoute = apiRoutes.researchers.root;

export const researchersService: IResearchersService = {
  findAll: async (_, config) => {
    return axios.get(researchersRoute, config);
  },
  profile: async (_, config) => {
    return axios.get(apiRoutes.researchers.profile, config);
  },
  update: async ({ id, ...params }, config) => {
    return axios.patch(`${researchersRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return axios.delete(`${researchersRoute}/${id}`, config);
  },
};
