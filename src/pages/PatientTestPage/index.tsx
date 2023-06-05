import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Layout, Radio, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { ConnectNumbersTest } from './ConnectNumbersTest';
import { Stopwatch } from '@/components';
import { connectNumbersTests } from '@/shared/constants';
import { useWindowSize } from '@/shared/hooks';
import { resultsService } from '@/shared/api/services/results';
import { parseDate } from '@/shared/utils';
import { patientsService } from '@/shared/api/services/patients';
import { language } from './constants';

import type { TTestStatus } from './types';
import type { IResultModel } from '@/shared/api/models';

import styles from './PatientTestPage.module.scss';

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
  const [lang, setLang] = useState(language.ru);
  const [result, setResult] = useState<IResultModel | null>(null);
  const [tests, setTests] = useState(connectNumbersTests);
  const [testStatus, setTestStatus] = useState<TTestStatus>('pending');
  const [matrixWidth, setMatrixWidth] = useState(850);
  const params = useParams();
  const boxRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  useEffect(() => {
    if (tests.every((test) => test.completed) && result) {
      try {
        resultsService.update({
          id: result.id,
          dateCompleted: dayjs().format(),
          time1: tests[0].time?.replace('.', ':'),
          time2: tests[1].time?.replace('.', ':'),
          time3: tests[2].time?.replace('.', ':'),
          time4: tests[3].time?.replace('.', ':'),
        });
        patientsService.update({ id: result.patient.id, dateLastTest: dayjs().format() });
      } catch (error) {
        console.log(error);
      }
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
  }, [size.width, boxRef]);

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
      return <Title level={2}>{lang.invalidUrl}</Title>;
    }

    if (result?.dateCompleted) {
      return (
        <Title level={5}>
          {lang.testFinished}: {parseDate(result.dateCompleted)}
        </Title>
      );
    }

    if (dayjs(result.dateStart) > dayjs() || dayjs() > dayjs(result.dateEnd)) {
      return (
        <Title level={5}>
          {lang.testDate}:{' '}
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
                {size.width > 460 && lang.testName} {test.number}
              </li>
            ))}
          </ul>
          <span className={styles.timer}>
            {lang.time}:{' '}
            <Stopwatch
              interval={100}
              status={getStopwatchStatus(testStatus)}
              getTime={handleTestFinish}
            />{' '}
            {lang.timeSec}.
          </span>
        </div>
        {matrixWidth !== 0 && (
          <ConnectNumbersTest
            matrixWidth={matrixWidth}
            setTestStatus={setTestStatus}
            test={tests.find((test) => test.completed === false) || tests[0]}
            testStatus={testStatus}
            lang={lang.name}
          />
        )}
        <ul className={clsx(styles.results, testStatus !== 'started' && styles.display)}>
          {tests.find((test) => !test.completed) && (
            <Button
              className={clsx(styles.btn_start, testStatus !== 'started' && styles.display)}
              type="primary"
              size="large"
              onClick={() => {
                if (boxRef.current) {
                  setMatrixWidth(boxRef.current.clientWidth);
                }
                setTestStatus('started');
              }}>
              {lang.startTest} {tests.find((test) => test.completed === false)?.number}
            </Button>
          )}
          {tests.find((test) => !test.completed)?.isOptional && (
            <Button
              className={clsx(styles.btn_start, testStatus !== 'started' && styles.display)}
              size="large"
              onClick={() => handleTestFinish(null)}>
              {lang.skip}
            </Button>
          )}
          {tests.map(
            (test) =>
              test.completed && (
                <li className={styles.result} key={test.number}>
                  <span>
                    {lang.testName} {test.number}.
                  </span>
                  {test.time ? (
                    <span>
                      {lang.time}: {test.time} {lang.timeSec}.
                    </span>
                  ) : (
                    <span>{lang.notPassed}</span>
                  )}
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
        <Radio.Group
          className={styles.radio_lang}
          buttonStyle="solid"
          optionType="button"
          defaultValue="ru"
          options={[
            { label: 'RU', value: 'ru' },
            { label: 'EN', value: 'en' },
          ]}
          onChange={(_value) => {
            const value = _value.target.value as unknown;

            if (value === 'ru' || value === 'en') {
              setLang(language[value]);
            }
          }}
        />
        {!result ? (
          <Title className={styles.title} level={2}>
            {lang.invalidUrl}
          </Title>
        ) : (
          <>
            <Title className={styles.title} level={2}>
              {lang.greeting}
            </Title>
            <Text>
              <Text strong>{lang.mechanics}:</Text>
              {lang.mechanicsDesc}
            </Text>
            {lang.note && (
              <Text>
                <Text strong>Примечание:</Text> не перепутайте цифру 3 с буквой З <SmileOutlined />
              </Text>
            )}
            {renderTesting()}
          </>
        )}
      </Layout.Content>
    </Layout>
  );
};
