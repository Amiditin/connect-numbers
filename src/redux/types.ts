import { store } from './store';

import type { AxiosError } from 'axios';

export type TRootState = ReturnType<typeof store.getState>;

export type TThunkConfig = { rejectValue: AxiosError; state: TRootState };

export type TAppDispatch = typeof store.dispatch;

export type TRequestStatuses = 'init' | 'loading' | 'error' | 'success';

export type TGetFetchData<TParams, TPayload> = (
  params: Required<TParams>,
  signal?: AbortSignal,
) => Promise<TPayload>;
