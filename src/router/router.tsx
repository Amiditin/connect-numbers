import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { MainLayout, MainErrorBoundary, AuthLayout } from '@/layouts';
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ProfilePage,
  PatientsPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <MainLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.notFound,
        element: <NotFoundPage />,
      },
      {
        path: routes.profile,
        element: <ProfilePage />,
      },
      {
        path: routes.patients,
        element: <PatientsPage />,
      },
    ],
  },
  {
    path: routes.auth.root,
    element: <AuthLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      {
        path: routes.auth.login,
        element: <LoginPage />,
      },
      {
        path: routes.auth.register,
        element: <RegisterPage />,
      },
      {
        path: routes.auth.forgotPassword,
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);
