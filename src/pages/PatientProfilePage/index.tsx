import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { typesSport } from '@/shared/constants';

import styles from './PatientProfilePage.module.scss';

const devData = {
  id: '0',
  fullname: 'Назаров Григорий Александрович',
  email: 'nazarov@mail.ru',
  phone: '+78901234567',
  gender: 'male',
  education: 'Бакалавриат',
  sport: 'Футбол',
  dateBirth: '1996-11-04',
  dateLastTest: '2023-03-22',
};

const curYear = dayjs().year();

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const typesEducation = [
  'Основное общее',
  'Среднее общее',
  'Среднее профессиональное',
  'Высшее образование',
];

const { Title, Text } = Typography;

export const PatientProfilePage: React.FC = () => {
  const params = useParams();
  const [form] = Form.useForm();

  return (
    <main className={styles.profile}>
      <Title level={2}>Профиль пациента {params?.id || 'Неизвестно'}</Title>
      <Text>Здесь вы можете просматривать и изменять персональные данные испытуемого.</Text>
      <Form className={styles.form} form={form} requiredMark={false} layout="vertical">
        <Form.Item
          label="Фамилия Имя Отчество"
          name="fullname"
          rules={[{ required: true, message: 'Заполните ФИО' }]}>
          <Input placeholder="Иван Иванов Иванович" />
        </Form.Item>
        <Form.Item label="Пол" name="sex" rules={[{ required: true, message: 'Выберите пол' }]}>
          <Select
            placeholder="Мужской"
            options={[
              { value: 'Мужской', label: 'Мужской' },
              { value: 'Женский', label: 'Женский' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            { required: true, message: 'Заполните почту' },
            { type: 'email', message: 'Некорректная почта' },
          ]}>
          <Input placeholder="address@email.ru" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            { required: true, message: 'Заполните телефон' },
            { pattern: /^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/g, message: 'Некорректный номер' },
          ]}>
          <Input maxLength={16} placeholder="+7(999)555-33-22" />
        </Form.Item>
        <Form.Item className={styles.birth} label="Дата рождения">
          <Space size="middle">
            <Form.Item
              className={styles.birth_select}
              name="birthDay"
              rules={[{ required: true, message: 'Выберите день' }]}>
              <Select
                showSearch
                placeholder="День"
                options={Array.from({ length: 31 }, (_, index) => ({ value: index, label: index }))}
              />
            </Form.Item>
            <Form.Item
              className={styles.birth_select}
              name="birthMonth"
              rules={[{ required: true, message: 'Выберите месяц' }]}>
              <Select
                showSearch
                placeholder="Месяц"
                options={months.map((month, index) => ({ value: index, label: month }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item
              className={styles.birth_select}
              name="birthYear"
              rules={[{ required: true, message: 'Выберите год' }]}>
              <Select
                showSearch
                placeholder="Год"
                options={Array.from({ length: 120 }, (_, index) => ({
                  value: curYear - index,
                  label: curYear - index,
                }))}
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item
          name="education"
          label="Образование"
          rules={[{ message: 'Выберите образование', required: true }]}>
          <Select
            placeholder="Общее"
            options={typesEducation.map((type) => ({ value: type, label: type }))}
          />
        </Form.Item>
        <Form.Item
          name="sport"
          label="Вид спорта"
          rules={[{ message: 'Выберите вид спорта', required: true }]}>
          <Select
            showSearch
            placeholder="Футбол"
            options={typesSport.map((type) => ({ value: type, label: type }))}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Редактировать
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
