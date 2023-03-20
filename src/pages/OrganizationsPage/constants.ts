export interface IDevDataItem {
  id: string;
  name: string;
  abbreviation: string;
  contactFace: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

const devDataItems: IDevDataItem[] = [
  {
    id: '1',
    abbreviation: 'ФК Волга',
    name: 'Футбольный клуб Волга',
    contactFace: 'Алексей Воробьёв',
    address: 'New York No. 1 Lake Park',
    email: 'maxkazs@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    id: '2',
    abbreviation: 'ФК Ника',
    name: 'Футбольный клуб Ника',
    contactFace: 'Дмитрий Воронин',
    address: 'London No. 1 Lake Park',
    email: 'lop45sd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    id: '3',
    abbreviation: 'ФК',
    name: 'Футбольный клуб',
    contactFace: 'Иван Иванов',
    address: 'Sydney No. 1 Lake Park',
    email: 'djkk34ksd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
  {
    id: '4',
    abbreviation: 'ФК',
    name: 'Футбольный клуб',
    contactFace: 'Евгений Васильков',
    address: 'London No. 2 Lake Park',
    email: 'asksd@yandex.ru',
    phone: ' +71231234567',
    website: 'www.sport.ru',
  },
];

export const devData: IDevDataItem[] = Array.from({ length: 20 }, (_, i) =>
  devDataItems.map((item, j) => ({ ...item, id: [i, j].join('') })),
).flat();
