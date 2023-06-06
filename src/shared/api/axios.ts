import _axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

export const axios = _axios.create({
  baseURL: import.meta.env.PROD ? 'http://62.112.115.55:3001/' : 'http://localhost:3001/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});
