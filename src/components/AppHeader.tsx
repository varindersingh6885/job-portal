import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { UserButton, useUser } from "@clerk/clerk-react";

export const AppHeader = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="bg-ui-background-primary py-4 px-4 shadow-ui-4 flex justify-between items-center">
      <h3 className="font-bold text-lg">
        <Link to={APP_ROUTES.LANDING} className="text-ui-text-primary">
          JobMart
        </Link>
      </h3>

      {isLoaded && isSignedIn && <UserButton showName />}
    </div>
  );
};
