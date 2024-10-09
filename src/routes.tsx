import { RouteObject } from "react-router-dom";

export const useAppRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <div>Landing Page</div>,
    },
    {
      path: "/employer/login",
      element: <div>Employer Login</div>,
    },
    {
      path: "/job-seeker/login",
      element: <div>Employer Login</div>,
    },
  ];
};
