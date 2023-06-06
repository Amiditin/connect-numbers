import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector, usePageTitles } from '@/shared/hooks';
import { authThunks, getAuthUser } from '@/redux/auth';
import { routes } from '@/router';
import { Spin } from 'antd';

export const MainLayout: React.FC = () => {
  usePageTitles(routes);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(getAuthUser);

  useEffect(() => {
    dispatch(authThunks.profile()).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!authUser) {
        navigate(routes.authLogin.path);
        return;
      }
      // Todo: Роль админа
      if (authUser && authUser?.email === 'admin@mail.ru') {
        navigate(routes.organizations.path);
        return;
      }

      navigate(routes.profile.path);
    }
  }, [authUser, isLoading]);

  // Todo: При первом рендере белый экран
  return isLoading ? <Spin tip="Загрузка" size="large" style={{ height: '100vh' }} /> : <Outlet />;
};
