import { useUser } from "@clerk/clerk-react";
import { useCreateApplication } from "../apis/useCreateApplication";
import { useFetchCandidateProfile } from "../apis/useFetchCandidateProfile";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { useCandidateApplicationPresent } from "../apis/useCandidateApplicationPresent";
import { USER_ROLES } from "../types/user-roles";

export const ApplyJobOptions = ({ jobId }: { jobId: string }) => {
  const { createApplication, isLoading } = useCreateApplication();
  const { user } = useUser();
  const { profileData } = useFetchCandidateProfile(user?.id);

  const { applicationPresent, checkCandidateApplicationPresent } =
    useCandidateApplicationPresent(jobId);

  const navigate = useNavigate();
  const { role = USER_ROLES.JOB_SEEKER } = user?.unsafeMetadata ?? {};

  const onApply = async () => {
    if (createApplication) {
      const { status } = await createApplication({
        jobId: +jobId,
        expectedSalary: profileData.expectedSalary,
        manualApplication: false,
        resumeName: profileData.resumeName,
        resumeUrl: profileData.resumeUrl,
        candidateId: profileData.userId,
      });

      if (status === 201) {
        checkCandidateApplicationPresent(jobId);
      }
    }
  };

  return (
    <div className="mt-4 flex justify-end gap-4">
      {!applicationPresent && role === USER_ROLES.JOB_SEEKER && (
        <>
          <Button
            label="Apply Manually"
            onClick={() =>
              navigate(
                `${APP_ROUTES.JOB_SEEKER_APPLY_JOB.replace(
                  ":jobId",
                  jobId ?? ""
                )}`
              )
            }
            disabled={isLoading}
          />
          <Button label="Quick Apply" onClick={onApply} disabled={isLoading} />
        </>
      )}

      {applicationPresent && role === USER_ROLES.JOB_SEEKER && (
        <p className="text-end mt-4 text-ui-text-info-primary font-semibold">
          You have successfully applied for this job!
          <Link
            to={APP_ROUTES.JOB_SEEKER_SEARCH_JOBS}
            className="text-ui-text-primary font-bold hover:underline p-4 rounded-lg"
          >
            Continue job search
          </Link>
        </p>
      )}
    </div>
  );
};
