import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Input, Space, Table, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  LineOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { ModalAddOrganization, ModalAssignTesting, ModalEditOrganization } from '@/components';
import { parsePhone } from '@/shared/utils';
import { devData, type IDevDataItem } from './constants';
import { routes } from '@/router';

import type { InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

import styles from './OrganizationsPage.module.scss';

type TCurOpenModal = 'addOrganization' | 'assignTesting' | 'editOrganization' | null;
type DevDataKeys = keyof IDevDataItem;

const { Title } = Typography;

export const OrganizationsPage: React.FC = () => {
  const [curOpenModal, setCurOpenModal] = useState<TCurOpenModal>(null);
  const [curEditedOrganization, setCurEditedOrganization] = useState<IDevDataItem>();
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const getColumnSearchProps = (dataKey: DevDataKeys): ColumnType<IDevDataItem> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
      return record[dataKey].toLowerCase().includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<IDevDataItem> = [
    {
      title: 'Кратное название',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
      width: '200px',
      ...getColumnSearchProps('abbreviation'),
    },
    {
      title: 'Название Организации',
      dataIndex: 'name',
      key: 'name',
      width: '260px',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Контактное лицо',
      dataIndex: 'contactFace',
      key: 'contactFace',
      width: '300px',
      ...getColumnSearchProps('contactFace'),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      width: '250px',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: '230px',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      width: '180px',
      ...getColumnSearchProps('phone'),
      render: (phone) => parsePhone(phone),
    },
    {
      title: 'Веб-сайт',
      dataIndex: 'website',
      key: 'website',
      width: '180px',
      ...getColumnSearchProps('website'),
    },
    {
      className: styles.actions,
      key: 'more',
      width: '46px',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'researchers',
                label: 'Все исследователи',
                icon: <TeamOutlined />,
                onClick: () =>
                  navigate(routes.researchers.path, { state: { organizationId: record.id } }),
              },
              {
                key: 'organizationEdit',
                label: 'Редактировать',
                icon: <EditOutlined />,
                onClick: () => {
                  setCurOpenModal('editOrganization');
                  setCurEditedOrganization(record);
                },
              },
              {
                key: 'Delete',
                label: 'Удалить',
                danger: true,
                icon: <DeleteOutlined />,
              },
            ],
          }}>
          <MoreOutlined className={styles.more_icon} rotate={90} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className={styles.organizations}>
      <Space className={styles.space} wrap>
        <Title className={styles.title} level={2}>
          <LineOutlined className={styles.line_icon} />
          Список Организаций
        </Title>
        <Button
          onClick={() => setCurOpenModal('addOrganization')}
          type="primary"
          size="large"
          icon={<PlusOutlined />}>
          Добавить организацию
        </Button>
      </Space>
      <Table
        className={styles.table}
        dataSource={devData}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 740, y: 730 }}
      />
      <ModalAddOrganization
        isModalOpen={curOpenModal === 'addOrganization'}
        onCancel={() => setCurOpenModal(null)}
        onSuccessAdd={() => setCurOpenModal(null)}
      />
      <ModalEditOrganization
        isModalOpen={curOpenModal === 'editOrganization'}
        onCancel={() => setCurOpenModal(null)}
        onSuccessEdit={() => setCurOpenModal(null)}
        initialValues={curEditedOrganization}
      />
    </div>
  );
};
