import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authService, researchersService } from '@/shared/api/services';
import { axios } from '@/shared/api/axios';

import { authName } from './slice';

import type { IResearcherModel } from '@/shared/api/models';
import type { TThunkConfig } from '@/redux/types';
import type { IAuthLoginParams } from './types';
import type { IRegisterParams } from '@/shared/api/services/auth/types';

export const authThunks = {
  login: createAsyncThunk<IResearcherModel, IAuthLoginParams, TThunkConfig>(
    `${authName}/login`,
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await authService.login(params);

        if (params.remember) {
          localStorage.setItem('token', data.token);
        }

        axios.interceptors.request.use((config) => ({
          ...config,
          headers: { Authorization: `Bearer ${data.token}` },
        }));

        const res = await researchersService.profile();

        return res.data;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  profile: createAsyncThunk<IResearcherModel, undefined, TThunkConfig>(
    `${authName}/profile`,
    async (_, { rejectWithValue }) => {
      try {
        const res = await researchersService.profile();

        return res.data;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),

  register: createAsyncThunk<IResearcherModel, IRegisterParams, TThunkConfig>(
    `${authName}/login`,
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await authService.register(params);

        const res = await researchersService.profile(undefined, {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        return res.data;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
  ),
};
