import { useEffect, useState } from 'react';
import { Divider, message, Modal } from 'antd';

import { FormOrganization, IFormOrganizationValues } from '@/components';
import { getOrganizationsStatus, organizationsThunks } from '@/redux/organizations';
import { extractNumbers } from '@/shared/utils';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { IOrganizationModel } from '@/shared/api/models';

import styles from './ModalEditOrganization.module.scss';

interface IModalEditOrganizationProps {
  isModalOpen: boolean;
  onCancel?: () => void;
  onSuccessEdit?: () => void;
  organization?: IOrganizationModel;
}

export const ModalEditOrganization: React.FC<IModalEditOrganizationProps> = ({
  isModalOpen,
  onCancel,
  onSuccessEdit = () => undefined,
  organization,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const organizationsStatus = useAppSelector(getOrganizationsStatus);

  useEffect(() => {
    if (isLoading && organizationsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      message.success('Организация успешно изменена!', 2);
      onSuccessEdit();
    }

    if (isLoading && organizationsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Организация не была изменена!', 2);
    }
  }, [isLoading, messageApi, onSuccessEdit, organizationsStatus]);

  const handleEditOrganization = (values: IFormOrganizationValues) => {
    setIsLoading(true);
    messageApi.open({ type: 'loading', content: 'Изменяем организацию...', duration: 0 });
    dispatch(
      organizationsThunks.update({
        ...values,
        id: organization?.id || '',
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
      title="Редактировать организацию"
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}>
      {contextHolder}
      <Divider />
      <FormOrganization
        submitText="Сохранить"
        onSubmit={handleEditOrganization}
        loading={isLoading}
        initialValues={structuredClone(organization)}
      />
    </Modal>
  );
};
