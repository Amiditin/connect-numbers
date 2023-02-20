import React from 'react';
import styles from './ModalAddPatient.module.scss';
import type { DatePickerProps } from 'antd';
import { Input, Button, Space, Typography, Form, DatePicker, Select, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const onFinish = (values: any) => {
  console.log(values);
};
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface IModalAddPatientProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export const ModalAddPatient: React.FC<IModalAddPatientProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      width="600px"
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className={styles.ModalAddPatient}>
        <div className={styles.ModalAddPatient}>
          <Title level={4}>Добавить пациента</Title>
          <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            onFinishFailed={(values) => {
              console.log({ values });
            }}>
            <Form.Item
              label="ФИО"
              name="name"
              rules={[{ required: true, message: 'Заполните имя' }]}>
              <Space className={styles.form_item} direction="vertical">
                <Input className={styles.input} placeholder="Иван" />
              </Space>
            </Form.Item>

            <Form.Item
              name="sex"
              label="Пол"
              rules={[{ message: 'Заполните образование', required: true }]}>
              <Select
                style={{ width: 120 }}
                options={[
                  { value: 'женский', label: 'Женский' },
                  { value: 'мужской', label: 'Мужской' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="date_birth"
              label="Дата рождения"
              rules={[{ message: 'Заполните дату рождения', required: true }]}>
              <DatePicker style={{ width: 180 }} />
            </Form.Item>

            <Form.Item
              name="education"
              label="Образование"
              rules={[{ message: 'Заполните образование' }]}>
              <Select
                style={{ width: 300 }}
                options={[
                  { value: 'общее', label: 'Общее' },
                  { value: 'среднее профессиональное', label: 'Среднее профессиональное' },
                  { value: 'высшее', label: 'Высшее' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="sport"
              label="Вид спорта"
              rules={[{ message: 'Заполните вид спорта' }]}>
              <Select
                showSearch
                placeholder="Выберите вид спорта"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'футбол',
                    label: 'Футбол',
                  },
                  {
                    value: 'баскетбол',
                    label: 'Баскетбол',
                  },
                  {
                    value: 'бадминтон',
                    label: 'Бадминтон',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Почта"
              rules={[
                { required: true, message: 'Заполните почту' },
                { type: 'email', message: 'Некорректная почта' },
              ]}
              hasFeedback>
              <Space className={styles.form_item} direction="vertical">
                <Input className={styles.input} placeholder="davidvilcao@gmail.com" />
              </Space>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Телефон"
              rules={[
                { required: true, message: 'Заполните телефон' },
                { pattern: new RegExp(/^[0-9]+$/) },
              ]}>
              <Space className={styles.form_item} wrap>
                <Input className={styles.input} placeholder="79221110500" />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
