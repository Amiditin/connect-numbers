import { axios } from '@/services/axios';
import { apiRoutes } from '@/services/apiRoutes';

export const getDataRequest = () => {
  return axios.get(apiRoutes.data);
};
