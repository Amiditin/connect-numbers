import type { IDefaultModel, TAxiosRequest } from '@/shared/api/services/types';
import type { IResearcherModel } from '@/shared/api/models';

export interface IToken {
  token: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams
  extends Omit<IResearcherModel, keyof IDefaultModel | 'organization'> {
  organization: string;
}

export interface IAuthService {
  login: TAxiosRequest<ILoginParams, IToken>;

  register: TAxiosRequest<IRegisterParams, IToken>;
}
