import type { IOrganizationModel } from '@/shared/api/models';
import type { TRequestStatuses } from '@/redux/types';

export interface IOrganizationsState {
  items: IOrganizationModel[];
  status: TRequestStatuses;
}
