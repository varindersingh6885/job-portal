import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { JobFilter } from "../components/JobFilter";
import { EmployerJobList } from "../components/EmployerJobList";
import { useFetchCreatedJobs } from "../apis/useFetchCreatedJobs";
import { JobFilters } from "../types/job-filters";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobFilters, setJobFilters] = useState<JobFilters>({});
  const [currPage, setCurrPage] = useState(1);
  const { jobs, isLoading, totalJobs } = useFetchCreatedJobs(
    jobFilters,
    currPage
  );

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <div className=" bg-ui-background-primary rounded-lg p-4 mt-2">
        <div className="flex items-center justify-between">
          <h1>{!isLoading ? `Jobs posted (${totalJobs})` : ``}</h1>
          <Button
            label="Create new job"
            onClick={() => navigate(APP_ROUTES.EMPLOYER_CREATE_JOB)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 pb-4">
        <JobFilter onApplyFilters={setJobFilters} />

        <div className="bg-ui-background-primary rounded-lg px-2 py-2 flex-1 flex flex-col gap-1 min-h-[100px]">
          {isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <EmployerJobList jobs={jobs} />
          )}

          {!isLoading && totalJobs > 10 && (
            <Pagination
              currPage={currPage}
              onPageChange={setCurrPage}
              totalPages={Math.ceil(totalJobs / 10)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
