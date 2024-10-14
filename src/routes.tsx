import { RouteObject } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { APP_ROUTES } from "./constants.ts/app-routes";
import { EmployerLogin } from "./pages/EmployerLogin";
import { EmployerDashboard } from "./pages/EmployerDashboard";
import { EmployerCreateJob } from "./pages/EmployerCreateJob";
import { AppLayout } from "./components/AppLayout";
import { JobSeekerLogin } from "./pages/JobSeekerLogin";
import { UserProfile } from "./pages/UserProfile";
import { JobSeekerDashboard } from "./pages/JobSeekerDashboard";
import { JobSeekerSearchJobs } from "./pages/JobSeekerSearchJobs";

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
          path: APP_ROUTES.JOB_SEEKER_ONBOARDING,
          element: <JobSeekerLogin />,
        },
        {
          path: APP_ROUTES.JOB_SEEKER_DASHBOARD,
          element: <JobSeekerDashboard />,
        },
        {
          path: APP_ROUTES.JOB_SEEKER_SEARCH_JOBS,
          element: <JobSeekerSearchJobs />,
        },
        {
          path: APP_ROUTES.EMPLOYER_ONBOARDING,
          element: <EmployerLogin />,
        },
        {
          path: APP_ROUTES.EMPLOYER_DASHBOARD,
          element: <EmployerDashboard />,
        },
        {
          path: APP_ROUTES.EMPLOYER_CREATE_JOB,
          element: <EmployerCreateJob />,
        },
        {
          path: APP_ROUTES.USER_PROFILE,
          element: <UserProfile />,
        },
      ],
    },
  ];
};
