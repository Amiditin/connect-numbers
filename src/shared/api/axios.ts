import _axios from 'axios';
import qs from 'qs';

import { baseBackendURL } from './apiRoutes';

const token = localStorage.getItem('token');

export const axios = _axios.create({
  baseURL: baseBackendURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});
