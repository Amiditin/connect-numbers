import { Input, Button, Space, Avatar, Typography, Form } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';

import styles from './ProfilePage.module.scss';

const { Title, Text } = Typography;

export const ProfilePage: React.FC = () => {
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
        <Form onFinish={onFinish}>
          <Form.Item name="password">
            <Space className={styles.form_item} direction="vertical">
              <Text strong>Изменить пароль</Text>
              <Input.Password
                required
                className={styles.input}
                placeholder="password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </Form.Item>
          <Form.Item name="email">
            <Space className={styles.form_item} direction="vertical">
              <Text strong>Изменить основную почту</Text>
              <Input required className={styles.input} placeholder="davidvilcao@gmail.com" />
            </Space>
          </Form.Item>

          <Form.Item name="phone">
            <Space className={styles.form_item} wrap>
              <Text strong>Изменить номер телефона</Text>
              <Input required style={{ width: '70%' }} placeholder="79221110500" />
            </Space>
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
