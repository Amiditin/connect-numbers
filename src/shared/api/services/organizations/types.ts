import type { IModelId, IDefaultModel, TAxiosRequest } from '@/shared/api/services/types';

export interface IOrganizationModel extends IDefaultModel {
  name: string;
  abbreviation: string | null;
  email: string;
  phone: string;
  contact: string;
  address: string | null;
  website: string | null;
}

export interface IOrganizationsService {
  findAll: TAxiosRequest<void, IOrganizationModel[]>;

  create: TAxiosRequest<Omit<IOrganizationModel, keyof IDefaultModel>, IOrganizationModel>;

  update: TAxiosRequest<IModelId & Partial<IOrganizationModel>, undefined>;

  remove: TAxiosRequest<IModelId, undefined>;
}
