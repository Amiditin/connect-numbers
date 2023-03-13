import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { FormPatient, type IFormPatientValues } from '@/components';
import { devDataUser } from '../constants';

import styles from '../PatientProfilePage.module.scss';
import { routes } from '@/router';

const { Title } = Typography;

export const SectionForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdited, setIsEdited] = useState(false);
  const navigate = useNavigate();

  const success = (loadingText: string, successText: string) => {
    messageApi
      .open({
        type: 'loading',
        content: loadingText,
        duration: 2.5,
      })
      .then(() => {
        message.success(successText, 2.5);
        setIsEdited(false);
      });
  };

  const handleEditPatient = (values: IFormPatientValues) => {
    console.log(values);
    success('Сохраняем изменения...', 'Изменения успешно сохранены!');
  };

  const handleDeletePatient = () => {
    success('Удаляем профиль...', 'Пациент успешно удалён!');

    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    }).then(() => {
      navigate(routes.patients.path);
    });
  };

  return (
    <section>
      {contextHolder}
      <div className={styles.title_box}>
        <Title level={3}>Персональные данные:</Title>
        <Space size="middle">
          <Button
            className={styles.btn}
            type="primary"
            disabled={isEdited}
            icon={<EditOutlined />}
            onClick={() => setIsEdited(true)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить профиль"
            description="Вы уверены, что хотите удалить этого пациента?"
            okText="Удалить"
            okType="danger"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={handleDeletePatient}>
            <Button
              className={styles.btn}
              danger
              type="primary"
              disabled={isEdited}
              icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
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
