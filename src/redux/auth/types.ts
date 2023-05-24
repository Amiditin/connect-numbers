import type { IResearcherModel } from '@/shared/api/models';
import type { TRequestStatuses } from '@/redux/types';
import type { ILoginParams } from '@/shared/api/services/auth/types';

export interface IAuthState {
  user: null | IResearcherModel;
  status: TRequestStatuses;
}

export interface IAuthLoginParams extends ILoginParams {
  remember: boolean;
}
