import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '@/redux/types';

const getPatients = (state: TRootState) => state.patients;

export const getPatientsItems = createSelector(getPatients, (patients) => {
  return patients.items;
});

export const getPatientsStatus = createSelector(getPatients, (patients) => {
  return patients.status;
});
