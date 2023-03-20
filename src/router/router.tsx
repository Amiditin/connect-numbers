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
  PatientProfilePage,
  OrganizationsPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <MainLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.notFound.path,
        element: <NotFoundPage />,
      },
      {
        path: routes.profile.path,
        element: <ProfilePage />,
      },
      {
        path: routes.patients.path,
        element: <PatientsPage />,
      },
      {
        path: routes.patientProfile.path,
        element: <PatientProfilePage />,
      },
      {
        path: routes.organizations.path,
        element: <OrganizationsPage />,
      },
    ],
  },
  {
    path: routes.authRoot.path,
    element: <AuthLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      {
        path: routes.authLogin.path,
        element: <LoginPage />,
      },
      {
        path: routes.authRegister.path,
        element: <RegisterPage />,
      },
      {
        path: routes.authForgotPassword.path,
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);
