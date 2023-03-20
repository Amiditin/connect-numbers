import { useState } from 'react';
import { Divider, message, Modal } from 'antd';

import { FormOrganization, IFormOrganizationValues } from '@/components';

import styles from './ModalAddOrganization.module.scss';

interface IModalAddOrganizationProps {
  isModalOpen: boolean;
  onCancel?: () => void;
  onSuccessAdd?: () => void;
}

export const ModalAddOrganization: React.FC<IModalAddOrganizationProps> = ({
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

  const handleAddPatient = (values: IFormOrganizationValues) => {
    console.log(values);
    success('Добавляем организацию...', 'Организация успешно добавлена!');
  };

  return (
    <Modal
      className={styles.modal}
      width="550px"
      title="Добавить организацию"
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}>
      {contextHolder}
      <Divider />
      <FormOrganization submitText="Добавить" onSubmit={handleAddPatient} loading={isLoading} />
    </Modal>
  );
};
