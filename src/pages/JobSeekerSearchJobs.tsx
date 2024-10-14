import { useJobSearch } from "../apis/useJobSearch";
import { EmployerJobList } from "../components/EmployerJobList";
import { JobFilter } from "../components/JobFilter";

export const JobSeekerSearchJobs = () => {
  const { error, jobs } = useJobSearch();

  return (
    <div className="px-4 py-2 text-ui-text-primary">
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
