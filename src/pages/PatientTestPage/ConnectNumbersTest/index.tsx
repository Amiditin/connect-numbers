import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import { getMatrixItems } from '@/shared/utils';
import { matrixDefaultOptions } from '@/shared/constants';

import type { IConnectNumbersTest, IMatrixOptions } from '@/shared/constants';
import type { IMatrixItem } from '@/shared/utils/getMatrixItems/types';
import type { TTestStatus } from '../types';

import styles from './ConnectNumbersTest.module.scss';

interface IConnectNumbersTestProps {
  matrixWidth: number;
  setTestStatus: React.Dispatch<React.SetStateAction<TTestStatus>>;
  test: IConnectNumbersTest;
  testStatus: TTestStatus;
}

export const ConnectNumbersTest: React.FC<IConnectNumbersTestProps> = ({
  matrixWidth,
  setTestStatus,
  test,
  testStatus,
}) => {
  const [matrixItems, setMatrixItems] = useState<IMatrixItem[]>([]);
  const { width, height, circleRadius }: IMatrixOptions = useMemo(
    () => ({
      width: matrixWidth,
      height: Math.round((matrixDefaultOptions.height * matrixWidth) / matrixDefaultOptions.width),
      circleRadius: Math.round(
        (matrixDefaultOptions.circleRadius * matrixWidth) / matrixDefaultOptions.width,
      ),
    }),
    [matrixWidth],
  );

  useEffect(() => {
    setMatrixItems(
      getMatrixItems(test).map((item) => ({
        coordX: Math.round((item.coordX * width) / matrixDefaultOptions.width) - circleRadius,
        coordY: Math.round((item.coordY * height) / matrixDefaultOptions.height) - circleRadius,
        active: item.active,
        number: item.number,
        text: item.text,
      })),
    );
  }, [width, height, circleRadius, test]);

  const getItemByNumber = (number: number): IMatrixItem => {
    return matrixItems.find((item) => item.number === number) || matrixItems[0];
  };

  const handleClickMatrixItem = (number: number) => {
    if (!getItemByNumber(number - 1).active) {
      return;
    }

    const newMatrixItems = matrixItems.map((item) =>
      item.number === number ? { ...item, active: true } : item,
    );

    setMatrixItems(newMatrixItems);

    if (newMatrixItems[matrixItems.length - 1].active) {
      setTestStatus('finished');
    }
  };

  return (
    <svg
      className={styles.test}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      {testStatus === 'started' &&
        matrixItems.map((item) => (
          <g key={item.number}>
            {item.number !== matrixItems[matrixItems.length - 1].number && (
              <line
                className={clsx(
                  styles.line,
                  getItemByNumber(item.number + 1).active && styles.line_active,
                )}
                x1={item.coordX + circleRadius}
                y1={item.coordY + circleRadius}
                x2={getItemByNumber(item.number + 1).coordX + circleRadius}
                y2={getItemByNumber(item.number + 1).coordY + circleRadius}
              />
            )}
            <g
              className={clsx(styles.item, item.active && styles.item_active)}
              transform={`matrix(1,0,0,1,${item.coordX},${item.coordY})`}
              onClick={() => handleClickMatrixItem(item.number)}>
              <circle
                className={styles.circle}
                r={circleRadius}
                cx={circleRadius}
                cy={circleRadius}
              />
              <text
                dx={circleRadius}
                dy={circleRadius * 1.25}
                className={styles.text}
                style={{ fontSize: (circleRadius / 4) * 3 }}>
                {item.text}
              </text>
            </g>
          </g>
        ))}
    </svg>
  );
};
