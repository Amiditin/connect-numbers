interface IRoute {
  path: string;
  pageTitle?: string;
  getPath?: (...params: any) => string;
}

export type TRoutes = Record<string, IRoute>;

export const routes: TRoutes = {
  root: {
    path: '/',
  },
  home: {
    path: '/',
    pageTitle: 'Главная',
  },
  notFound: {
    path: '*',
    pageTitle: '404',
  },
  profile: {
    path: '/profile',
    pageTitle: 'Профиль',
  },
  patients: {
    path: '/patients',
    pageTitle: 'Пациенты',
  },
  patientProfile: {
    path: '/patients/:id',
    pageTitle: 'Профиль пациента',
    getPath: (patientId: string) => `/patients/${patientId}`,
  },

  adminRoot: {
    path: '/admin',
    pageTitle: 'Профиль',
  },
  organizations: {
    path: '/admin/organizations',
    pageTitle: 'Организации',
  },
  researchers: {
    path: '/admin/researchers',
    pageTitle: 'Исследователи',
  },

  authRoot: {
    path: '/auth',
  },
  authLogin: {
    path: '/auth/login',
    pageTitle: 'Логин',
  },
  authRegister: {
    path: '/auth/register',
    pageTitle: 'Регистрация',
  },
  authForgotPassword: {
    path: '/auth/forgot-password',
    pageTitle: 'Восстановление пароля',
  },
};
