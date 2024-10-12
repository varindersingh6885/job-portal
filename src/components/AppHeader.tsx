import { Link } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants";

export const AppHeader = () => {
  return (
    <div className="bg-ui-background-primary py-4 px-4 shadow-ui-4">
      <h3 className="font-bold text-lg">
        <Link to={APP_ROUTES.LANDING} className="text-ui-text-primary">
          JobMart
        </Link>
      </h3>
    </div>
  );
};
