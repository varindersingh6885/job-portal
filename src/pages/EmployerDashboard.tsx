import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../shared/constants";

export const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        <Button
          label="Create Job"
          onClick={() => navigate(APP_ROUTES.EMPLOYER_CREATE_JOB)}
        />
      </div>
    </div>
  );
};
