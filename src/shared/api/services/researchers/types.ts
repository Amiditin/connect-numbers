import type { IModelId, IDefaultModel, TAxiosRequest } from '@/shared/api/services/types';
import type { IOrganizationModel } from '@/shared/api/models';

export interface IResearcherModel extends IDefaultModel {
  fullname: string;
  email: string;
  phone: string;
  isVerified: boolean;
  organization: IOrganizationModel;
}

export interface IResearchersService {
  findAll: TAxiosRequest<undefined, IResearcherModel[]>;

  profile: TAxiosRequest<void, IResearcherModel>;

  update: TAxiosRequest<IModelId & Partial<IResearcherModel>, undefined>;

  remove: TAxiosRequest<IModelId, undefined>;
}
