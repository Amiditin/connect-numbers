import {
  DeleteOutlined,
  EditOutlined,
  ExperimentOutlined,
  LineOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, type MenuProps, Space, Table, Typography, Popconfirm } from 'antd';

import React, { useState } from 'react';
import { devData, IDevDataItem } from './constants';

import type { ColumnsType } from 'antd/es/table';

import styles from './PatientsPage.module.scss';
import { ModalAddPatient, ModalOrderTest } from '@/components';

const { Title } = Typography;

export const PatientsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOrderTestOpen, setIsModalOrderTestOpen] = useState(false);
  const actions: MenuProps['items'] = [
    {
      key: '1',
      label: <>Назначить тест</>,
      icon: <ExperimentOutlined />,
      onClick: () => setIsModalOrderTestOpen(true),
    },
    {
      key: '2',
      label: <>Редактировать</>,
      icon: <EditOutlined />,
    },
    {
      key: '3',
      danger: true,
      label: (
        <Popconfirm
          title="Удалить пациента"
          description="Вы уверены, что хотите удалить эту запись?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
          Удалить
        </Popconfirm>
      ),
      icon: <DeleteOutlined />,
    },
  ];
  const columns: ColumnsType<IDevDataItem> = [
    {
      title: 'Фамилия Имя Отчество',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '300px',
    },
    {
      title: 'Возраст',
      dataIndex: 'dateBirth',
      key: 'dateBirth',
      width: '120px',
      sorter: true,
      render: (_, record) => {
        // Todo переписать когда будет бек
        const dateArr = record.dateBirth.split('.').map(Number);
        const dateBirth = new Date(dateArr[2], dateArr[1], dateArr[0]).getTime();
        const curDate = new Date().getTime();

        return ((curDate - dateBirth) / (24 * 3600 * 365.25 * 1000)) | 0;
      },
    },
    {
      title: 'Последний тест',
      dataIndex: 'dateLastTest',
      width: '170px',
      key: 'dateLastTest',
    },
    {
      title: 'Вид спорта',
      dataIndex: 'sport',
      key: 'sport',
      width: '250px',
    },
    {
      className: styles.actions,
      key: 'more',
      width: '66px',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown menu={{ items: actions }}>
          <MoreOutlined className={styles.more_icon} rotate={90} />
        </Dropdown>
      ),
    },
  ];

  const handleOk = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrderTestOk = (values: any) => {
    console.log(values);
    setIsModalOrderTestOpen(false);
  };

  const handleOrderTestCancel = () => {
    setIsModalOrderTestOpen(false);
  };

  return (
    <main className={styles.patients}>
      <Space className={styles.space} wrap>
        <Title className={styles.title} level={2}>
          <LineOutlined className={styles.line_icon} />
          Список пациентов
        </Title>
        <Button
          className={styles.btn_add}
          onClick={() => setIsModalOpen(true)}
          type="primary"
          size="large"
          icon={<PlusOutlined />}>
          Добавить пациента
        </Button>
      </Space>
      <Table
        className={styles.table}
        dataSource={devData}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 740, y: 670 }}
      />
      <ModalAddPatient isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      <ModalOrderTest
        isModalOpen={isModalOrderTestOpen}
        handleOk={handleOrderTestOk}
        handleCancel={handleOrderTestCancel}
      />
    </main>
  );
};
