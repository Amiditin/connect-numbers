import { Input, Button, Space, Avatar, Typography, Form } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';

import styles from './ProfilePage.module.scss';
import { parsePhone } from '@/shared/utils';
const { Title, Text } = Typography;

export const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const handleValuesChange = (values: any) => {
    if (values.numberPhone) {
      form.setFieldValue('numberPhone', parsePhone(values.numberPhone));
    }
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <main className={styles.content}>
      <div className={styles.full_name}>
        <Avatar className={styles.avatar} size={64} icon={<UserOutlined />} />
        <Space size="small" direction="vertical">
          <h3>Давид Антонио Иванович </h3>
          <h4>davidvilcao@gmail.com +79221110500 Организация:ННГУ</h4>
        </Space>
      </div>

      <div className={styles.edit}>
        <Title level={4}>Личные данные</Title>
        <Text>Здесь вы можете редактировать и изменять вашу личную информацию</Text>

        <Form
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item name="password" label="Изменить пароль">
            <Input.Password
              className={styles.input}
              required
              placeholder="password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Изменить почту"
            rules={[
              { message: 'Заполните почту' },
              { type: 'email', message: 'Некорректная почта' },
            ]}
            hasFeedback>
            <Input className={styles.input} placeholder="davidvilcao@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Изменить телефон"
            name="numberPhone"
            rules={[
              { message: 'Заполните телефон' },
              { pattern: /^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/g, message: 'Некорректный номер' },
            ]}>
            <Input className={styles.input} maxLength={16} placeholder="+7(999)555-33-22" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Обновить данные
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};
