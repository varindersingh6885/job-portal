import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../shared/constants";
import { JobFilter } from "../components/JobFilter";

export const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 text-ui-text-primary">
      <div className=" bg-ui-background-primary mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h1>Jobs posted {`(37)`}</h1>

          <Button
            label="Create new job"
            onClick={() => navigate(APP_ROUTES.EMPLOYER_CREATE_JOB)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div>
          <JobFilter />
        </div>

        <div className=" bg-ui-background-primary rounded-lg p-4 flex-1">
          <div className="grid grid-cols-6 ">
            <div>S.No</div>
            <div className="col-span-3">Job title</div>
            <div>Date created</div>
            <div>No. of applicants</div>
          </div>

          <div className="pt-4 border-0 border-t border-solid border-ui-background-secondary mt-4 flex flex-col gap-4">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="grid grid-cols-6">
                  <div>{index + 1}</div>
                  <div className="col-span-3">SDE {index + 1}</div>
                  <div>24 October 2023</div>
                  <div>30</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
