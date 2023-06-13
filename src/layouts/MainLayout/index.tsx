import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector, usePageTitles } from '@/shared/hooks';
import { authThunks, getAuthUser } from '@/redux/auth';
import { routes } from '@/router';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  usePageTitles(routes);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(getAuthUser);

  useEffect(() => {
    dispatch(authThunks.profile())
      .finally(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (!authUser) {
        navigate(routes.authLogin.path);
        return;
      }

      if (location.pathname === routes.authLogin.path) {
        if (authUser && authUser?.email === 'admin@mail.ru') {
          navigate(routes.organizations.path);
        } else {
          navigate(routes.profile.path);
        }
      }
    }
  }, [authUser, isLoading, location.pathname, navigate]);

  return isLoading ? <Spin className={styles.spin} size="large" tip="Загрузка" /> : <Outlet />;
};
