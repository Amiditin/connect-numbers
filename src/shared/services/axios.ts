import _axios from 'axios';

export const axios = _axios.create({
  // ! необходимо подставить baseURL от backend
  baseURL: 'http://localhost:3001/',
});
