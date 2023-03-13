import { Avatar, Divider, Typography } from 'antd';

import { SectionForm, SectionTable } from './sections';

import { devDataUser } from './constants';

import styles from './PatientProfilePage.module.scss';

const { Title, Text } = Typography;

export const PatientProfilePage: React.FC = () => {
  return (
    <main className={styles.profile}>
      <Title level={2}>
        <Avatar className={styles.avatar} size="large">
          {devDataUser.fullname[0] + devDataUser.fullname.split(' ')[1][0]}
        </Avatar>
        Профиль пациента
      </Title>
      <Text>
        Здесь вы можете просматривать и редактировать персональные данные испытуемого, а также
        изучить историю пройденных тестов пациента.
      </Text>
      <Divider />
      <SectionForm />
      <Divider />
      <SectionTable />
    </main>
  );
};
