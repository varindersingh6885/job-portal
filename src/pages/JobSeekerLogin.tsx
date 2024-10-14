import { SignIn, SignUp } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const JobSeekerLogin = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {mode === "signup" ? (
        <SignUp
          signInUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signin`}
          signInForceRedirectUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signin`}
          signInFallbackRedirectUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signin`}
          fallbackRedirectUrl={APP_ROUTES.JOB_SEEKER_DASHBOARD}
          unsafeMetadata={{
            role: "candidate",
          }}
        />
      ) : (
        <SignIn
          signUpUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signup`}
          signUpFallbackRedirectUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signup`}
          signUpForceRedirectUrl={`${APP_ROUTES.JOB_SEEKER_ONBOARDING}?mode=signup`}
          fallbackRedirectUrl={APP_ROUTES.JOB_SEEKER_DASHBOARD}
        />
      )}
    </div>
  );
};
