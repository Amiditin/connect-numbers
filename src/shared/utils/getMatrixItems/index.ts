import { matrixDefaultOptions } from '@/shared/constants';
import { getRandomNumber } from '@/shared/utils';

import type { IGetMatrixItemsOptions, IInterval, IIntervalOptions, IMatrixItem } from './types';

const COF_MAX_RADIUS = 0.3;
const DISTANCE_FROM_BORDERS = 30;
const LETTERS = {
  ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split(''),
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

type TGetMatrixItems = (options: IGetMatrixItemsOptions) => IMatrixItem[];

export const getMatrixItems: TGetMatrixItems = ({
  withLetters = false,
  numberItems = 24,
  matrixOptions = matrixDefaultOptions,
  lang = 'ru',
}) => {
  const { circleRadius, height, width } = matrixOptions;
  const minDistance = circleRadius + DISTANCE_FROM_BORDERS;

  const matrixItems: IMatrixItem[] = [
    {
      active: true,
      coordX: getRandomNumber(width * COF_MAX_RADIUS, width * (1 - COF_MAX_RADIUS)),
      coordY: getRandomNumber(height * COF_MAX_RADIUS, height * (1 - COF_MAX_RADIUS)),
      number: 1,
      text: '1',
    },
  ];

  const getInterval = (coord: number, maxDistance: number): IInterval => {
    const coordMin = coord - maxDistance * COF_MAX_RADIUS;
    const coordMax = coord + maxDistance * COF_MAX_RADIUS;

    return {
      min: coordMin > minDistance ? coordMin : minDistance,
      max: coordMax < maxDistance - minDistance ? coordMax : maxDistance - minDistance,
    };
  };

  for (let i = 1; i < numberItems; i++) {
    let interval: IIntervalOptions = {
      width: getInterval(matrixItems[i - 1].coordX, width),
      height: getInterval(matrixItems[i - 1].coordY, height),
    };

    let coordX = 0;
    let coordY = 0;
    let iterations = 0;

    let isBadCoords = true;

    while (isBadCoords) {
      coordX = getRandomNumber(interval.width.min, interval.width.max);
      coordY = getRandomNumber(interval.height.min, interval.height.max);

      for (let j = 0; j < matrixItems.length; j++) {
        const distance = Math.sqrt(
          (matrixItems[j].coordX - coordX) ** 2 + (matrixItems[j].coordY - coordY) ** 2,
        );

        if (distance < circleRadius * 3) {
          break;
        }

        if (j === matrixItems.length - 1) {
          isBadCoords = false;
        }
      }

      if (isBadCoords) {
        if (++iterations > 100) {
          interval = {
            width: { min: minDistance, max: width - minDistance },
            height: { min: minDistance, max: height - minDistance },
          };
        }
        continue;
      }
    }

    let text = String(i + 1);

    if (withLetters) {
      text = i % 2 === 0 ? String(i / 2 + 1) : LETTERS[lang][Math.floor(i / 2)];
    }

    matrixItems.push({
      active: false,
      coordX,
      coordY,
      number: i + 1,
      text,
    });
  }

  return matrixItems;
};
