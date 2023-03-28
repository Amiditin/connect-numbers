import { useState } from 'react';
import { Divider, message, Modal } from 'antd';

import { FormPatient, IFormPatientValues } from '../FormPatient';

import styles from './ModalAddPatient.module.scss';
interface IModalAddPatientProps {
  isModalOpen: boolean;
  onCancel?: () => void;
  onSuccessAdd?: () => void;
}

export const ModalAddPatient: React.FC<IModalAddPatientProps> = ({
  isModalOpen,
  onCancel,
  onSuccessAdd = () => {},
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
        onSuccessAdd();
      });
  };

  const handleAddPatient = (values: IFormPatientValues) => {
    console.log(values);
    success('Добавляем пациента...', 'Пациент успешно добавлен!');
  };

  return (
    <Modal
      className={styles.modal}
      width="550px"
      title="Добавить пациента"
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}>
      {contextHolder}
      <Divider />
      <FormPatient submitText="Добавить" onSubmit={handleAddPatient} loading={isLoading} />
    </Modal>
  );
};
