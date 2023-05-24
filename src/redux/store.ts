import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { patientsReducer } from './patients';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
