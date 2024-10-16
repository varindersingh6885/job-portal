import { useState } from "react";
import { useJobSearch } from "../apis/useJobSearch";
import { JobFilter } from "../components/JobFilter";
import { JobFilters } from "../types/job-filters";
import { JobListCard } from "../components/JobListCard";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { Pagination } from "../components/Pagination";
import { ResultsNotFound } from "../components/ResultsNotFound";
import { Loader } from "../components/Loader";

export const JobSeekerSearchJobs = () => {
  const [jobFilters, setJobFilters] = useState<JobFilters>({});

  const [currPage, setCurrPage] = useState(1);
  const { jobs, totalJobs, isLoading } = useJobSearch(jobFilters, currPage);

  return (
    <div className="px-4 py-2 text-ui-text-primary">
      <h1 className="text-2xl text-center bg-ui-background-primary rounded-lg p-2">
        Search Jobs
      </h1>
      <div className="flex flex-col gap-4 mt-2 pb-4">
        <JobFilter
          onApplyFilters={(filters) => {
            setJobFilters(filters);
            setCurrPage(1);
          }}
        />
      </div>
      <div className="bg-ui-background-primary rounded-lg px-2 py-2 flex-1 flex flex-col gap-1 min-h-[100px] justify-between">
        {isLoading && (
          <div className="flex-1 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {jobs.map((jobDetail) => (
          <div
            key={jobDetail.id}
            className="flex justify-between items-center hover:bg-ui-background-primary-highlight rounded-sm"
          >
            <JobListCard
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

        {!isLoading && totalJobs === 0 && (
          <ResultsNotFound message="No jobs found!" />
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
  );
};
