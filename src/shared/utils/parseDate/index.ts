import dayjs from 'dayjs';

export const parseDate = (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm');

export const calculateAge = (dateBirth: string) => dayjs().diff(dayjs(dateBirth), 'year');
