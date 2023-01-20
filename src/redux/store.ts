import { configureStore } from '@reduxjs/toolkit';

import { sliceReducer } from './slice';

export const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
