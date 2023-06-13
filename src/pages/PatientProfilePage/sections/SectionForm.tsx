import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, message, Space, Typography } from 'antd';
import { EditOutlined, StopOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { FormPatient, type IFormPatientValues } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getPatientsStatus, patientsThunks } from '@/redux/patients';
import { extractNumbers } from '@/shared/utils';

import { DeleteProfile } from './DeleteProfile';

import type { IPatientModel } from '@/shared/api/models';

import styles from '../PatientProfilePage.module.scss';

const { Title } = Typography;

interface ISectionFormProps {
  patient: IPatientModel;
}

export const SectionForm: React.FC<ISectionFormProps> = ({ patient }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const patientsStatus = useAppSelector(getPatientsStatus);

  useEffect(() => {
    if (isLoading && patientsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      setIsEdited(false);
      message.success('Изменения успешно сохранены!', 2);
    }

    if (isLoading && patientsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Изменения не были сохранены!', 2);
    }
  }, [isLoading, messageApi, patientsStatus]);

  useEffect(() => {
    if (location.state?.editing) {
      setIsEdited(true);
    }
  }, [location.state?.editing]);

  const handleEditPatient = (values: IFormPatientValues) => {
    const { birthDay, birthMonth, birthYear, ...params } = values;

    setIsLoading(true);
    messageApi.open({ type: 'loading', content: 'Сохраняем изменения...', duration: 0 });
    dispatch(
      patientsThunks.update({
        ...params,
        id: patient.id,
        phone: extractNumbers(values.phone),
        dateBirth: dayjs(`${birthYear}-${birthMonth}-${birthDay}`).format(),
      }),
    );
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
            onClick={() => setIsEdited((prev) => !prev)}>
            {/* TODO Добавить логику отмены */}
            {isEdited ? 'Отменить' : 'Редактировать'}
          </Button>
          <DeleteProfile patientId={patient.id} isEdited={isEdited} />
        </Space>
      </div>
      <FormPatient
        initialValues={{
          ...patient,
          birthDay: +patient.dateBirth.slice(8, 10),
          birthMonth: +patient.dateBirth.split('-')[1],
          birthYear: +patient.dateBirth.split('-')[0],
        }}
        disabled={!isEdited}
        loading={isLoading}
        submitText={isEdited ? 'Сохранить' : ''}
        onSubmit={handleEditPatient}
      />
    </section>
  );
};
