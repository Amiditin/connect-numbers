import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { patientsReducer } from './patients';
import { organizationsReducer } from './organizations';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    organizations: organizationsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
