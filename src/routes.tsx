import { RouteObject } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { APP_ROUTES } from "./constants.ts/app-routes";
import { EmployerLogin } from "./pages/EmployerLogin";
import { EmployerDashboard } from "./pages/EmployerDashboard";
import { EmployerCreateJob } from "./pages/EmployerCreateJob";
import { AppLayout } from "./components/AppLayout";

export const useAppRoutes = (): RouteObject[] => {
  return [
    {
      path: APP_ROUTES.LANDING,
      element: <LandingPage />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: APP_ROUTES.JOB_SEEKER_LOGIN,
          element: <div>Job Seeker Login</div>,
        },
        {
          path: APP_ROUTES.JOB_SEEKER_REGISTER,
          element: <div>Job Seeker Register</div>,
        },
        {
          path: APP_ROUTES.EMPLOYER_LOGIN,
          element: <EmployerLogin />,
        },
        {
          path: APP_ROUTES.EMPLOYER_REGISTER,
          element: <div>Employer Register</div>,
        },
        {
          path: APP_ROUTES.EMPLOYER_DASHBOARD,
          element: <EmployerDashboard />,
        },
        {
          path: APP_ROUTES.EMPLOYER_CREATE_JOB,
          element: <EmployerCreateJob />,
        },
      ],
    },
  ];
};
