import { createSlice } from '@reduxjs/toolkit';

import { patientsThunks } from './thunks';

import type { IPatientsState } from './types';

const initialState: IPatientsState = {
  items: [],
  status: 'init',
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(patientsThunks.findAll.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(patientsThunks.findAll.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(patientsThunks.findAll.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(patientsThunks.create.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(patientsThunks.create.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(patientsThunks.create.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(patientsThunks.update.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(patientsThunks.update.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(patientsThunks.update.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(patientsThunks.remove.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(patientsThunks.remove.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    });
    builder.addCase(patientsThunks.remove.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const {
  actions: patientsActions,
  reducer: patientsReducer,
  name: patientsName,
} = patientsSlice;
