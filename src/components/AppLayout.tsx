import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { useUser } from "@clerk/clerk-react";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { createContext } from "react";
import { CandidateProfileResponse } from "../types/candidate-profile";
import { useFetchCandidateProfile } from "../apis/useFetchCandidateProfile";

export const UserProfileContext = createContext<{
  profileData: CandidateProfileResponse | null;
  isUserProfileLoading;
}>({
  isUserProfileLoading: true,
  profileData: null,
});

export const AppLayout = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { profileData, isLoading: isUserProfileLoading } =
    useFetchCandidateProfile();

  if (!isLoaded || isUserProfileLoading) {
    return null;
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to={APP_ROUTES.LANDING} />;
  }

  return (
    <UserProfileContext.Provider value={{ profileData, isUserProfileLoading }}>
      <div className="w-screen h-screen overflow-auto flex flex-col">
        <AppHeader />
        <div className="flex-1 overflow-auto ">
          <Outlet />
        </div>
      </div>
    </UserProfileContext.Provider>
  );
};
