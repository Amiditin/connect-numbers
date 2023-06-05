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

export type TOrganizationCreate = Omit<IOrganizationModel, keyof IDefaultModel>;

export type TOrganizationUpdate = IModelId & Partial<IOrganizationModel>;

export interface IOrganizationsService {
  findAll: TAxiosRequest<void, IOrganizationModel[]>;

  create: TAxiosRequest<TOrganizationCreate, IOrganizationModel>;

  update: TAxiosRequest<TOrganizationUpdate, undefined>;

  remove: TAxiosRequest<IModelId, undefined>;
}
