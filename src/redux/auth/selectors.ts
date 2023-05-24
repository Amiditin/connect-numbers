import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '@/redux/types';

const getAuth = (state: TRootState) => state.auth;

export const getAuthUser = createSelector(getAuth, (auth) => {
  return auth.user;
});

export const getAuthStatus = createSelector(getAuth, (auth) => {
  return auth.status;
});
