import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { CloseOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import { parsePhone } from '@/shared/utils';
import { organizationsService } from '@/shared/api/services/organizations';

import type { IOrganizationModel, IResearcherModel } from '@/shared/api/models';

import styles from './FormResearcher.module.scss';

export interface IFormResearcherValues
  extends Pick<IResearcherModel, 'fullname' | 'email' | 'phone'> {
  password: string;
  confirm: string;
  organization: string;
}

interface IFormOrganizationProps {
  className?: string;
  submitText?: string;
  disabled?: boolean;
  loading?: boolean;
  initialValues?: Partial<IFormResearcherValues>;
  onSubmit?: (values: IFormResearcherValues) => void;
}

export const FormResearcher: React.FC<IFormOrganizationProps> = ({
  className,
  submitText,
  disabled = false,
  loading = false,
  initialValues,
  onSubmit,
}) => {
  const [organizations, setOrganizations] = useState<IOrganizationModel[]>([]);
  const [form] = Form.useForm<IFormResearcherValues>();

  // Todo переделать на thunks
  useEffect(() => {
    const getOrganizations = async () => {
      try {
        const { data } = await organizationsService.findAll();

        setOrganizations(data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrganizations();
  }, []);

  const handleValuesChange = (values: IFormResearcherValues) => {
    if (values.phone) {
      form.setFieldValue('phone', parsePhone(values.phone));
    }
  };

  return (
    <Form<IFormResearcherValues>
      className={clsx(className, styles.form)}
      layout="vertical"
      requiredMark={false}
      form={form}
      initialValues={{ ...initialValues, phone: parsePhone(initialValues?.phone || '') }}
      disabled={disabled}
      onFinish={onSubmit}
      onValuesChange={handleValuesChange}>
      <Row gutter={24}>
        <Col flex="1 1 320px">
          <Form.Item
            label="Фамилия Имя Отчество"
            name="fullname"
            rules={[{ required: true, message: 'Заполните ФИО' }]}>
            <Input
              placeholder="Иванов Иван Иванович"
              type="text"
              allowClear={{ clearIcon: <CloseOutlined /> }}
              prefix={<UserOutlined className={styles.prefixOutlined} />}
            />
          </Form.Item>
        </Col>
        <Col flex="1 1 200px">
          <Form.Item
            label="Организация"
            name="organization"
            rules={[{ required: true, message: 'Выберите организацию' }]}>
            <Select
              placeholder="ФГБУ России"
              options={organizations.map((item) => ({
                value: item.id,
                label: item.abbreviation || item.name,
              }))}
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
            <Input
              placeholder="address@email.ru"
              type="email"
              allowClear={{ clearIcon: <CloseOutlined /> }}
              prefix={<MailOutlined className={styles.prefixOutlined} />}
            />
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
            label="Пароль"
            name="password"
            hasFeedback
            rules={[{ required: true, message: 'Укажите пароль!' }]}>
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined className={styles.prefixOutlined} type="password" />}
            />
          </Form.Item>
        </Col>
        <Col flex="1 1 320px">
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
