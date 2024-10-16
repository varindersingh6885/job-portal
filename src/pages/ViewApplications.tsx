import { useParams } from "react-router-dom";
import { useFetchJobDetails } from "../apis/useFetchJobDetails";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { useUser } from "@clerk/clerk-react";
import { useFetchApplications } from "../apis/useFetchApplications";
import { ApplicationListCard } from "../components/ApplicationListCard";

export const ViewApplications = () => {
  const { jobId } = useParams();
  const { jobDetails } = useFetchJobDetails(jobId);

  const { user, isLoaded: isUserLoaded } = useUser();

  const { applicationDetails, totalApplications } = useFetchApplications(jobId);

  if (!jobDetails || !isUserLoaded || !user) {
    return null;
  }
  return (
    <div className="py-10">
      <div className="bg-ui-background-primary px-10 py-10 rounded-xl w-[80%] m-auto">
        <div className="border-0 border-b border-solid border-ui-border-primary pb-2 flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold leading-none">
              {jobDetails.title}
            </h1>
            <div className="flex flex-col text-sm mt-2">
              <p>
                Location:{" "}
                {[jobDetails.country, jobDetails.state, jobDetails.city].join(
                  ", "
                )}
              </p>
              <p>
                {
                  WORK_MODE_SELECT_ITEMS.find(
                    (wm) => wm.value === jobDetails.workMode
                  )?.label
                }
              </p>
              <p>
                Job Id: {jobDetails.id} | Posted on: {jobDetails.createdAt}
              </p>
            </div>
          </div>
          <div>
            <div>
              <img
                className="h-[56px] w-[56px]"
                src={jobDetails.companyLogoUrl}
                alt={jobDetails.companyName}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-center py-4 text-3xl">
            Applications: {totalApplications}
          </p>
        </div>

        <div className="bg-ui-background-primary rounded-lg py-2 flex-1 flex flex-col gap-1">
          {applicationDetails?.map((applicationDetail) => (
            <ApplicationListCard
              key={applicationDetail.id}
              {...applicationDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
