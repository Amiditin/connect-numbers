import { Outlet, ScrollRestoration } from 'react-router-dom';

import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.auth}>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};
