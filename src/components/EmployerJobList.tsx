import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { JobListItem } from "../types/job";
import { JobListCard } from "./JobListCard";

export const EmployerJobList = ({ jobs }: { jobs: JobListItem[] }) => {
  return (
    <div className="bg-ui-background-primary rounded-lg px-2 py-2 flex-1 flex flex-col gap-1">
      {jobs.map((jobDetail) => (
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
            WORK_MODE_SELECT_ITEMS.find((wm) => wm.value === jobDetail.workMode)
              ?.label ?? ""
          }
        />
      ))}
    </div>
  );
};
