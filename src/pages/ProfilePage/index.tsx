import { Input, Button, Space, Avatar, Typography } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';

import styles from './ProfilePage.module.scss';

const { Title, Text } = Typography;

export const ProfilePage: React.FC = () => {
  return (
    <main className={styles.content}>
      <div className={styles.full_name}>
        <Avatar className={styles.avatar} size={64} icon={<UserOutlined />} />
        <Space size="small" direction="vertical">
          <h3>Давид Антонио Иванович</h3>
          <h4>davidvilcao@gmail.com +79221110500 </h4>
        </Space>
      </div>

      <div className={styles.edit}>
        <Title level={4}>Личные данные</Title>
        <Text>Здесь вы можете редактировать и изменять вашу личную информацию</Text>

        <Space className={styles.form_item} direction="vertical">
          <Text strong>Изменить пароль</Text>
          <Input.Password
            className={styles.input}
            placeholder="password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>

        <Space className={styles.form_item} direction="vertical">
          <Text strong>Изменить основную почту</Text>
          <Input className={styles.input} placeholder="davidvilcao@gmail.com" />
        </Space>
        <Space className={styles.form_item} wrap>
          <Text strong>Изменить номер телефона</Text>
          <Input.Group compact>
            <Input style={{ width: '10%' }} placeholder="7" />
            <Input style={{ width: '40%' }} placeholder="9221110500" />
          </Input.Group>

          <Button type="primary">Обновить данные</Button>
        </Space>
      </div>
    </main>
  );
};
