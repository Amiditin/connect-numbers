import { LineOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, Typography } from 'antd';

import { devData, IDevDataItem } from './constants';

import type { ColumnsType } from 'antd/es/table';

import styles from './PatientsPage.module.scss';

const { Title } = Typography;

const columns: ColumnsType<IDevDataItem> = [
  {
    title: 'Фамилия Имя Отчество',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Возраст',
    dataIndex: 'dateBirth',
    key: 'dateBirth',
    render: (_, record) => {
      // Todo переписать когда будет бек
      const dateArr = record.dateBirth.split('.').map(Number);
      const dateBirth = new Date(dateArr[2], dateArr[1], dateArr[0]).getTime();
      const curDate = new Date().getTime();

      return ((curDate - dateBirth) / (24 * 3600 * 365.25 * 1000)) | 0;
    },
  },
  {
    title: 'Дата теста',
    dataIndex: 'dateLastTest',
    key: 'dateLastTest',
  },
  {
    title: 'Город',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Вид спорта',
    dataIndex: 'sport',
    key: 'sport',
  },
];

export const PatientsPage: React.FC = () => {
  return (
    <main className={styles.patients}>
      <Space className={styles.space} wrap>
        <Title className={styles.title} level={2}>
          <LineOutlined className={styles.line_icon} />
          Список пациентов
        </Title>
        <Button className={styles.btn_add} type="primary" size="large" icon={<PlusOutlined />}>
          Добавить пациента
        </Button>
      </Space>
      <Table
        dataSource={devData}
        className={styles.table}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 810 }}
      />
    </main>
  );
};
