export const baseBackendURL = import.meta.env.PROD
  ? 'http://62.112.115.55:3001/'
  : 'http://localhost:3001/';

export const apiRoutes = {
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/cases/register',
  },
  organizations: {
    root: '/organizations',
  },
  researchers: {
    root: '/researchers',
    profile: '/researchers/profile',
  },
  patients: {
    root: '/patients',
  },
  results: {
    root: '/results',
  },
};
