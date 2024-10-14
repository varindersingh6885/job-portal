import { useSession, useUser } from "@clerk/clerk-react";
import { CandidateProfile } from "../types/candidate-profile";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";

export const useFetchCandidateProfile = () => {
  const { session, isLoaded } = useSession();
  const { user } = useUser();

  const [profileData, setProfileData] = useState<CandidateProfile>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchProfile = async () => {
    setIsLoading(true);
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    if (session && user) {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*, cities(id, name), states(id, name), countries(id, name)")
        .eq("user_id", user.id)
        .maybeSingle();

      setError(error?.message); // ! set Error message
      if (!error && data) {
        setProfileData({
          cityId: data.city_id as number,
          countryId: data.country_id as number,
          experience: data.experience as number,
          firstName: data.first_name as string,
          githubUsername: data.github_username as string,
          lastName: data.last_name as string,
          profileDescription: data.profile_description as string,
          resumeUrl: data.resume_url as string,
          email: "",
          skills: [],
          stateId: data.state_id as number,
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoaded) fetchProfile();
  }, [isLoaded]);

  return { profileData, error, isLoading };
};
