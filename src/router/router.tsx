import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/components';
import { MainLayout, ResearcherLayout, AdminLayout, AuthLayout } from '@/layouts';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  OrganizationsPage,
  PatientProfilePage,
  PatientsPage,
  PatientTestPage,
  ProfilePage,
  RegisterPage,
  ResearchersPage,
} from '@/pages';

import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: routes.adminRoot.path,
        element: <AdminLayout />,
        children: [
          { path: routes.organizations.path, element: <OrganizationsPage /> },
          { path: routes.researchers.path, element: <ResearchersPage /> },
        ],
      },
      {
        path: routes.root.path,
        element: <ResearcherLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: routes.profile.path, element: <ProfilePage /> },
          { path: routes.patients.path, element: <PatientsPage /> },
          { path: routes.patientProfile.path, element: <PatientProfilePage /> },
          { path: routes.organizations.path, element: <OrganizationsPage /> },
        ],
      },
      {
        path: routes.authRoot.path,
        element: <AuthLayout />,
        children: [
          { path: routes.authLogin.path, element: <LoginPage /> },
          { path: routes.authRegister.path, element: <RegisterPage /> },
          { path: routes.authForgotPassword.path, element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
  { path: routes.notFound.path, element: <NotFoundPage /> },
  {
    path: routes.testPatient.path,
    element: <PatientTestPage />,
    errorElement: <ErrorBoundary />,
  },
]);
