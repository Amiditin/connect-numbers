import { Link } from 'react-router-dom';
import { Button, Form, Input, Space, Typography, Select } from 'antd';
import {
  CloseOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';

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
      <Form
        size="large"
        name="login"
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional">
        <Form.Item
          name="name"
          label="Фамилия Имя Отчество"
          rules={[{ required: true, message: 'Укажите фамилию!' }]}>
          <Input
            placeholder="Иванов Иван Иванович"
            type="text"
            allowClear={{ clearIcon: <CloseOutlined /> }}
            prefix={<UserOutlined className={styles.prefixOutlined} />}
          />
        </Form.Item>
        <Form.Item
          name="organization"
          label="Организация"
          rules={[{ required: true, message: 'Укажите организацию!' }]}>
          <Select
            placeholder="Выберете роль"
            options={[
              { value: 'unn', label: 'ННГУ' },
              { value: 'hsenn', label: 'НИУ ВШЭ' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            { required: true, message: 'Укажите почту!' },
            { pattern: /\S+@\S+\.\S+/, message: 'Некорректная почта' },
          ]}>
          <Input
            placeholder="address@yandex.ru"
            type="email"
            allowClear={{ clearIcon: <CloseOutlined /> }}
            prefix={<MailOutlined className={styles.prefixOutlined} />}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            { required: true, message: 'Укажите телефон!' },
            { len: 10, pattern: /^\d+$/, message: 'Некорректный номер' },
          ]}>
          <Input
            placeholder="987 6543 210"
            type="tel"
            allowClear={{ clearIcon: <CloseOutlined /> }}
            addonBefore={<Text>+7</Text>}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          hasFeedback
          rules={[{ required: true, message: 'Укажите пароль!' }]}>
          <Input.Password
            placeholder="password"
            prefix={<LockOutlined className={styles.prefixOutlined} type="password" />}
          />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="confirm"
          hasFeedback
          dependencies={['password']}
          rules={[
            { required: true, message: 'Укажите пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Пароли не одинаковые!'));
              },
            }),
          ]}>
          <Input.Password
            placeholder="password"
            prefix={<LockOutlined className={styles.prefixOutlined} type="password" />}
          />
        </Form.Item>
        <Button className={styles.button} type="primary" htmlType="submit">
          Зарегистрироваться
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
