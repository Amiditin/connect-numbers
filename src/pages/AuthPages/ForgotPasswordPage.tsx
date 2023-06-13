import { Link } from 'react-router-dom';
import { Button, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { routes } from '@/router';

import styles from './AuthPages.module.scss';

const { Title } = Typography;

interface ForgotPasswordForm {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const handleSubmit = (values: ForgotPasswordForm) => {
    console.warn(values);
  };

  return (
    <Space className={styles.container} direction="vertical" size="middle">
      <Title className={styles.title} level={1}>
        Восстановление доступа
      </Title>
      <Form
        size="large"
        name="login"
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional">
        <Form.Item
          name="email"
          label="Почта"
          tooltip="После подтверждения модератором, на эту почту придет письмо с новым паролем"
          rules={[{ required: true, message: 'Укажите почту!', pattern: /\S+@\S+\.\S+/ }]}>
          <Input
            placeholder="address@yandex.ru"
            type="email"
            allowClear={{ clearIcon: <CloseOutlined /> }}
            prefix={<MailOutlined className={styles.prefixOutlined} />}
          />
        </Form.Item>
        <Button className={styles.button} type="primary" htmlType="submit">
          Запросить новый пароль
        </Button>
      </Form>
      <Link to={routes.authLogin.path}>
        <Button className={styles.button_link} icon={<ArrowLeftOutlined />} type="link">
          Назад
        </Button>
      </Link>
    </Space>
  );
};
