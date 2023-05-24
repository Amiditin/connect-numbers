import type { IPatientModel } from '@/shared/api/models';
import type { TRequestStatuses } from '@/redux/types';

export interface IPatientsState {
  items: IPatientModel[];
  status: TRequestStatuses;
}
