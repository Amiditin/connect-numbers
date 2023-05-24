import { createSlice } from '@reduxjs/toolkit';

import { authThunks } from './thunks';

import type { IAuthState } from './types';

const initialState: IAuthState = {
  user: null,
  status: 'init',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: IAuthState) {
      state.user = null;

      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authThunks.login.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = 'success';
    });
    builder.addCase(authThunks.login.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(authThunks.profile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authThunks.profile.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = 'success';
    });
    builder.addCase(authThunks.profile.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { actions: authActions, reducer: authReducer, name: authName } = authSlice;
