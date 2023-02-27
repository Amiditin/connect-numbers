export interface IDevDataItem {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  gender: string;
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
    gender: 'male',
    education: 'Бакалавриат',
    sport: 'Футбол',
    dateBirth: '1996-11-04',
    dateLastTest: '2023-01-22',
  },
  {
    id: '1',
    fullname: 'Виноградов Олег Семёнович',
    email: 'vinogradov@mail.ru',
    phone: '+78901234567',
    gender: 'male',
    education: 'Бакалавриат',
    sport: 'Баскетбол',
    dateBirth: '1995-06-21',
    dateLastTest: '2023-01-26',
  },
  {
    id: '2',
    fullname: 'Никитина Ева Максимовна',
    email: 'nikitina@mail.ru',
    phone: '+78901234567',
    gender: 'female',
    education: 'Среднее общее',
    sport: 'Легкая атлетика',
    dateBirth: '2000-04-12',
    dateLastTest: '2023-02-10',
  },
  {
    id: '3',
    fullname: 'Соболев Арсений Михайлович',
    email: 'sobolev@mail.ru',
    phone: '+78901234567',
    gender: 'male',
    education: 'Среднее профессиональное',
    sport: 'Легкая атлетика',
    dateBirth: '1998-09-15',
    dateLastTest: '2023-02-03',
  },
  {
    id: '4',
    fullname: 'Казакова Евгения Фёдоровна',
    email: 'kazakova@mail.ru',
    phone: '+78901234567',
    gender: 'female',
    education: 'Специалитет',
    sport: 'Бокс',
    dateBirth: '1999-10-22',
    dateLastTest: '2023-02-06',
  },
];

export const devData: IDevDataItem[] = Array.from({ length: 5 }, (_, i) =>
  devDataItems.map((item, j) => ({ ...item, id: [i, j].join('') })),
).flat();
