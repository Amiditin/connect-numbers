import React from 'react';
import styles from './HomePage.module.scss';
import { useRef, useState } from 'react';
import { SearchOutlined, LineOutlined, PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Typography } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Dropdown } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
import { Modal, Form } from 'antd';
import { ModalAddPatient, ModalAssignTesting } from '@/components';
type TCurOpenModal = 'addPatient' | 'assignTesting' | null;

const { Title } = Typography;
interface DataType {
  key: string;
  short_name: string;
  name: string;
  contact: string;
  test_date: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

type DataIndex = keyof DataType;
const data: DataType[] = [
  {
    key: '1',
    short_name: 'ФК Волга',
    name: 'Футбольный клуб Волга',
    contact: 'Алексей Воробьёв',
    address: 'New York No. 1 Lake Park',
    test_date: '15.03.2022',
    email: 'maxkazs@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    key: '2',
    short_name: 'ФК Ника',
    name: 'Футбольный клуб Ника',
    contact: 'Дмитрий Воронин',
    address: 'London No. 1 Lake Park',
    test_date: '15.03.2022',
    email: 'lop45sd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    key: '3',
    short_name: 'ФК',
    name: 'Футбольный клуб',
    contact: 'Иван Иванов',
    address: 'Sydney No. 1 Lake Park',
    test_date: '15.03.2022',
    email: 'djkk34ksd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    key: '4',
    short_name: 'ФК',
    name: 'Футбольный клуб',
    contact: 'Евгений Васильков',
    address: 'London No. 2 Lake Park',
    test_date: '15.03.2022',
    email: 'asksd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
];

export const HomePage: React.FC = () => {
  const [curOpenModal, setCurOpenModal] = useState<TCurOpenModal>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highhter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Кратное название',
      dataIndex: 'short_name',
      key: 'short_name',
      ...getColumnSearchProps('short_name'),
    },
    {
      title: 'Название Организации',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Контактное лицо',
      dataIndex: 'contact',
      key: 'contact',
      width: '20%',
      ...getColumnSearchProps('contact'),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Веб-сайт',
      dataIndex: 'website',
      key: 'website',
      width: '20%',
      ...getColumnSearchProps('website'),
    },
    {
      key: 'more',
      width: '46px',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'organizationProfile',
                label: 'Участники',
                icon: <UserOutlined />,
                // onClick: () => {
                //   if (routes.patientProfile.getPath) {
                //     navigate(routes.patientProfile.getPath(record.id));
                //   }
                // },
              },
              {
                key: 'organizationProfileEdit',
                label: 'Редактировать',
                icon: <EditOutlined />,
                // onClick: () => {
                //   if (routes.patientProfile.getPath) {
                //     navigate(routes.patientProfile.getPath(record.id), {
                //       state: { editing: true },
                //     });
                //   }
                // },
              },
              {
                key: 'Delete',
                label: 'Удалить',
                icon: <DeleteOutlined />,
                onClick: () => setCurOpenModal('assignTesting'),
              },
            ],
          }}>
          <MoreOutlined rotate={90} />
        </Dropdown>
      ),
    },
  ];

  return (
    <React.Fragment>
      <main>
        <Space wrap>
          <Title>
            <LineOutlined />
            Список Организаций
          </Title>

          <Button
            // onClick={() => setCurOpenModal('addPatient')}
            type="primary"
            // new block
            // onClick={showModal}
            //  new block
            size="large"
            icon={<PlusOutlined />}>
            Добавить организацию
          </Button>
        </Space>
        <Table columns={columns} dataSource={data} id="table-to-xls" />
        <ModalAssignTesting
          isModalOpen={curOpenModal === 'assignTesting'}
          onCancel={() => setCurOpenModal(null)}
          onSuccessAssign={() => setCurOpenModal(null)}
        />
        <Modal
          title="Внесите данные об организации"
          open={true}
          // onOk={handleOk}
          // onCancel={handleCancel}
        >
          <Form
            layout="horizontal"
            name="basic"
            labelCol={{ span: 10 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinishFailed={(values) => {
              console.log({ values });
            }}>
            <Form.Item
              label="Кратное название"
              name="short_name"
              rules={[{ required: true, message: 'Заполните имя' }]}>
              <Input style={{ width: 298 }} placeholder="ФK" />
            </Form.Item>
            <Form.Item
              label="Название Организации"
              name="name"
              rules={[{ required: true, message: 'Заполните имя' }]}>
              <Input style={{ width: 298 }} placeholder="Футбольный клуб " />
            </Form.Item>
            <Form.Item label="Контактное лицо" name="contact">
              <Input style={{ width: 298 }} placeholder="Иван Иванов Иванонич " />
            </Form.Item>
            <Form.Item name="address" label="Адрес">
              <Space direction="vertical">
                <Input style={{ width: 298 }} placeholder="г. Нижний Новгород" />
              </Space>
            </Form.Item>

            <Form.Item
              name="email"
              label="Почта"
              rules={[{ type: 'email', message: 'Некорректная почта' }]}
              hasFeedback>
              <Space direction="vertical">
                <Input style={{ width: 298 }} placeholder="davidvilcao@gmail.com" />
              </Space>
            </Form.Item>
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[
                { message: 'Заполните телефон' },
                { pattern: /^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/g, message: 'Некорректный номер' },
              ]}>
              <Input style={{ width: 298 }} maxLength={16} placeholder="+7(999)555-33-22" />
            </Form.Item>
            <Form.Item
              name="website"
              label="Веб-сайт"
              rules={[{ type: 'url', message: 'Некорректная ссылка' }]}
              hasFeedback>
              <Space direction="vertical">
                <Input style={{ width: 298 }} placeholder="www.sport.ru" />
              </Space>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form>
        </Modal>
      </main>
    </React.Fragment>
  );
};
