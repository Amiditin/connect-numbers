import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';

import { routes } from '@/router';
import { useAppSelector } from '@/shared/hooks';
import { getIsAuth } from '@/redux/auth';

import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => {
  const isAuthUser = useAppSelector(getIsAuth);

  if (isAuthUser) {
    return <Navigate to={routes.home} />;
  }

  return (
    <div className={styles.auth}>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};
