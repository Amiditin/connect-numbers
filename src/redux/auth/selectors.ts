import type { TRootState } from '@/redux/types';

export const getIsAuth = (store: TRootState) => {
  return store.auth.isAuth;
};
