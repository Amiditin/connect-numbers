import type { TRootState } from '@/redux/types';

export const getSliceData = (store: TRootState) => {
  return store.slice.data;
};
