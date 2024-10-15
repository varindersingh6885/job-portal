import { useState } from "react";
import { useJobSearch } from "../apis/useJobSearch";
import { EmployerJobList } from "../components/EmployerJobList";
import { JobFilter } from "../components/JobFilter";
import { JobFilters } from "../types/job-filters";

export const JobSeekerSearchJobs = () => {
  const [jobFilters, setJobFilters] = useState<JobFilters>({});
  const { error, jobs } = useJobSearch(jobFilters);

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <div className="flex flex-col gap-4 mt-4 pb-4">
        <JobFilter onApplyFilters={setJobFilters} />
      </div>
      <EmployerJobList jobs={jobs} />
    </div>
  );
};
