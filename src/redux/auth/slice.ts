import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IAuthState, IUser } from './types';

const initialState: IAuthState = {
  user: null,
  isAuth: false,
};

const devInitialState: IAuthState = {
  user: { email: 'dev@email.com' },
  isAuth: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: devInitialState,
  reducers: {
    loginUser: (state: IAuthState, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: authActions, reducer: authReducer } = authSlice;
