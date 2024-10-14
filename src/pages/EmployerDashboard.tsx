import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { JobFilter } from "../components/JobFilter";
import { EmployerJobList } from "../components/EmployerJobList";
import { useFetchCreatedJobs } from "../apis/useFetchCreatedJobs";

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { error, jobs } = useFetchCreatedJobs();

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <div className=" bg-ui-background-primary mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h1>Jobs posted {`(${jobs.length})`}</h1>

          <Button
            label="Create new job"
            onClick={() => navigate(APP_ROUTES.EMPLOYER_CREATE_JOB)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4 pb-4">
        <div>
          <JobFilter
            onApplyFilters={() => {
              console.log("handle apply filters");
            }}
          />
        </div>
        <EmployerJobList jobs={jobs} />
      </div>
    </div>
  );
};
