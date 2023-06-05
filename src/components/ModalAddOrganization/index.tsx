import { useEffect, useState } from 'react';
import { Divider, message, Modal } from 'antd';

import { FormOrganization, IFormOrganizationValues } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getOrganizationsStatus, organizationsThunks } from '@/redux/organizations';
import { extractNumbers } from '@/shared/utils';

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
  const dispatch = useAppDispatch();
  const organizationsStatus = useAppSelector(getOrganizationsStatus);

  useEffect(() => {
    if (isLoading && organizationsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      message.success('Организация успешно добавлена!', 2);
      onSuccessAdd();
    }

    if (isLoading && organizationsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Организация не была добавлена!', 2);
    }
  }, [isLoading, organizationsStatus]);

  const handleAddOrganization = (values: IFormOrganizationValues) => {
    setIsLoading(true);
    messageApi.open({ type: 'loading', content: 'Добавляем организацию...', duration: 0 });
    dispatch(
      organizationsThunks.create({
        ...values,
        phone: extractNumbers(values.phone),
        abbreviation: values.abbreviation || null,
        website: values.website || null,
        address: values.address || null,
      }),
    );
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
      <FormOrganization
        submitText="Добавить"
        onSubmit={handleAddOrganization}
        loading={isLoading}
      />
    </Modal>
  );
};
