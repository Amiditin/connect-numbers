import { Button, Avatar, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { FormResearcher } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { authActions, getAuthUser } from '@/redux/auth';

import styles from './ProfilePage.module.scss';

const { Title, Text } = Typography;

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const researcher = useAppSelector(getAuthUser);

  if (!researcher) {
    return null;
  }

  const onClickLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <main className={styles.profile}>
      <div className={styles.info}>
        <Title level={3}>
          <Avatar className={styles.avatar} size={48} icon={<UserOutlined />} />
          Личные данные
        </Title>
        <Text>Здесь вы можете редактировать и изменять вашу личную информацию</Text>
      </div>
      <Divider />
      <FormResearcher
        initialValues={{ ...researcher, organization: researcher.organization.id }}
        submitText="Обновить данные"
      />
      <Button type="primary" danger onClick={onClickLogout}>
        Выйти из аккаунта
      </Button>
    </main>
  );
};
