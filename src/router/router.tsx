import { createBrowserRouter } from 'react-router-dom';

import { MainLayout, MainErrorBoundary, AuthLayout } from '@/layouts';
import { HomePage, NotFoundPage, LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages';
import { routes } from './routes';

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
