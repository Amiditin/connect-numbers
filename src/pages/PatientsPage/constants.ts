export interface IDevDataItem {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  sport: string;
  dateBirth: string;
  dateLastTest: string;
}

const devDataItems: IDevDataItem[] = [
  {
    id: '0',
    fullname: 'Назаров Григорий Александрович',
    email: 'nazarov@mail.ru',
    phone: '+78901234567',
    city: 'Нижний Новгород',
    education: 'Бакалавриат',
    sport: 'Футбол',
    dateBirth: '04.11.1996',
    dateLastTest: '22.01.2023',
  },
  {
    id: '1',
    fullname: 'Виноградов Олег Семёнович',
    email: 'vinogradov@mail.ru',
    phone: '+78901234567',
    city: 'Москва',
    education: 'Бакалавриат',
    sport: 'Баскетбол',
    dateBirth: '21.06.1995',
    dateLastTest: '26.01.2023',
  },
  {
    id: '2',
    fullname: 'Никитина Ева Максимовна',
    email: 'nikitina@mail.ru',
    phone: '+78901234567',
    city: 'Москва',
    education: 'Среднее общее',
    sport: 'Лёгкая атлетика',
    dateBirth: '12.04.2000',
    dateLastTest: '10.02.2023',
  },
  {
    id: '3',
    fullname: 'Соболев Арсений Михайлович',
    email: 'sobolev@mail.ru',
    phone: '+78901234567',
    city: 'Нижний Новгород',
    education: 'Среднее профессиональное',
    sport: 'Лёгкая атлетика',
    dateBirth: '15.09.1998',
    dateLastTest: '03.02.2023',
  },
  {
    id: '4',
    fullname: 'Казакова Евгения Фёдоровна',
    email: 'kazakova@mail.ru',
    phone: '+78901234567',
    city: 'Нижний Новгород',
    education: 'Специалитет',
    sport: 'Бокс',
    dateBirth: '22.10.1999',
    dateLastTest: '06.02.2023',
  },
];

export const devData: IDevDataItem[] = Array.from({ length: 20 }, (_, i) =>
  devDataItems.map((item, j) => ({ ...item, id: [i, j].join('') })),
).flat();
