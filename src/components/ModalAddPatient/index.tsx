import { useEffect, useState } from 'react';
import { Divider, message, Modal } from 'antd';
import dayjs from 'dayjs';

import { FormPatient, IFormPatientValues } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getPatientsStatus, patientsThunks } from '@/redux/patients';
import { getAuthUser } from '@/redux/auth';
import { extractNumbers } from '@/shared/utils';

import styles from './ModalAddPatient.module.scss';

interface IModalAddPatientProps {
  isModalOpen: boolean;
  onCancel?: () => void;
  onSuccessAdd?: () => void;
}

export const ModalAddPatient: React.FC<IModalAddPatientProps> = ({
  isModalOpen,
  onCancel,
  onSuccessAdd = () => undefined,
}) => {
  const user = useAppSelector(getAuthUser);

  if (!user) {
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const patientsStatus = useAppSelector(getPatientsStatus);

  useEffect(() => {
    if (isLoading && patientsStatus === 'success') {
      setIsLoading(false);
      messageApi.destroy();
      message.success('Пациент успешно добавлен!', 2);
      onSuccessAdd();
    }

    if (isLoading && patientsStatus === 'error') {
      setIsLoading(false);
      messageApi.destroy();
      message.error('Пациент не был добавлен!', 2);
    }
  }, [isLoading, patientsStatus]);

  const handleAddPatient = (values: IFormPatientValues) => {
    const { birthDay, birthMonth, birthYear, ...params } = values;

    setIsLoading(true);
    messageApi.open({ type: 'loading', content: 'Добавляем пациента...', duration: 0 });
    dispatch(
      patientsThunks.create({
        ...params,
        dateBirth: dayjs(`${birthYear}-${birthMonth}-${birthDay}`).format(),
        researcher: user.id,
        phone: extractNumbers(values.phone),
      }),
    );
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
