import { createSlice } from '@reduxjs/toolkit';

import type { ITemplateNameState } from './types';

const initialState: ITemplateNameState = {};

const templateNameSlice = createSlice({
  name: 'templateName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const { actions: templateNameActions, reducer: templateNameReducer } = templateNameSlice;
