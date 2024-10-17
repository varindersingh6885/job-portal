import { Link } from "react-router-dom";
import { APPLICATION_STATUS_SELECT_ITEMS } from "../constants.ts/job-filters";
import { ApplicationDetails } from "../types/application";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const ApplicationListCard = ({
  createdAt,
  expectedSalary,
  resumeName,
  resumeUrl,
  status,
  candidateNote,
  candidateFirstName,
  candidateId,
}: ApplicationDetails) => {
  return (
    <div className="p-4 hover:bg-ui-background-primary-highlight rounded-sm">
      <div className="flex justify-between items-center mb-2">
        <Link
          to={`${APP_ROUTES.EMPLOYER_VIEW_CANDIDATE_PROFILE.replace(
            ":candidateId",
            candidateId.toString()
          )}`}
          target="_blank"
        >
          <p className="text-2xl font-semibold hover:text-ui-text-info-primary">
            {candidateFirstName}
          </p>
        </Link>
        <div className="text-end">
          <p>Applied on: {createdAt}</p>
          <p>
            Status:{" "}
            {
              APPLICATION_STATUS_SELECT_ITEMS.find(
                (item) => item.value === status
              )?.label
            }
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>Expected salary: INR {expectedSalary}</p>
          {candidateNote && <p>Note: {candidateNote}</p>}
        </div>
        <div>
          <a
            href={resumeUrl}
            download={resumeName}
            className="text-ui-link-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            Download resume
          </a>
        </div>
      </div>

      <div></div>
    </div>
  );
};
