import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Divider, Typography } from 'antd';

import { patientsService } from '@/shared/api/services/patients';

import { SectionForm, SectionTable } from './sections';

import type { IPatientModel } from '@/shared/api/models';

import styles from './PatientProfilePage.module.scss';

const { Title, Text } = Typography;

export const PatientProfilePage: React.FC = () => {
  const [patient, setPatient] = useState<IPatientModel | null>(null);
  const params = useParams();

  useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        const { data } = await patientsService.findById({ id });

        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      getPatient(params.id);
    }
  }, [params]);

  return (
    <main className={styles.profile}>
      {patient ? (
        <>
          <Title level={2}>
            <Avatar className={styles.avatar} size="large">
              {patient.fullname[0] + (patient.fullname.split(' ')?.[1]?.[0] || '')}
            </Avatar>
            Профиль пациента
          </Title>
          <Text>
            Здесь вы можете просматривать и редактировать персональные данные испытуемого, а также
            изучить историю пройденных тестов пациента.
          </Text>
          <Divider />
          <SectionForm patient={patient} />
          <Divider />
          <SectionTable patient={patient} />
        </>
      ) : (
        <Title level={1}>Пользователь не найден</Title>
      )}
    </main>
  );
};
