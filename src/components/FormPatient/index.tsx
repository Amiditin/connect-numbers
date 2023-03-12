import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import clsx from 'clsx';

import { typesSport } from '@/shared/constants';
import { parsePhone } from '@/shared/utils';
import { curYear, months, typesEducation } from './constants';

import styles from './FormPatient.module.scss';

interface IFormPatientProps {
  className?: string;
  submitText?: string;
  onSubmit?: (values: any) => void;
}

export const FormPatient: React.FC<IFormPatientProps> = ({
  className,
  submitText = 'Добавить',
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = (values: any) => {
    if (values.phone) {
      form.setFieldValue('phone', parsePhone(values.phone));
    }
  };

  return (
    <Form
      className={clsx(className, styles.form)}
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      form={form}
      onValuesChange={handleValuesChange}>
      <Row gutter={24}>
        <Col flex="1 1 320px">
          <Form.Item
            label="Фамилия Имя Отчество"
            name="fullname"
            rules={[{ required: true, message: 'Заполните ФИО' }]}>
            <Input placeholder="Иван Иванов Иванович" allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 200px">
          <Form.Item label="Пол" name="sex" rules={[{ required: true, message: 'Выберите пол' }]}>
            <Select
              placeholder="Мужской"
              options={[
                { value: 'Мужской', label: 'Мужской' },
                { value: 'Женский', label: 'Женский' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col flex="1 1 320px">
          <Form.Item
            name="email"
            label="Почта"
            rules={[
              { required: true, message: 'Заполните почту' },
              { type: 'email', message: 'Некорректная почта' },
            ]}>
            <Input placeholder="address@email.ru" allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 200px">
          <Form.Item
            label="Телефон"
            name="phone"
            rules={[
              { required: true, message: 'Заполните телефон' },
              { pattern: /^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/g, message: 'Некорректный номер' },
            ]}>
            <Input placeholder="+7(999)555-33-22" maxLength={16} allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 420px">
          <Form.Item className={styles.birth} label="Дата рождения">
            <Row gutter={12}>
              <Col flex="1 1 110px">
                <Form.Item name="birthDay" rules={[{ required: true, message: 'Выберите день' }]}>
                  <Select
                    showSearch
                    placeholder="День"
                    options={Array.from({ length: 31 }, (_, index) => ({
                      value: index,
                      label: index,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col flex="1 1 110px">
                <Form.Item
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
              </Col>
              <Col flex="1 1 110px">
                <Form.Item name="birthYear" rules={[{ required: true, message: 'Выберите год' }]}>
                  <Select
                    showSearch
                    placeholder="Год"
                    options={Array.from({ length: 120 }, (_, index) => ({
                      value: curYear - index,
                      label: curYear - index,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col flex="1 1 270px">
          <Form.Item
            name="education"
            label="Образование"
            rules={[{ message: 'Выберите образование', required: true }]}>
            <Select
              placeholder="Общее"
              options={typesEducation.map((type) => ({ value: type, label: type }))}
            />
          </Form.Item>
        </Col>
        <Col flex="1 1 270px">
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
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};
