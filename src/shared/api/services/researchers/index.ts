import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IResearchersService } from './types';

const researchersRoute = apiRoutes.researchers.root;

export const researchersService: IResearchersService = {
  findAll: async (_, config) => {
    return await axios.get(researchersRoute, config);
  },
  profile: async (_, config) => {
    return await axios.get(apiRoutes.researchers.profile, config);
  },
  update: async ({ id, ...params }, config) => {
    return await axios.patch(`${researchersRoute}/${id}`, params, config);
  },
  remove: async ({ id }, config) => {
    return await axios.delete(`${researchersRoute}/${id}`, config);
  },
};
