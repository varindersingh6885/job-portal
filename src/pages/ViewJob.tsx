import { useNavigate, useParams } from "react-router-dom";
import { useFetchJobDetails } from "../apis/useFetchJobDetails";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { useCandidateApplicationPresent } from "../apis/useCandidateApplicationPresent";

export const ViewJob = () => {
  const { jobId } = useParams();
  const { jobDetails } = useFetchJobDetails(jobId);

  const navigate = useNavigate();

  const { applicationPresent } = useCandidateApplicationPresent(jobId);

  if (!jobDetails) {
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

        <div className="mt-4">
          <h2 className="font-semibold">Job requirements</h2>
          <div className="pl-4">
            <p>Minimum experience (in years): {jobDetails.minExperience}</p>
            <p>Maximum experience (in years): {jobDetails.maxExperience}</p>

            <div className="mt-2">
              <p>Skills required</p>
              <div className="flex gap-2 flex-wrap">
                {jobDetails.skills.map((skill) => (
                  <p
                    key={skill}
                    className="border border-1 border-solid border-ui-border-primary rounded-[4px] px-2 bg-ui-button-secondary"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold">Job description</h2>
          <div className="pl-4">
            <p>{jobDetails.description}</p>
          </div>
        </div>

        {(jobDetails.contactEmail || jobDetails.contactNumber) && (
          <div className="mt-4">
            <h2 className="font-semibold">Contact details</h2>
            <div className="pl-4">
              <p>Email id: {jobDetails.contactEmail}</p>
              <p>Phone number: {jobDetails.contactNumber}</p>
            </div>
          </div>
        )}

        <div>
          <div className="mt-4">
            {jobDetails.descriptionDocumentUrl && (
              <a
                href={jobDetails.descriptionDocumentUrl}
                download={jobDetails.descriptionDocumentFileName}
                className="text-ui-link-primary underline"
                target="_blank"
                rel="noreferrer"
              >
                Download job description document
              </a>
            )}
          </div>
        </div>

        {!applicationPresent ? (
          <div className="mt-4 flex justify-end gap-4">
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
            />
            <Button label="Quick Apply" />
          </div>
        ) : (
          <p className="text-end mt-4 text-ui-text-info-primary font-semibold">
            You have already applied for this job!
          </p>
        )}
      </div>
    </div>
  );
};
