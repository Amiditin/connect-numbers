import type { IMatrixOptions } from '@/shared/constants';

export interface IMatrixItem {
  active: boolean;
  coordX: number;
  coordY: number;
  number: number;
  text: string;
}

export interface IGetMatrixItemsOptions {
  withLetters?: boolean;
  numberItems?: number;
  matrixOptions?: IMatrixOptions;
  lang?: 'en' | 'ru';
}

export interface IInterval {
  min: number;
  max: number;
}

export interface IIntervalOptions {
  width: IInterval;
  height: IInterval;
}
