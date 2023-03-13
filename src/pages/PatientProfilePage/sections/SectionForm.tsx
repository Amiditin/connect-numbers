import { useState } from 'react';
import { Button, message, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { FormPatient, type IFormPatientValues } from '@/components';
import { devDataUser } from '../constants';

import styles from '../PatientProfilePage.module.scss';

const { Title } = Typography;

export const SectionForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdited, setIsEdited] = useState(false);

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Сохраняем изменения..',
        duration: 2.5,
      })
      .then(() => {
        message.success('Изменения успешно сохранены!', 2.5);
        setIsEdited(false);
      });
  };

  const handleEditPatient = (values: IFormPatientValues) => {
    console.log(values);
    success();
  };

  return (
    <section>
      {contextHolder}
      <div className={styles.title_box}>
        <Title level={3}>Персональные данные:</Title>
        <Button
          className={styles.btn}
          type="primary"
          disabled={isEdited}
          icon={<EditOutlined />}
          onClick={() => setIsEdited(true)}>
          Редактировать
        </Button>
      </div>
      <FormPatient
        initialValues={{
          ...devDataUser,
          birthDay: +devDataUser.dateBirth.split('-')[2],
          birthMonth: +devDataUser.dateBirth.split('-')[1],
          birthYear: +devDataUser.dateBirth.split('-')[0],
        }}
        disabled={!isEdited}
        submitText={isEdited ? 'Сохранить' : ''}
        onSubmit={handleEditPatient}
      />
    </section>
  );
};
