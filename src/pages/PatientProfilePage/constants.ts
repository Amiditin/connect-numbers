export const devDataUser = {
  id: '0',
  fullname: 'Назаров Григорий Александрович',
  email: 'nazarov@mail.ru',
  phone: '+78901234567',
  gender: 'male',
  education: 'Бакалавриат',
  sport: 'Футбол',
  dateBirth: '1996-11-04',
  dateLastTest: '2023-03-22',
};

export interface IDevDataResult {
  id: string;
  dateStart: string;
  dateEnd: string;
  time1: string | null;
  time2: string;
  time3: string | null;
  time4: string;
}

const devDataResultPage: IDevDataResult[] = [
  {
    id: '0',
    dateStart: '2023-03-22T09:00:00+03:00',
    dateEnd: '2023-03-22T20:00:00+03:00',
    time1: '00:20',
    time2: '01:12',
    time3: '00:35',
    time4: '01:32',
  },
  {
    id: '1',
    dateStart: '2023-03-23T09:00:00+03:00',
    dateEnd: '2023-03-23T20:00:00+03:00',
    time1: '00:12',
    time2: '01:02',
    time3: '00:32',
    time4: '01:30',
  },
  {
    id: '2',
    dateStart: '2023-03-24T09:00:00+03:00',
    dateEnd: '2023-03-24T20:00:00+03:00',
    time1: null,
    time2: '00:50',
    time3: '00:28',
    time4: '01:23',
  },
  {
    id: '3',
    dateStart: '2023-03-25T09:00:00+03:00',
    dateEnd: '2023-03-25T20:00:00+03:00',
    time1: null,
    time2: '00:46',
    time3: null,
    time4: '01:11',
  },
  {
    id: '4',
    dateStart: '2023-03-26T09:00:00+03:00',
    dateEnd: '2023-03-26T20:00:00+03:00',
    time1: null,
    time2: '00:48',
    time3: null,
    time4: '01:16',
  },
];

export const devDataResult: IDevDataResult[] = Array.from({ length: 10 }, (_, i) =>
  devDataResultPage.map((item, j) => ({ ...item, id: [i, j].join('') })),
).flat();
