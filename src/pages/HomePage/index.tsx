import React from 'react';
import styles from './HomePage.module.scss';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DataType {
  key: string;
  name: string;
  // birth_data: string;  ????
  birth_data: string;
  test_date: string;
  address: string;
  sex: string;
  sport: string;
  test1: number;
  test2: number;
}

type DataIndex = keyof DataType;
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    birth_data: '05.09.1997',
    address: 'New York No. 1 Lake Park',
    test_date: '15.03.2022',
    sex: 'м',
    sport: 'футбол',
    test1: 10,
    test2: 12,
  },
  {
    key: '2',
    name: 'Joe Black',
    birth_data: '15.01.2001',
    address: 'London No. 1 Lake Park',
    test_date: '15.03.2022',
    sex: 'м',
    sport: 'бокс',
    test1: 10,
    test2: 12,
  },
  {
    key: '3',
    name: 'Jim Green',
    birth_data: '07.05.1995',
    address: 'Sydney No. 1 Lake Park',
    test_date: '15.03.2022',
    sex: 'м',
    sport: 'баскетбол',
    test1: 10,
    test2: 12,
  },
  {
    key: '4',
    name: 'Jim Red',
    birth_data: '06.10.1998',
    address: 'London No. 2 Lake Park',
    test_date: '15.03.2022',
    sex: 'м',
    sport: 'бадминтон',
    test1: 10,
    test2: 12,
  },
];

export const HomePage: React.FC = () => {
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
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Дата тестирования',
      dataIndex: 'test_date',
      key: 'test_date',
      ...getColumnSearchProps('test_date'),
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birth_data',
      key: 'birth_data',
      width: '20%',
      ...getColumnSearchProps('birth_data'),
    },
    {
      title: 'Пол',
      dataIndex: 'sex',
      key: 'sex',
      width: '20%',
      ...getColumnSearchProps('sex'),
    },
    {
      title: 'Вид спорта',
      dataIndex: 'sport',
      key: 'sport',
      width: '20%',
      ...getColumnSearchProps('sport'),
    },
    {
      title: 'Тест1',
      dataIndex: 'test1',
      key: 'test1',
      width: '20%',
      ...getColumnSearchProps('test1'),
    },
    {
      title: 'Тест2',
      dataIndex: 'test2',
      key: 'test2',
      width: '20%',
      ...getColumnSearchProps('test2'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];
  // const[result,setResult]=useState([]);

  return (
    <main>
      <Table columns={columns} dataSource={data} id="table-to-xls" />
      <div>
        {/* <ReactHTMLTableToExcel
          id="table-to-xls"
          className="download-table-xls-button btn btn-primary mb-3"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        /> */}
      </div>
    </main>
  );
};
