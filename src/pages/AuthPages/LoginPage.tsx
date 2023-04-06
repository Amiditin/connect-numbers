import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import { routes } from '@/router';
import { useAppDispatch } from '@/shared/hooks';
import { authActions } from '@/redux/auth';

import styles from './AuthPages.module.scss';

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: LoginForm) => {
    console.log(values);

    dispatch(authActions.loginUser({ email: values.email }));
  };

  return (
    <Space className={styles.container} direction="vertical" size="middle">
      <Title className={styles.title} level={1}>
        Авторизация
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
          rules={[{ required: true, message: 'Укажите почту!', pattern: /\S+@\S+\.\S+/ }]}>
          <Input
            placeholder="address@yandex.ru"
            type="email"
            allowClear={{ clearIcon: <CloseOutlined /> }}
            prefix={<MailOutlined className={styles.prefixOutlined} />}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Укажите пароль!' }]}>
          <Input.Password
            placeholder="password"
            prefix={<LockOutlined className={styles.prefixOutlined} type="password" />}
          />
        </Form.Item>
        <Space.Compact className={styles.space}>
          <Form.Item className={styles.remember} name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <Link to={routes.authForgotPassword.path}>
            <Button className={styles.button_link} type="link">
              Забыли пароль?
            </Button>
          </Link>
        </Space.Compact>
        <Button className={styles.button} type="primary" htmlType="submit">
          Войти в аккаунт
        </Button>
      </Form>
      <Space.Compact className={styles.space}>
        <Text>Ещё нет аккаунта?</Text>
        <Link to={routes.authRegister.path}>
          <Button className={styles.button_link} type="link">
            Зарегистрироваться
          </Button>
        </Link>
      </Space.Compact>
      <Link to={routes.testRoot.path}>
        <Button className={styles.button} type="primary" size="large">
          Пройти тестирование
        </Button>
      </Link>
    </Space>
  );
};
