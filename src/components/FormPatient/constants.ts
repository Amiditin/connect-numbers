import dayjs from 'dayjs';

import { EEducationTypes, EGenderTypes } from '@/shared/api/services/patients/types';

export const curYear = dayjs().year();

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const typesGender = [
  { value: EGenderTypes.MALE, label: 'Мужской' },
  { value: EGenderTypes.FEMALE, label: 'Женский' },
];

export const typesEducation = [
  { value: EEducationTypes.BASIC_GENERAL, label: EEducationTypes.BASIC_GENERAL },
  {
    value: EEducationTypes.SECONDARY_GENERAL,
    label: EEducationTypes.SECONDARY_GENERAL,
  },
  {
    value: EEducationTypes.SECONDARY_VOCATIONAL,
    label: EEducationTypes.SECONDARY_VOCATIONAL,
  },
  { value: EEducationTypes.HIGHER, label: EEducationTypes.HIGHER },
];
