import { useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';
import { ExperimentOutlined, LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { ModalAssignTesting } from '@/components';
import { routes } from '@/router';

import type { IPatientModel, IResultModel } from '@/shared/api/models';
import type { ColumnsType } from 'antd/es/table';

import styles from '../PatientProfilePage.module.scss';
import { DeleteResult } from './DeleteResult';

const sortByTime = (time1: string | null, time2: string | null) => {
  const t1 = time1?.split(':').map((v) => +v) || [0, 0];
  const t2 = time2?.split(':').map((v) => +v) || [0, 0];

  return t1[0] * 60 + t1[1] < t2[0] * 60 + t2[1] ? 1 : -1;
};

const getSumTime = (time1: string | null, time2: string | null) => {
  const t1 = (time1 || '0:00').split(':').map((v) => +v);
  const t2 = (time2 || '0:00').split(':').map((v) => +v);

  const sum = (t1[0] + t2[0]) * 60 + t1[1] + t2[1];

  const min = Math.floor(sum / 60);
  const sec = sum % 60;

  return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
};

const { Title, Paragraph } = Typography;

console.log(dayjs('2023-05-22T16:00:00.000Z').format());

// "2023-05-22T16:00:00.000Z"
const columns: ColumnsType<IResultModel> = [
  {
    title: 'Дата начала - конца',
    key: 'dateStartEnd',
    width: '260px',
    render: (_, record) => (
      <div className={styles.date_start_end}>
        {dayjs(record.dateStart).locale('ru').format('DD MMMM YYYY с HH:mm ') +
          dayjs(record.dateEnd).format('до HH:mm')}
        <Paragraph
          copyable={{
            text: `http://localhost:3000/test/${record.id}`,
            icon: [
              <LinkOutlined key="copy-icon" />,
              <LinkOutlined key="copied-icon" style={{ color: 'blue' }} />,
            ],
            tooltips: ['Скопировать ссылку', 'Скопировано!'],
          }}
        />
        <DeleteResult resultId={record.id} />
      </div>
    ),
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

interface ISectionTableProps {
  patient: IPatientModel;
}

export const SectionTable: React.FC<ISectionTableProps> = ({ patient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  console.log(patient);

  return (
    <section>
      <div className={styles.title_box}>
        <Title level={3}>Список назначенных тестов:</Title>
        <Button
          className={styles.btn}
          type="primary"
          icon={<ExperimentOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Назначить тестирование
        </Button>
      </div>
      <Table
        className={styles.table}
        dataSource={patient.results}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 640, y: 570 }}
      />
      <ModalAssignTesting
        patientId={patient.id}
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSuccessAssign={() => {
          setIsModalOpen(false);

          if (routes.patientProfile.getPath) {
            navigate(routes.patientProfile.getPath(patient.id));
          }
        }}
      />
    </section>
  );
};
