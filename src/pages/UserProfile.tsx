import { useUser } from "@clerk/clerk-react";
import { UserProfileForm } from "../components/UserProfileForm";

export const UserProfile = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="py-10">
      <div className="flex justify-center items-center ">
        <div className="bg-ui-background-primary px-10 py-10 rounded-xl w-[80%]">
          <h1 className="text-2xl mb-6">Profile</h1>

          <UserProfileForm />
        </div>
      </div>
    </div>
  );
};
