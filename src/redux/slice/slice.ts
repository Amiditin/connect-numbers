import { createSlice } from '@reduxjs/toolkit';

import { getData } from './thunk';

import type { ISliceState } from './types';

const initialState: ISliceState = {
  data: [],
};

const sliceSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.data = [];
    });

    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(getData.rejected, (state) => {
      state.data = [];
    });
  },
});

export const { actions: sliceActions, reducer: sliceReducer } = sliceSlice;
