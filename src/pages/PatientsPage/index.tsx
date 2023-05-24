import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Space, Table, Typography, Input, DatePicker } from 'antd';
import {
  EditOutlined,
  ExperimentOutlined,
  LineOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { ModalAddPatient, ModalAssignTesting } from '@/components';
import { routes } from '@/router';
import { calculateAge, parseDate } from '@/shared/utils';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getPatientsItems, getPatientsStatus, patientsThunks } from '@/redux/patients';

import type { InputRef } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { IPatientModel } from '@/shared/api/models';

import styles from './PatientsPage.module.scss';

type TCurOpenModal = 'addPatient' | 'assignTesting' | null;

const { Title } = Typography;

export const PatientsPage: React.FC = () => {
  const [curOpenModal, setCurOpenModal] = useState<TCurOpenModal>(null);
  const [curActivePatientId, setCurActivePatientId] = useState('');
  const [lastTestFilterValues, setLastTestFilterValues] = useState<[string, string]>(['', '']);
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(patientsThunks.findAll());
  }, []);

  const patientsItems = useAppSelector(getPatientsItems);
  const patientsStatus = useAppSelector(getPatientsStatus);

  const typesSport = useMemo(
    () =>
      patientsItems
        .reduce((sports: string[], item) => {
          if (!sports.includes(item.sport)) {
            sports.push(item.sport);
          }

          return sports;
        }, [])
        .sort()
        .map((sport) => ({ text: sport, value: sport })),
    [patientsItems],
  );

  const columns: ColumnsType<IPatientModel> = useMemo(
    () => [
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
      {
        title: 'Последний тест',
        dataIndex: 'dateLastTest',
        width: '180px',
        key: 'dateLastTest',
        sorter: (a, b) =>
          Date.parse(a.dateLastTest || '0') < Date.parse(b.dateLastTest || '0') ? -1 : 1,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className={styles.filter_search} onKeyDown={(e) => e.stopPropagation()}>
            <DatePicker.RangePicker
              className={styles.range_picker}
              allowEmpty={[true, true]}
              placeholder={['от', 'до']}
              format="DD.MM.YYYY"
              suffixIcon={null}
              allowClear={false}
              value={[
                selectedKeys[0] ? dayjs(selectedKeys[0]) : null,
                selectedKeys[1] ? dayjs(selectedKeys[1]) : null,
              ]}
              onChange={(values) => {
                if (values) {
                  setSelectedKeys([values[0]?.format() || '', values[1]?.format() || '']);
                }
              }}
            />
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                type="primary"
                size="small"
                icon={<SearchOutlined />}
                onClick={() => {
                  setLastTestFilterValues(selectedKeys as [string, string]);
                  confirm();
                }}>
                Поиск
              </Button>
              <Button
                className={styles.button}
                size="small"
                onClick={() => {
                  clearFilters && clearFilters();
                  setLastTestFilterValues(['', '']);
                  confirm();
                }}>
                Сбросить
              </Button>
            </div>
          </div>
        ),
        filterIcon: (filtered: boolean) => {
          return <SearchOutlined className={filtered ? styles.search_icon_filtered : ''} />;
        },
        onFilter: (_, record) => {
          return (
            dayjs(record.dateLastTest) > dayjs(lastTestFilterValues[0]) &&
            dayjs(record.dateLastTest) < dayjs(lastTestFilterValues[1])
          );
        },
        render: (dateLastTest: string) => parseDate(dateLastTest) || 'Нет результатов',
      },
      {
        title: 'Вид спорта',
        dataIndex: 'sport',
        key: 'sport',
        width: '250px',
        filterSearch: true,
        filters: typesSport,
        onFilter: (value, record) => record.sport === value,
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
                  key: 'patientProfile',
                  label: 'Профиль пациента',
                  icon: <UserOutlined />,
                  onClick: () => {
                    if (routes.patientProfile.getPath) {
                      navigate(routes.patientProfile.getPath(record.id));
                    }
                  },
                },
                {
                  key: 'patientProfileEdit',
                  label: 'Редактировать',
                  icon: <EditOutlined />,
                  onClick: () => {
                    if (routes.patientProfile.getPath) {
                      navigate(routes.patientProfile.getPath(record.id), {
                        state: { editing: true },
                      });
                    }
                  },
                },
                {
                  key: 'assignTesting',
                  label: 'Назначить тест',
                  icon: <ExperimentOutlined />,
                  onClick: () => {
                    setCurOpenModal('assignTesting');
                    setCurActivePatientId(record.id);
                  },
                },
              ],
            }}>
            <MoreOutlined className={styles.more_icon} rotate={90} />
          </Dropdown>
        ),
      },
    ],
    [],
  );

  return (
    <main className={styles.patients}>
      <Space className={styles.space} wrap>
        <Title className={styles.title} level={2}>
          <LineOutlined className={styles.line_icon} />
          Список пациентов
        </Title>
        <Button
          onClick={() => setCurOpenModal('addPatient')}
          type="primary"
          size="large"
          icon={<PlusOutlined />}>
          Добавить пациента
        </Button>
      </Space>
      {/* Todo декомпозировать таблицу */}
      <Table
        className={styles.table}
        dataSource={patientsItems}
        loading={patientsStatus === 'loading'}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        rowKey={(record) => record.id}
        scroll={{ x: 740, y: 710 }}
      />
      <ModalAddPatient
        isModalOpen={curOpenModal === 'addPatient'}
        onCancel={() => setCurOpenModal(null)}
        onSuccessAdd={() => setCurOpenModal(null)}
      />
      <ModalAssignTesting
        patientId={curActivePatientId}
        isModalOpen={curOpenModal === 'assignTesting'}
        onCancel={() => setCurOpenModal(null)}
        onSuccessAssign={() => setCurOpenModal(null)}
      />
    </main>
  );
};
