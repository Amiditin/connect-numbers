import type { IModelId, IDefaultModel, TAxiosRequest } from '@/shared/api/services/types';
import type { IPatientModel } from '@/shared/api/models';

export interface IResultModel extends IDefaultModel {
  dateStart: string;
  dateEnd: string;
  dateCompleted: string | null;
  time1: string | null;
  time2: string | null;
  time3: string | null;
  time4: string | null;
  patient: IPatientModel;
}

export type TResultCreate = Pick<IResultModel, 'dateStart' | 'dateEnd'> & {
  patient: string;
};

export type TResultUpdate = IModelId & Partial<IResultModel>;

export interface IResultsService {
  findAll: TAxiosRequest<void, IResultModel[]>;

  findById: TAxiosRequest<IModelId, IResultModel>;

  create: TAxiosRequest<TResultCreate, IResultModel>;

  update: TAxiosRequest<TResultUpdate, undefined>;

  remove: TAxiosRequest<IModelId, undefined>;
}
