import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector, usePageTitles } from '@/shared/hooks';
import { authThunks, getAuthStatus, getAuthUser } from '@/redux/auth';
import { routes } from '@/router';

export const MainLayout: React.FC = () => {
  usePageTitles(routes);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(getAuthUser);
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(authThunks.profile());
  }, []);

  useEffect(() => {
    if (!authUser) {
      navigate(routes.authLogin.path);
      return;
    }

    // Todo: Роль админа
    if (authUser && authUser?.email === 'admin@admin.ru') {
      navigate(routes.adminRoot.path);
      return;
    }

    navigate(routes.profile.path);
  }, [authUser]);

  // Todo: При первом рендере белый экран
  return <Outlet />;
};
