import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Table, Typography, Input } from 'antd';
import { LineOutlined, SearchOutlined } from '@ant-design/icons';

import { parsePhone } from '@/shared/utils';

import type { InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { IOrganizationModel, IResearcherModel } from '@/shared/api/models';

import styles from './ResearchersPage.module.scss';
import { researchersService } from '@/shared/api/services';
import { TRequestStatuses } from '@/redux/types';

const { Title, Text } = Typography;

export const ResearchersPage: React.FC = () => {
  const [researchers, setResearchers] = useState<IResearcherModel[]>([]);
  const [researchersStatus, setResearchersStatus] = useState<TRequestStatuses>('loading');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    const getResearchers = async () => {
      try {
        const { data } = await researchersService.findAll(undefined);

        setResearchers(data);
        setResearchersStatus('success');
      } catch (error) {
        console.log(error);
        setResearchersStatus('error');
      }
    };
    getResearchers();
  }, []);

  const handleVerifyResearcher = async (id: string) => {
    try {
      await researchersService.update({ id, isVerified: true });

      setResearchers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isVerified: true } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnSearchProps = (dataKey: keyof IResearcherModel): ColumnType<IResearcherModel> => ({
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
      if (typeof record[dataKey] === 'object') {
        return (
          (record[dataKey] as IOrganizationModel).name
            .toLowerCase()
            .includes((value as string).toLowerCase()) || false
        );
      }

      return (
        String(record[dataKey])
          ?.toLowerCase()
          .includes((value as string).toLowerCase()) || false
      );
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<IResearcherModel> = useMemo(
    () => [
      {
        title: 'Имя исследователя',
        dataIndex: 'fullname',
        key: 'fullname',
        width: '200px',
        ...getColumnSearchProps('fullname'),
      },
      {
        title: 'Название Организации',
        dataIndex: 'organization',
        key: 'organization',
        width: '260px',
        ...getColumnSearchProps('organization'),
        render: (_, record) => record.organization.name,
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
        render: (_, record) => parsePhone(record.phone),
      },
      {
        title: 'Верификация',
        dataIndex: 'isVerified',
        key: 'isVerified',
        width: '230px',
        fixed: 'right',
        render: (_, record) =>
          record.isVerified ? (
            <Text type="success">Подтвержден</Text>
          ) : (
            <Button type="primary" onClick={() => handleVerifyResearcher(record.id)}>
              Подтвердить
            </Button>
          ),
      },
    ],
    [],
  );

  return (
    <main className={styles.researchers}>
      <Title className={styles.title} level={2}>
        <LineOutlined className={styles.line_icon} />
        Список исследователей
      </Title>
      <Table
        className={styles.table}
        dataSource={researchers}
        loading={researchersStatus === 'loading'}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 740, y: 710 }}
      />
    </main>
  );
};
