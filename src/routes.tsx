import { RouteObject } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { APP_ROUTES } from "./shared/constants";

export const useAppRoutes = (): RouteObject[] => {
  return [
    {
      path: APP_ROUTES.LANDING,
      element: <LandingPage />,
    },
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
      element: <div>Employer Login</div>,
    },
    {
      path: APP_ROUTES.EMPLOYER_REGISTER,
      element: <div>Employer Register</div>,
    },
  ];
};
