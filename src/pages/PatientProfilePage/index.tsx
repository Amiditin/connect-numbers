import { useParams } from 'react-router-dom';

import styles from './PatientProfilePage.module.scss';

export const PatientProfilePage: React.FC = () => {
  const params = useParams();

  return <div>Профиль пациента {params?.id || 'Неизвестно'}</div>;
};
