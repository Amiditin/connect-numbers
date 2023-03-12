import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { FormPatient } from '@/components/FormPatient';

import styles from './PatientProfilePage.module.scss';

const devData = {
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

const { Title, Text } = Typography;

export const PatientProfilePage: React.FC = () => {
  const params = useParams();

  const handleEditPatient = (values: any) => {
    console.log(values);
  };

  return (
    <main className={styles.profile}>
      <Title level={1}>Профиль пациента {params?.id || 'Неизвестно'}</Title>
      <Text>Здесь вы можете просматривать и изменять персональные данные испытуемого.</Text>
      <Title level={3}>Персональные данные:</Title>
      <FormPatient submitText="Редактировать" onSubmit={handleEditPatient} />
    </main>
  );
};
