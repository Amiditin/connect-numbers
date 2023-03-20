import { useState } from 'react';
import { Divider, message, Modal } from 'antd';

import { FormOrganization, IFormOrganizationValues } from '@/components';

import styles from './ModalEditOrganization.module.scss';

interface IModalEditOrganizationProps {
  isModalOpen: boolean;
  onCancel?: () => void;
  onSuccessEdit?: () => void;
  initialValues?: IFormOrganizationValues;
}

export const ModalEditOrganization: React.FC<IModalEditOrganizationProps> = ({
  isModalOpen,
  onCancel,
  onSuccessEdit = () => {},
  initialValues,
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
        onSuccessEdit();
      });
  };

  const handleAddPatient = (values: IFormOrganizationValues) => {
    console.log(values);
    success('Изменяем организацию...', 'Организация успешно изменена!');
  };

  return (
    <Modal
      className={styles.modal}
      width="550px"
      title="Редактировать организацию"
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}>
      {contextHolder}
      <Divider />
      <FormOrganization
        submitText="Сохранить"
        onSubmit={handleAddPatient}
        loading={isLoading}
        initialValues={initialValues}
      />
    </Modal>
  );
};
