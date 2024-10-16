import { useNavigate, useParams } from "react-router-dom";
import { useFetchJobDetails } from "../apis/useFetchJobDetails";
import { ManualApplicationForm } from "../components/ManualApplicationForm";
import { useUser } from "@clerk/clerk-react";
import { ApplicationManualPayload } from "../types/application";
import { useCreateApplication } from "../apis/useCreateApplication";
import { useCandidateApplicationPresent } from "../apis/useCandidateApplicationPresent";

export const JobSeekerApplyManually = () => {
  const { jobId } = useParams();
  const { jobDetails } = useFetchJobDetails(jobId);
  const { isLoaded, user, isSignedIn } = useUser();

  const navigate = useNavigate();

  const { createApplication } = useCreateApplication();

  const { applicationPresent, isLoading, checkCandidateApplicationPresent } =
    useCandidateApplicationPresent(user?.id, jobId);

  if (!jobId || !jobDetails || !isLoaded || !isSignedIn || isLoading) {
    return null;
  }

  const handleCreateApplication = async (payload: ApplicationManualPayload) => {
    if (createApplication) {
      const { status } = await createApplication(payload);

      if (status === 201) {
        checkCandidateApplicationPresent(user?.id, jobId);
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
          </div>
        )}
      </div>
    </div>
  );
};
