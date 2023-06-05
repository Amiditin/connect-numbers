import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Input, message, Popconfirm, Space, Table, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  LineOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { ModalAddOrganization, ModalEditOrganization } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  getOrganizationsItems,
  getOrganizationsStatus,
  organizationsThunks,
} from '@/redux/organizations';
import { parsePhone } from '@/shared/utils';
import { routes } from '@/router';

import type { InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { IOrganizationModel } from '@/shared/api/models';

import styles from './OrganizationsPage.module.scss';

type TCurOpenModal = 'addOrganization' | 'deleteOrganization' | 'editOrganization' | null;

const { Title } = Typography;

export const OrganizationsPage: React.FC = () => {
  const [curOpenModal, setCurOpenModal] = useState<TCurOpenModal>(null);
  const [curEditedOrganization, setCurEditedOrganization] = useState<IOrganizationModel>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const organizations = useAppSelector(getOrganizationsItems);
  const organizationsStatus = useAppSelector(getOrganizationsStatus);

  useEffect(() => {
    dispatch(organizationsThunks.findAll());
  }, []);

  useEffect(() => {
    if (isLoading && organizationsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      message.success('Организация удалена!', 2);
    }

    if (isLoading && organizationsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Организация не была удалена!', 2);
    }
  }, [isLoading, organizationsStatus]);

  const handleDeleteOrganization = (id: string) => {
    setIsLoading(true);
    messageApi.open({ type: 'loading', content: 'Удаляем организацию...', duration: 0 });
    dispatch(organizationsThunks.remove({ id }));
  };

  const getColumnSearchProps = (
    dataKey: keyof IOrganizationModel,
  ): ColumnType<IOrganizationModel> => ({
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
      return record[dataKey]?.toLowerCase().includes((value as string).toLowerCase()) || false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<IOrganizationModel> = [
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
      dataIndex: 'contact',
      key: 'contact',
      width: '300px',
      ...getColumnSearchProps('contact'),
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
      render: (_, record) => (
        <a href={`https://$${record.website}`} target="_blank">
          {record.website}
        </a>
      ),
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
                onClick: () => handleDeleteOrganization(record.id),
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
      {contextHolder}
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
        dataSource={organizations}
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
        onCancel={() => {
          setCurOpenModal(null);
          setCurEditedOrganization(undefined);
        }}
        onSuccessEdit={() => setCurOpenModal(null)}
        organization={curEditedOrganization}
      />
    </div>
  );
};
