import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLES } from "../types/user-roles";
import { APP_ROUTES } from "../constants.ts/app-routes";
export const AuthUserRoutes = ({ userRole }: { userRole: USER_ROLES }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  console.log("user meta data", user.unsafeMetadata);

  if (isLoaded && isSignedIn && user.unsafeMetadata.role !== userRole) {
    return <Navigate to={APP_ROUTES.LANDING} />;
  }

  return <Outlet />;
};
