import { Button, Table, Typography } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { devDataResult, type IDevDataResult } from '../constants';

import type { ColumnsType } from 'antd/es/table';

import styles from '../PatientProfilePage.module.scss';

const sortByTime = (time1: string | null, time2: string | null) => {
  const t1 = time1?.split(':').map((v) => +v) || [0, 0];
  const t2 = time2?.split(':').map((v) => +v) || [0, 0];

  return t1[0] * 60 + t1[1] < t2[0] * 60 + t2[1] ? 1 : -1;
};

const getSumTime = (time1: string, time2: string) => {
  const t1 = time1.split(':').map((v) => +v);
  const t2 = time2.split(':').map((v) => +v);

  const sum = (t1[0] + t2[0]) * 60 + t1[1] + t2[1];

  const min = Math.floor(sum / 60);
  const sec = sum % 60;

  return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
};

const { Title } = Typography;

const columns: ColumnsType<IDevDataResult> = [
  {
    title: 'Дата начала - конца',
    key: 'dateStartEnd',
    width: '260px',
    render: (_, record) =>
      dayjs(record.dateStart).locale('ru').format('DD MMMM YYYY с HH:mm ') +
      dayjs(record.dateEnd).format('до HH:mm'),
  },
  {
    title: 'Затраченное время (мм:сс)',
    children: [
      {
        title: 'Тест 1',
        dataIndex: 'time1',
        key: 'time1',
        width: '80px',
        align: 'center',
        sorter: (a, b) => sortByTime(a.time1, b.time1),
        render: (time) => time || '—',
      },
      {
        title: 'Тест 2',
        dataIndex: 'time2',
        key: 'time2',
        width: '80px',
        align: 'center',
        sorter: (a, b) => sortByTime(a.time2, b.time2),
        render: (time) => time || '—',
      },
      {
        title: 'Тест 3',
        dataIndex: 'time3',
        key: 'time3',
        width: '80px',
        align: 'center',
        sorter: (a, b) => sortByTime(a.time3, b.time3),
        render: (time) => time || '—',
      },
      {
        title: 'Тест 4',
        dataIndex: 'time4',
        key: 'time4',
        width: '80px',
        align: 'center',
        sorter: (a, b) => sortByTime(a.time4, b.time4),
        render: (time) => time || '—',
      },
      {
        title: 'Общее 2 и 4',
        key: 'time2and4',
        width: '100px',
        align: 'center',
        sorter: (a, b) => sortByTime(getSumTime(a.time2, a.time4), getSumTime(b.time2, b.time4)),
        render: (_, record) => getSumTime(record.time2, record.time4),
      },
    ],
  },
];

export const SectionTable: React.FC = () => {
  return (
    <section>
      <div className={styles.title_box}>
        <Title level={3}>Список назначенных тестов:</Title>
        <Button className={styles.btn} type="primary" icon={<ExperimentOutlined />}>
          Назначить тестирование
        </Button>
      </div>
      <Table
        className={styles.table}
        dataSource={devDataResult}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 640, y: 570 }}
      />
    </section>
  );
};
