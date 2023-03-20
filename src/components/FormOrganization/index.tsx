import { parsePhone } from '@/shared/utils';
import { Button, Col, Form, Input, Row } from 'antd';
import clsx from 'clsx';
import React from 'react';
import styles from './FormOrganization.module.scss';

export interface IFormOrganizationValues {
  name: string;
  abbreviation: string;
  email: string;
  phone: string;
  contactFace: string;
  address: string;
  website: string;
}

interface IFormOrganizationProps {
  className?: string;
  submitText?: string;
  disabled?: boolean;
  loading?: boolean;
  initialValues?: IFormOrganizationValues;
  onSubmit?: (values: IFormOrganizationValues) => void;
}

export const FormOrganization: React.FC<IFormOrganizationProps> = ({
  className,
  submitText,
  disabled = false,
  loading = false,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm<IFormOrganizationValues>();

  const handleValuesChange = (values: IFormOrganizationValues) => {
    if (values.phone) {
      form.setFieldValue('phone', parsePhone(values.phone));
    }
  };

  return (
    <Form<IFormOrganizationValues>
      className={clsx(className, styles.form)}
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      form={form}
      disabled={disabled}
      initialValues={{ ...initialValues, phone: parsePhone(initialValues?.phone || '') }}
      onValuesChange={handleValuesChange}>
      <Row gutter={24}>
        <Col flex="1 1 320px">
          <Form.Item
            label="Название Организации"
            name="name"
            rules={[{ required: true, message: 'Заполните название' }]}>
            <Input placeholder="Футбольный клуб" allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 200px">
          <Form.Item
            label="Кратное название"
            name="abbreviation"
            rules={[{ required: true, message: 'Заполните название' }]}>
            <Input placeholder="ФK" allowClear />
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
        <Col flex="1 1 320px">
          <Form.Item
            label="Контактное лицо"
            name="contactFace"
            rules={[{ required: true, message: 'Заполните контактное лицо' }]}>
            <Input placeholder="Иван Иванов Иванович" allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 200px">
          <Form.Item
            name="website"
            label="Веб-сайт"
            rules={[
              { required: true, message: 'Заполните веб-сайт' },
              { type: 'url', message: 'Некорректная ссылка' },
            ]}>
            <Input placeholder="www.sport.ru" allowClear />
          </Form.Item>
        </Col>
        <Col flex="1 1 320px">
          <Form.Item
            name="address"
            label="Адрес"
            rules={[{ required: true, message: 'Заполните адрес' }]}>
            <Input placeholder="г. Нижний Новгород" allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        {submitText && (
          <Button className={styles.btn_submit} type="primary" htmlType="submit" loading={loading}>
            {submitText}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
