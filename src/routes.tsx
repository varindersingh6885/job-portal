import { Navigate, RouteObject } from "react-router-dom";
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
import { ViewJob } from "./pages/ViewJob";
import { JobSeekerApplyManually } from "./pages/JobSeekerApplyManually";
import { ViewApplications } from "./pages/ViewApplications";
import { AuthEmployerRoutes } from "./components/AuthEmployerRoutes";
import { USER_ROLES } from "./types/user-roles";

export const useAppRoutes = (): RouteObject[] => {
  return [
    {
      path: APP_ROUTES.LANDING,
      element: <LandingPage />,
    },
    {
      path: APP_ROUTES.JOB_SEEKER_ONBOARDING,
      element: <JobSeekerLogin />,
    },
    {
      path: APP_ROUTES.EMPLOYER_ONBOARDING,
      element: <EmployerLogin />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <AuthEmployerRoutes userRole={USER_ROLES.JOB_SEEKER} />,
          children: [
            {
              path: APP_ROUTES.JOB_SEEKER_DASHBOARD,
              element: <JobSeekerDashboard />,
            },
            {
              path: APP_ROUTES.JOB_SEEKER_SEARCH_JOBS,
              element: <JobSeekerSearchJobs />,
            },
            {
              path: APP_ROUTES.JOB_SEEKER_APPLY_JOB,
              element: <JobSeekerApplyManually />,
            },
            {
              path: APP_ROUTES.USER_PROFILE,
              element: <UserProfile />,
            },
          ],
        },
        {
          path: APP_ROUTES.VIEW_JOB,
          element: <ViewJob />,
        },
        {
          path: "",
          element: <AuthEmployerRoutes userRole={USER_ROLES.EMPLOYER} />,
          children: [
            {
              path: APP_ROUTES.EMPLOYER_DASHBOARD,
              element: <EmployerDashboard />,
            },
            {
              path: APP_ROUTES.EMPLOYER_CREATE_JOB,
              element: <EmployerCreateJob />,
            },
            {
              path: APP_ROUTES.EMPLOYER_VIEW_APPLICATIONS,
              element: <ViewApplications />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={APP_ROUTES.LANDING} />,
    },
  ];
};
