import { Modal, DatePicker, Divider, message, Form, Button, TimePicker, Row, Col } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import styles from './ModalAssignTesting.module.scss';

interface IFormAssignTesting {
  dateTest: Dayjs;
  timeTest: [Dayjs, Dayjs];
}

interface IModalAssignTestingProps {
  isModalOpen: boolean;
  onSuccessAssign?: () => void;
  onCancel?: () => void;
}

export const ModalAssignTesting: React.FC<IModalAssignTestingProps> = ({
  isModalOpen,
  onCancel,
  onSuccessAssign = () => {},
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const success = (loadingText: string, successText: string) => {
    setIsLoading(true);
    messageApi
      .open({
        type: 'loading',
        content: loadingText,
        duration: 2.5,
      })
      .then(() => {
        message.success(successText, 2.5);
        setIsLoading(false);
        onSuccessAssign();
      });
  };

  const handleAssignTesting = (values: IFormAssignTesting) => {
    console.log(values);
    success('Назначаем тестирование...', 'Тестирование успешно назначено!');
  };

  return (
    <Modal
      className={styles.modal}
      width={400}
      title="Назначить тестирование"
      footer={null}
      open={isModalOpen}
      onOk={onSuccessAssign}
      onCancel={onCancel}>
      {contextHolder}
      <Divider />
      <Form<IFormAssignTesting>
        className={styles.form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleAssignTesting}>
        <Form.Item
          label="Дата теста"
          name="dateTest"
          rules={[{ required: true, message: 'Выберите дату теста' }]}>
          <DatePicker className={styles.form_item} format="DD.MM.YYYY" />
        </Form.Item>

        <Form.Item
          label="Промежуток времени"
          name="timeTest"
          rules={[{ required: true, message: 'Выберите время' }]}>
          <TimePicker.RangePicker className={styles.form_item} format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.btn_submit}
            type="primary"
            htmlType="submit"
            loading={isLoading}>
            Назначить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
