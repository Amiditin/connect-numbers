import { useState } from 'react';
import { Modal, DatePicker, Divider, message, Form, Button, TimePicker, Row, Col } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { resultsService } from '@/shared/api/services/results';

import type { IResultModel } from '@/shared/api/models';

import styles from './ModalAssignTesting.module.scss';

interface IFormAssignTesting {
  dateTest: Dayjs;
  timeTest: [Dayjs, Dayjs];
}

interface IModalAssignTestingProps {
  patientId: string;
  isModalOpen: boolean;
  onSuccessAssign?: (result: IResultModel) => void;
  onCancel?: () => void;
}

export const ModalAssignTesting: React.FC<IModalAssignTestingProps> = ({
  patientId,
  isModalOpen,
  onCancel,
  onSuccessAssign = () => {},
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignTesting = async (values: IFormAssignTesting) => {
    try {
      setIsLoading(true);
      messageApi.open({ type: 'loading', content: 'Назначаем тестирование...', duration: 0 });

      const date = values.dateTest.format().split('T')[0];

      const dateStart = dayjs(`${date}T${values.timeTest[0].format().split('T')[1]}`).format();
      const dateEnd = dayjs(`${date}T${values.timeTest[1].format().split('T')[1]}`).format();

      const { data } = await resultsService.create({ dateEnd, dateStart, patient: patientId });

      message.success('Тестирование успешно назначено!', 2);
      messageApi.destroy();
      setIsLoading(false);
      onSuccessAssign(data);
    } catch (error) {
      messageApi.destroy();
      setIsLoading(false);

      message.error('Тестирование не было назначено!', 2);
    }
  };

  return (
    <Modal
      className={styles.modal}
      width={400}
      title="Назначить тестирование"
      footer={null}
      open={isModalOpen}
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
          <DatePicker
            className={styles.form_item}
            disabledDate={(curDate: Dayjs) => curDate < dayjs().add(-1, 'day')}
            format="DD.MM.YYYY"
          />
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
