import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 text-center px-10 py-20 rounded-lg shadow-ui-4 bg-ui-background-primary">
        <h1 className="text-5xl">Welcome to JobMart</h1>
        <h2 className="text-3xl">Continue as</h2>
        <div className="grid grid-cols-2 gap-6">
          <Button
            label="Job Seeker"
            onClick={() => navigate(APP_ROUTES.JOB_SEEKER_ONBOARDING)}
          />
          <Button
            label="Employer"
            onClick={() => navigate(APP_ROUTES.EMPLOYER_ONBOARDING)}
          />
        </div>
      </div>
    </div>
  );
};
