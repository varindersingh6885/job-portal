import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { useUser } from "@clerk/clerk-react";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const AppLayout = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to={APP_ROUTES.LANDING} />;
  }

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col">
      <AppHeader />
      <div className="flex-1 overflow-auto ">
        <Outlet />
      </div>
    </div>
  );
};
