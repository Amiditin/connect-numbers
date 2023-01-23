import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getDataRequest } from '@/shared/services/dataService';

export const getData = createAsyncThunk<any[]>('slice/getData', async () => {
  try {
    const { data } = await getDataRequest();

    return data;
  } catch (error) {
    return error as AxiosError;
  }
});
