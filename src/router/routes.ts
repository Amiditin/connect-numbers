interface IRoute {
  path: string;
  pageTitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath?: (...params: any[]) => string;
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

  testRoot: {
    path: '/test',
    pageTitle: 'Тест',
  },

  testPatient: {
    path: '/test/:id',
    pageTitle: 'Тест пациента',
    getPath: (patientId: string) => `/test/${patientId}`,
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
    pageTitle: 'Админка',
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
