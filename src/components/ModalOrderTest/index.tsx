import React from 'react';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Button, Modal, DatePicker, Space, Form, Input } from 'antd';
const { RangePicker } = DatePicker;

interface IModalOrderTest {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
}

export const ModalOrderTest: React.FC<IModalOrderTest> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title="Назначить тестирование"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Выберите дату для пациента Иванова Ивана Ивановича</p>
      <Space direction="vertical" size={12}>
        <DatePicker showTime />
      </Space>
    </Modal>
  );
};
