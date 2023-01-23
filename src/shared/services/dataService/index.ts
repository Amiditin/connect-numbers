import { axios } from '@/shared/services/axios';
import { apiRoutes } from '@/shared/services/apiRoutes';

export const getDataRequest = () => {
  return axios.get(apiRoutes.data);
};
