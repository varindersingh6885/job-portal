import { Link } from "react-router-dom";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { JobListItem } from "../types/job";
import { JobListCard } from "./JobListCard";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const EmployerJobList = ({ jobs }: { jobs: JobListItem[] }) => {
  return (
    <div>
      {jobs.map((jobDetail) => (
        <div
          className="flex justify-between items-center hover:bg-ui-background-primary-highlight rounded-sm"
          key={jobDetail.id}
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

          <div className="flex flex-col items-end gap-2 p-4">
            <Link
              to={`${APP_ROUTES.VIEW_JOB.replace(
                ":jobId",
                jobDetail.id.toString()
              )}`}
              className="text-ui-text-primary font-bold hover:underline rounded-lg"
              target="_blank"
            >
              View details
            </Link>
            <Link
              to={`${APP_ROUTES.EMPLOYER_VIEW_APPLICATIONS.replace(
                ":jobId",
                jobDetail.id.toString()
              )}`}
              className="text-ui-text-primary font-bold hover:underline rounded-lg"
              target="_blank"
            >
              View applications
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
