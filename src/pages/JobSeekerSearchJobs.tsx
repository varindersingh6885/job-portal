import { useState } from "react";
import { useJobSearch } from "../apis/useJobSearch";
import { JobFilter } from "../components/JobFilter";
import { JobFilters } from "../types/job-filters";
import { JobListCard } from "../components/JobListCard";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const JobSeekerSearchJobs = () => {
  const [jobFilters, setJobFilters] = useState<JobFilters>({});
  const { jobs } = useJobSearch(jobFilters);

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <div className="flex flex-col gap-4 mt-4 pb-4">
        <JobFilter onApplyFilters={setJobFilters} />
      </div>
      <div className="bg-ui-background-primary rounded-lg px-2 py-2 flex-1 flex flex-col gap-1">
        {jobs.map((jobDetail) => (
          <div className="flex justify-between items-center hover:bg-ui-background-primary-highlight rounded-sm">
            <JobListCard
              key={jobDetail.id}
              city={jobDetail.city}
              companyLogoUrl={jobDetail.companyUrl}
              companyName={jobDetail.company}
              country={jobDetail.country}
              createdAt={new Date(jobDetail.createdAt).toLocaleDateString()}
              jobTitle={jobDetail.title}
              state={jobDetail.state}
              workMode={
                WORK_MODE_SELECT_ITEMS.find(
                  (wm) => wm.value === jobDetail.workMode
                )?.label ?? ""
              }
            />
            <Link
              to={`${APP_ROUTES.VIEW_JOB.replace(
                ":jobId",
                jobDetail.id.toString()
              )}`}
              className="text-ui-text-primary font-bold hover:underline p-4 rounded-lg"
              target="_blank"
            >
              View & Apply
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
