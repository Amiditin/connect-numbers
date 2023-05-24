import _axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

export const axios = _axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});
