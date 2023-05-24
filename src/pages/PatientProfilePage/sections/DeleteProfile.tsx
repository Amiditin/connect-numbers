import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { routes } from '@/router';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getPatientsStatus, patientsThunks } from '@/redux/patients';

import styles from '../PatientProfilePage.module.scss';

interface IDeleteProfileProps {
  patientId: string;
  isEdited: boolean;
  onSuccessRemove?: () => void;
}

export const DeleteProfile: React.FC<IDeleteProfileProps> = ({
  patientId,
  isEdited,
  onSuccessRemove,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const patientsStatus = useAppSelector(getPatientsStatus);

  useEffect(() => {
    if (isLoading && patientsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      message.success('Пациент успешно удалён!', 2);
      onSuccessRemove && onSuccessRemove();
      navigate(routes.patients.path);
    }

    if (isLoading && patientsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Пациент не был удален!', 2);
    }
  }, [isLoading, patientsStatus]);

  const handleDeletePatient = async () => {
    setIsLoading(true);

    messageApi.open({
      type: 'loading',
      content: 'Удаляем профиль...',
      duration: 0,
    });

    dispatch(patientsThunks.remove({ id: patientId }));
  };

  return (
    <Popconfirm
      title="Удалить профиль"
      description="Вы уверены, что хотите удалить этого пациента?"
      okText="Удалить"
      okType="danger"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={handleDeletePatient}>
      {contextHolder}
      <Button
        className={styles.btn}
        danger
        type="primary"
        disabled={isEdited}
        icon={<DeleteOutlined />}>
        Удалить
      </Button>
    </Popconfirm>
  );
};
