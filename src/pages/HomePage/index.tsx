import React from 'react';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Button, Modal, DatePicker, Space, Form, Input } from 'antd';

export const HomePage: React.FC = () => {
  return (
    <main>
      <h3>Внесите данные об организации</h3>

      <Form
        layout="horizontal"
        name="basic"
        labelCol={{ span: 10 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinishFailed={(values) => {
          console.log({ values });
        }}>
        <Form.Item
          label="Кратное название"
          name="name"
          rules={[{ required: true, message: 'Заполните имя' }]}>
          <Input style={{ width: 298 }} placeholder="ФK" />
        </Form.Item>
        <Form.Item
          label="Название Организации"
          name="fullname"
          rules={[{ required: true, message: 'Заполните имя' }]}>
          <Input style={{ width: 298 }} placeholder="Футбольный клуб " />
        </Form.Item>
        <Form.Item name="address" label="Адрес">
          <Space direction="vertical">
            <Input style={{ width: 298 }} placeholder="г. Нижний Новгород" />
          </Space>
        </Form.Item>

        <Form.Item
          name="email"
          label="Почта"
          rules={[{ type: 'email', message: 'Некорректная почта' }]}
          hasFeedback>
          <Space direction="vertical">
            <Input style={{ width: 298 }} placeholder="davidvilcao@gmail.com" />
          </Space>
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="numberPhone"
          rules={[
            { message: 'Заполните телефон' },
            { pattern: /^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/g, message: 'Некорректный номер' },
          ]}>
          <Input style={{ width: 298 }} maxLength={16} placeholder="+7(999)555-33-22" />
        </Form.Item>
        <Form.Item
          name="website"
          label="Веб-сайт"
          rules={[{ type: 'url', message: 'Некорректная ссылка' }]}
          hasFeedback>
          <Space direction="vertical">
            <Input style={{ width: 298 }} placeholder="www.sport.ru" />
          </Space>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>
    </main>
  );
};
