import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IAuthService } from './types';

export const authService: IAuthService = {
  login: async (params, config) => {
    return await axios.post(apiRoutes.auth.login, params, config);
  },

  register: async (params, config) => {
    return await axios.post(apiRoutes.auth.login, params, config);
  },
};
