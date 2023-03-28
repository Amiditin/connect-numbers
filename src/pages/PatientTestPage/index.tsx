import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Layout, Typography } from 'antd';
import clsx from 'clsx';

import { ConnectNumbersTest } from './ConnectNumbersTest';
import { connectNumbersTests } from '@/shared/constants';
import { useWindowSize } from '@/shared/hooks';

import type { TTestStatus } from './types';

import styles from './PatientTestPage.module.scss';
import { Stopwatch } from '@/components';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const getStopwatchStatus = (testStatus: TTestStatus) => {
  if (testStatus === 'pending') {
    return 'paused';
  }
  if (testStatus === 'started') {
    return 'started';
  }

  return 'stopped';
};

export const PatientTestPage: React.FC = () => {
  const params = useParams();
  const [tests, setTests] = useState(connectNumbersTests);
  const [testStatus, setTestStatus] = useState<TTestStatus>('pending');
  const [matrixWidth, setMatrixWidth] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  useEffect(() => {
    if (boxRef.current) {
      setMatrixWidth(boxRef.current.clientWidth);
    }
  }, [size.width]);

  const handleTestFinish = (time: number | null) => {
    const completedTest = tests.find((test) => !test.completed);

    if (!completedTest) {
      return;
    }

    setTests(
      tests.map((test) =>
        test.number === completedTest.number ? { ...completedTest, completed: true, time } : test,
      ),
    );
  };

  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.content}>
        <Title level={2}>Добрый день!</Title>
        <Text>
          <Text strong>Механика тестирования:</Text> в первом тесте необходимо соединить
          последовательно цифры от 1 до 10, кликая на них мышкой как можно быстрее, а во втором от 1
          до 24. В третьем тесте соединить последовательно цифры с буквами, например 1-А-2-Б-3-...,
          всего будет 5 цифр и 5 букв. В четвертом задании то же самое, только цифр и букв по 12.
          Первый и третий тесты опциональные и не влияют на результаты.
        </Text>
        <Text>
          <Text strong>Примечание:</Text> не перепутайте цифру 3 с буквой З <SmileOutlined />
        </Text>
        <div className={styles.box} ref={boxRef}>
          <div className={styles.box_menu}>
            <ul className={styles.tabs}>
              {tests.map((test) => (
                <li
                  className={clsx(
                    styles.tab,
                    test.completed && styles.tab_completed,
                    tests.find((test) => !test.completed)?.number === test.number &&
                      styles.tab_current,
                  )}
                  key={test.number}>
                  {size.width > 460 && 'Тест'} {test.number}
                </li>
              ))}
            </ul>
            <span className={styles.timer}>
              Время:{' '}
              <Stopwatch
                interval={100}
                status={getStopwatchStatus(testStatus)}
                getTime={handleTestFinish}
              />{' '}
              сек.
            </span>
          </div>
          <ConnectNumbersTest
            matrixWidth={matrixWidth}
            setTestStatus={setTestStatus}
            test={tests.find((test) => test.completed === false) || tests[0]}
            testStatus={testStatus}
          />
          <ul className={clsx(styles.results, testStatus !== 'started' && styles.display)}>
            {tests.find((test) => !test.completed) && (
              <Button
                className={clsx(styles.btn_start, testStatus !== 'started' && styles.display)}
                type="primary"
                size="large"
                onClick={() => setTestStatus('started')}>
                Начать тест {tests.find((test) => test.completed === false)?.number}
              </Button>
            )}
            {(tests.find((test) => !test.completed)?.number === 1 ||
              tests.find((test) => !test.completed)?.number === 3) && (
              <Button
                className={clsx(styles.btn_start, testStatus !== 'started' && styles.display)}
                size="large"
                onClick={() => handleTestFinish(null)}>
                Пропустить
              </Button>
            )}
            {tests.map(
              (test) =>
                test.completed && (
                  <li className={styles.result} key={test.number}>
                    <span>Тест {test.number}.</span>
                    {test.time ? <span>Время: {test.time} сек.</span> : <span>Не пройден</span>}
                  </li>
                ),
            )}
          </ul>
        </div>
      </Layout.Content>
    </Layout>
  );
};
