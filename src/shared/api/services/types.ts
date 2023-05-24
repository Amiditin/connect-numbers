import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IDefaultModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IModelId extends Pick<IDefaultModel, 'id'> {}

export type TAxiosRequest<TParams, TResponseData> = (
  params: TParams,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TResponseData>>;
