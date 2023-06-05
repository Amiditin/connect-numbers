import { createSlice } from '@reduxjs/toolkit';

import { organizationsThunks } from './thunks';

import type { IOrganizationsState } from './types';

const initialState: IOrganizationsState = {
  items: [],
  status: 'init',
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(organizationsThunks.findAll.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(organizationsThunks.findAll.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(organizationsThunks.findAll.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(organizationsThunks.create.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(organizationsThunks.create.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(organizationsThunks.create.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(organizationsThunks.update.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(organizationsThunks.update.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(organizationsThunks.update.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(organizationsThunks.remove.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(organizationsThunks.remove.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(organizationsThunks.remove.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const {
  actions: organizationsActions,
  reducer: organizationsReducer,
  name: organizationsName,
} = organizationsSlice;
