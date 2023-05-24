import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Layout, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import { ConnectNumbersTest } from './ConnectNumbersTest';
import { Stopwatch } from '@/components';
import { connectNumbersTests } from '@/shared/constants';
import { useWindowSize } from '@/shared/hooks';
import { resultsService } from '@/shared/api/services/results';

import type { TTestStatus } from './types';
import type { IResultModel } from '@/shared/api/models';

import styles from './PatientTestPage.module.scss';
import dayjs from 'dayjs';
import { parseDate } from '@/shared/utils';

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
  const [result, setResult] = useState<IResultModel | null>(null);
  const [tests, setTests] = useState(connectNumbersTests);
  const [testStatus, setTestStatus] = useState<TTestStatus>('pending');
  const [matrixWidth, setMatrixWidth] = useState(0);
  const params = useParams();
  const boxRef = useRef<HTMLDivElement>(null);
  console.log(1);

  const size = useWindowSize();

  useEffect(() => {
    if (tests.every((test) => test.completed) && result) {
      resultsService.update({
        id: result.id,
        dateCompleted: dayjs().format(),
        time1: tests[0].time,
        time2: tests[1].time,
        time3: tests[2].time,
        time4: tests[3].time,
      });
    }
  }, [tests]);

  useEffect(() => {
    const getResult = async (id: string) => {
      try {
        const { data } = await resultsService.findById({ id });

        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      getResult(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (boxRef.current) {
      setMatrixWidth(boxRef.current.clientWidth);
    }
  }, [size.width]);

  const handleTestFinish = (time: string | null) => {
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

  const renderTesting = () => {
    if (!result) {
      return <Title level={2}>Некорректная ссылка</Title>;
    }

    if (result?.dateCompleted) {
      return <Title level={5}>Тестирование завершено: {parseDate(result.dateCompleted)}</Title>;
    }

    if (dayjs(result.dateStart) > dayjs() || dayjs() > dayjs(result.dateEnd)) {
      return (
        <Title level={5}>
          Дата проведения тестирования:{' '}
          {dayjs(result.dateStart).locale('ru').format('DD MMMM YYYY с HH:mm ') +
            dayjs(result.dateEnd).format('до HH:mm')}{' '}
        </Title>
      );
    }

    return (
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
          {tests.find((test) => !test.completed)?.isOptional && (
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
    );
  };

  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.content}>
        {!result ? (
          <Title level={2}>Некорректная ссылка</Title>
        ) : (
          <>
            <Title level={2}>Добрый день!</Title>
            <Text>
              <Text strong>Механика:</Text> тестирование состоит из четырех тестов: двух пробных (1,
              3) и двух зачетных (2, 4). В первом тесте необходимо соединить последовательно цифры
              от 1 до 10, кликая на них мышкой как можно быстрее, а во втором уже от 1 до 24. В
              третьем тесте соединить последовательно цифры с буквами, например 1-А-2-Б-3-..., всего
              будет 5 цифр и 5 букв. В четвертом задании то же самое, только цифр и букв по 12.
            </Text>
            <Text>
              <Text strong>Примечание:</Text> не перепутайте цифру 3 с буквой З <SmileOutlined />
            </Text>
            {renderTesting()}
          </>
        )}
      </Layout.Content>
    </Layout>
  );
};
