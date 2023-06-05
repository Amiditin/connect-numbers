import { Link } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { FormResearcher } from '@/components';
import { routes } from '@/router';
import { useAppDispatch } from '@/shared/hooks';
import { authThunks } from '@/redux/auth';

import type { IFormResearcherValues } from '@/components';

import styles from './AuthPages.module.scss';

const { Title } = Typography;

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: IFormResearcherValues) => {
    dispatch(authThunks.register({ ...values, isVerified: false }));
  };

  return (
    <Space className={styles.container} direction="vertical" size="middle">
      <Title className={styles.title} level={1}>
        Регистрация
      </Title>
      <FormResearcher onSubmit={handleSubmit} submitText="Зарегистрироваться" />
      <Link to={routes.authLogin.path}>
        <Button className={styles.button_link} icon={<ArrowLeftOutlined />} type="link">
          Назад
        </Button>
      </Link>
    </Space>
  );
};
