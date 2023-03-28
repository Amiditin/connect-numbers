import type { TRootState } from '@/redux/types';

export const getAuth = (store: TRootState) => {
  return store.auth;
};

export const getIsAuth = (store: TRootState) => {
  return store.auth.isAuth;
};
