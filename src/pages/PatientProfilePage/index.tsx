import { message, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { FormPatient, type IFormPatientValues } from '@/components';

import styles from './PatientProfilePage.module.scss';

const devDataUser = {
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
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Сохраняем изменения..',
        duration: 2.5,
      })
      .then(() => message.success('Изменения успешно сохранены!', 2.5));
  };

  const handleEditPatient = (values: IFormPatientValues) => {
    console.log(values);
    success();
  };

  return (
    <main className={styles.profile}>
      {contextHolder}
      <Title level={2}>Профиль пациента</Title>
      <Text>
        Здесь вы можете просматривать и редактировать персональные данные испытуемого, а также
        изучить историю пройденных тестов пациента.
      </Text>
      <Title level={3}>Персональные данные:</Title>
      <FormPatient
        initialValues={{
          ...devDataUser,
          birthDay: +devDataUser.dateBirth.split('-')[2],
          birthMonth: +devDataUser.dateBirth.split('-')[1],
          birthYear: +devDataUser.dateBirth.split('-')[0],
        }}
        submitText="Сохранить"
        onSubmit={handleEditPatient}
      />
    </main>
  );
};
