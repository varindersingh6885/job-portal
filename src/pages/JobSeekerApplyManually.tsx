import { Link, useParams } from "react-router-dom";
import { useFetchJobDetails } from "../apis/useFetchJobDetails";
import { ManualApplicationForm } from "../components/ManualApplicationForm";
import { ApplicationManualPayload } from "../types/application";
import { useCreateApplication } from "../apis/useCreateApplication";
import { useCandidateApplicationPresent } from "../apis/useCandidateApplicationPresent";
import { useUser } from "@clerk/clerk-react";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const JobSeekerApplyManually = () => {
  const { jobId } = useParams();
  const { jobDetails } = useFetchJobDetails(jobId);
  const { user } = useUser();

  const { createApplication } = useCreateApplication();

  const { applicationPresent, isLoading, checkCandidateApplicationPresent } =
    useCandidateApplicationPresent(jobId);

  if (!jobId || !jobDetails || isLoading || !user) {
    return null;
  }

  const handleCreateApplication = async (payload: ApplicationManualPayload) => {
    if (createApplication) {
      const { status } = await createApplication(payload);

      if (status === 201) {
        checkCandidateApplicationPresent(jobId);
      }
    }
  };

  return (
    <div className="py-10">
      <div className="bg-ui-background-primary px-10 py-10 rounded-xl w-[80%] m-auto">
        <p className="text-3xl font-semibold">
          Application: {jobDetails.title}
        </p>

        {!applicationPresent ? (
          <div className="mt-4">
            <ManualApplicationForm
              candidateId={user?.id}
              jobId={jobId}
              onSubmit={handleCreateApplication}
            />
          </div>
        ) : (
          <div className="py-4">
            <h3>You have submitted the application!</h3>

            <Link
              to={APP_ROUTES.JOB_SEEKER_SEARCH_JOBS}
              className="text-ui-text-primary font-bold hover:underline rounded-lg"
            >
              Continue job search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
