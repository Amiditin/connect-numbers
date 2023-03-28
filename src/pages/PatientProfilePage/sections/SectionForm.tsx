import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';

import { FormPatient, type IFormPatientValues } from '@/components';
import { devDataUser } from '../constants';

import styles from '../PatientProfilePage.module.scss';
import { routes } from '@/router';

const { Title } = Typography;

export const SectionForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editing) {
      setIsEdited(true);
    }
  }, []);

  const success = (loadingText: string, successText: string) => {
    messageApi
      .open({
        type: 'loading',
        content: loadingText,
        duration: 2.5,
      })
      .then(() => {
        message.success(successText, 2.5);
        setIsLoading(false);
        setIsEdited(false);
      });
  };

  const handleEditPatient = (values: IFormPatientValues) => {
    console.log(values);
    setIsLoading(true);
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
            icon={isEdited ? <StopOutlined /> : <EditOutlined />}
            onClick={() => {
              isEdited ? setIsEdited(false) : setIsEdited(true);
            }}>
            {/* TODO Добавить логику отмены */}
            {isEdited ? 'Отменить' : 'Редактировать'}
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
        loading={isLoading}
        submitText={isEdited ? 'Сохранить' : ''}
        onSubmit={handleEditPatient}
      />
    </section>
  );
};
