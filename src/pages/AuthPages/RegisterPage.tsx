import { Link } from 'react-router-dom';
import { Button, Form, Input, Space, Typography, Select } from 'antd';
import {
  CloseOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { FormResearcher } from '@/components';
import { routes } from '@/router';

import styles from './AuthPages.module.scss';

const { Title, Text } = Typography;

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  organization: string;
  password: string;
  confirm: string;
}

interface RegisterProps {}

export const RegisterPage: React.FC<RegisterProps> = () => {
  const handleSubmit = (values: RegisterForm) => {
    console.log(values);
  };

  return (
    <Space className={styles.container} direction="vertical" size="middle">
      <Title className={styles.title} level={1}>
        Регистрация
      </Title>
      <FormResearcher submitText="Зарегистрироваться" />
      <Link to={routes.authLogin.path}>
        <Button className={styles.button_link} icon={<ArrowLeftOutlined />} type="link">
          Назад
        </Button>
      </Link>
    </Space>
  );
};
