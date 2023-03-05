import { useRef, useState } from 'react';
import { Button, Dropdown, Space, Table, Typography, Popconfirm, Input, DatePicker } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExperimentOutlined,
  LineOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { ModalAddPatient } from '@/components';
import { typesSports } from '@/shared/constants/typesSports';
import { devData, type IDevDataItem } from './constants';
import { calculateAge, parseDate } from '@/shared/utils';

import type { InputRef, MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import styles from './PatientsPage.module.scss';

const { Title } = Typography;

const actions: MenuProps['items'] = [
  {
    key: '2',
    label: <>Страничка</>,
    icon: <EditOutlined />,
  },
  {
    key: '1',
    label: <>Назначить тест</>,
    icon: <ExperimentOutlined />,
  },
  {
    key: '3',
    danger: true,
    label: (
      <Popconfirm
        title="Удалить этого пациента?"
        okText="Удалить"
        okType="danger"
        placement="top"
        showArrow={false}
        icon={<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />}>
        Удалить
      </Popconfirm>
    ),
    icon: <DeleteOutlined />,
  },
];

export const PatientsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<IDevDataItem> = [
    {
      title: 'Фамилия Имя Отчество',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '300px',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className={styles.filter_search} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            className={styles.input}
            ref={searchInput}
            allowClear
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
          />
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              type="primary"
              size="small"
              icon={<SearchOutlined />}
              onClick={() => confirm()}>
              Поиск
            </Button>
            <Button
              className={styles.button}
              size="small"
              onClick={() => (clearFilters && clearFilters()) || confirm()}>
              Сбросить
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => {
        return <SearchOutlined className={filtered ? styles.search_icon_filtered : ''} />;
      },
      onFilter: (value, record) => {
        return record.fullname.toLowerCase().includes((value as string).toLowerCase());
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
      width: '80px',
      filters: [
        { text: 'Мужской', value: 'male' },
        { text: 'Женский', value: 'female' },
      ],
      onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
      render: (value: string) => (value === 'male' ? 'Муж' : 'Жен'),
    },
    {
      title: 'Возраст',
      dataIndex: 'dateBirth',
      key: 'dateBirth',
      width: '120px',
      sorter: (a, b) => (Date.parse(a.dateBirth) < Date.parse(b.dateBirth) ? -1 : 1),
      render: (dateBirth) => calculateAge(dateBirth),
    },
    // Фильтр поиск + сорт по умолчанию новейшими
    {
      title: 'Последний тест',
      dataIndex: 'dateLastTest',
      width: '170px',
      key: 'dateLastTest',
      sorter: (a, b) => (Date.parse(a.dateLastTest) < Date.parse(b.dateLastTest) ? -1 : 1),
      render: (dateLastTest: string) => parseDate(dateLastTest),
    },
    {
      title: 'Вид спорта',
      dataIndex: 'sport',
      key: 'sport',
      width: '250px',
      filterSearch: true,
      filters: typesSports.map((sport) => ({ text: sport, value: sport })),
      onFilter: (value, record) => record.sport === value,
    },
    {
      className: styles.actions,
      key: 'more',
      width: '66px',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown menu={{ items: actions }} placement="bottomRight">
          <MoreOutlined className={styles.more_icon} rotate={90} />
        </Dropdown>
      ),
    },
  ];

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
        scroll={{ x: 740, y: 690 }}
      />
      <ModalAddPatient isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleOk} />
    </main>
  );
};
