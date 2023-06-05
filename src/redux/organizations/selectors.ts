import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '@/redux/types';

const getOrganizations = (state: TRootState) => state.organizations;

export const getOrganizationsItems = createSelector(getOrganizations, (organizations) => {
  return organizations.items;
});

export const getOrganizationsStatus = createSelector(getOrganizations, (organizations) => {
  return organizations.status;
});
