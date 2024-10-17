import { useSession } from "@clerk/clerk-react";
import { CandidateProfileResponse } from "../types/candidate-profile";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";

export const useFetchCandidateProfile = (candidateId: string) => {
  const { session, isLoaded } = useSession();

  const [profileData, setProfileData] = useState<CandidateProfileResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchProfile = async () => {
    setIsLoading(true);
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    if (session) {
      const { data, error } = await supabase
        .from("user_profiles")
        .select(
          "*, cities(id, name), states(id, name), countries(id, name), user_profile_skills ( skill_id, skills ( name ) )"
        )
        .eq("user_id", candidateId)
        .maybeSingle();

      setError(error?.message); // ! set Error message
      if (!error && data) {
        setProfileData({
          id: data.id,
          country: {
            label: data.countries?.name as string,
            value: data.countries?.id as number,
          },
          state: {
            label: data.states?.name as string,
            value: data.states?.id as number,
          },
          city: {
            label: data.cities?.name as string,
            value: data.cities?.id as number,
          },
          experience: data.experience as number,
          firstName: data.first_name as string,
          githubUsername: data.github_username as string,
          lastName: data.last_name as string,
          profileDescription: data.profile_description as string,
          resumeUrl: data.resume_url as string,
          resumeName: data.resume_name as string,
          email: data.email ?? "",
          phoneNumber: data.phone_number ?? "",
          skills: data.user_profile_skills.map((s) => ({
            label: s.skills?.name as string,
            value: s.skill_id as number,
          })),
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
