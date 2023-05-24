import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { patientsName } from './slice';
import { patientsService } from '@/shared/api/services/patients';

import type { IPatientModel } from '@/shared/api/models';
import type { TThunkConfig } from '@/redux/types';
import type { TPatientCreate, TPatientUpdate } from '@/shared/api/services/patients/types';

const getAllItems = async () => {
  const { data } = await patientsService.findAll();

  return data;
};

export const patientsThunks = {
  findAll: createAsyncThunk<IPatientModel[], undefined, TThunkConfig>(
    `${patientsName}/findAll`,
    async (_, { rejectWithValue }) => {
      try {
        return await getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  create: createAsyncThunk<IPatientModel[], TPatientCreate, TThunkConfig>(
    `${patientsName}/create`,
    async (params, { rejectWithValue }) => {
      try {
        await patientsService.create(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  update: createAsyncThunk<IPatientModel[], TPatientUpdate, TThunkConfig>(
    `${patientsName}/update`,
    async (params, { rejectWithValue }) => {
      try {
        await patientsService.update(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  remove: createAsyncThunk<IPatientModel[], { id: string }, TThunkConfig>(
    `${patientsName}/remove`,
    async (params, { rejectWithValue }) => {
      try {
        await patientsService.remove(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),
};
