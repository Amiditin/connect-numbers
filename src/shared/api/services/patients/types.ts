import type { IModelId, IDefaultModel, TAxiosRequest } from '@/shared/api/services/types';
import type { IResearcherModel, IResultModel } from '@/shared/api/models';

// eslint-disable-next-line no-shadow
export enum EGenderTypes {
  MALE = 'male',
  FEMALE = 'female',
}

// eslint-disable-next-line no-shadow
export enum EEducationTypes {
  BASIC_GENERAL = 'Основное общее',
  SECONDARY_GENERAL = 'Среднее общее',
  SECONDARY_VOCATIONAL = 'Среднее профессиональное',
  HIGHER = 'Высшее образование',
}

export interface IPatientModel extends IDefaultModel {
  fullname: string;
  email: string;
  phone: string;
  gender: EGenderTypes;
  education: EEducationTypes;
  sport: string;
  dateBirth: string;
  dateLastTest: string | null;
  researcher: IResearcherModel;
  results?: IResultModel[];
}

export type TPatientCreate = Omit<
  IPatientModel,
  keyof IDefaultModel | 'dateLastTest' | 'researcher'
> & {
  researcher: string;
};

export type TPatientUpdate = IModelId & Partial<IPatientModel>;

export interface IPatientsService {
  findAll: TAxiosRequest<void, IPatientModel[]>;

  findById: TAxiosRequest<IModelId, IPatientModel>;

  create: TAxiosRequest<TPatientCreate, IPatientModel>;

  update: TAxiosRequest<TPatientUpdate, undefined>;

  remove: TAxiosRequest<IModelId, undefined>;
}
