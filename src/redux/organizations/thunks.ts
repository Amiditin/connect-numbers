import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { organizationsName } from './slice';
import { organizationsService } from '@/shared/api/services/organizations';

import type { IOrganizationModel } from '@/shared/api/models';
import type { TThunkConfig } from '@/redux/types';
import type {
  TOrganizationCreate,
  TOrganizationUpdate,
} from '@/shared/api/services/organizations/types';

const getAllItems = async () => {
  const { data } = await organizationsService.findAll();

  return data;
};

export const organizationsThunks = {
  findAll: createAsyncThunk<IOrganizationModel[], undefined, TThunkConfig>(
    `${organizationsName}/findAll`,
    async (_, { rejectWithValue }) => {
      try {
        return await getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  create: createAsyncThunk<IOrganizationModel[], TOrganizationCreate, TThunkConfig>(
    `${organizationsName}/create`,
    async (params, { rejectWithValue }) => {
      try {
        await organizationsService.create(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  update: createAsyncThunk<IOrganizationModel[], TOrganizationUpdate, TThunkConfig>(
    `${organizationsName}/update`,
    async (params, { rejectWithValue }) => {
      try {
        await organizationsService.update(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  remove: createAsyncThunk<IOrganizationModel[], { id: string }, TThunkConfig>(
    `${organizationsName}/remove`,
    async (params, { rejectWithValue }) => {
      try {
        await organizationsService.remove(params);

        return getAllItems();
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),
};
