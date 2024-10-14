import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const JobSeekerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <div className=" bg-ui-background-primary mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h1>Jobs posted </h1>

          <Button
            label="Search jobs"
            onClick={() => navigate(APP_ROUTES.JOB_SEEKER_SEARCH_JOBS)}
          />
        </div>
      </div>

      <div className=" bg-ui-background-primary mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h1>List down applied jobs here</h1>
        </div>
      </div>
    </div>
  );
};
