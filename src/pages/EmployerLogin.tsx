import { SignIn, SignUp } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const EmployerLogin = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {mode === "signup" ? (
        <SignUp
          signInUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signin`}
          signInForceRedirectUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signin`}
          signInFallbackRedirectUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signin`}
          fallbackRedirectUrl={APP_ROUTES.EMPLOYER_DASHBOARD}
          unsafeMetadata={{
            role: "employer",
          }}
        />
      ) : (
        <SignIn
          signUpUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signup`}
          signUpFallbackRedirectUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signup`}
          signUpForceRedirectUrl={`${APP_ROUTES.EMPLOYER_ONBOARDING}?mode=signup`}
          fallbackRedirectUrl={APP_ROUTES.EMPLOYER_DASHBOARD}
        />
      )}
    </div>
  );
};
