import { useMemo } from "react";
import { useSupabase } from "./useSupabase";
import { CandidateProfile } from "../types/candidate-profile";

export const useCreateUpdateCandidateProfile = () => {
  const { supabase } = useSupabase();

  const createUpdateCandidateProfile = useMemo(() => {
    if (!supabase) return null;

    return async (payload: CandidateProfile, userId: string) => {
      const mappedPayload = {
        city_id: payload.cityId,
        country_id: payload.countryId,
        state_id: payload.stateId,
        email: payload.email,
        phone_number: payload.phoneNumber,
        experience: payload.experience as number,
        first_name: payload.firstName,
        github_username: payload.githubUsername,
        last_name: payload.lastName,
        profile_description: payload.profileDescription,
        resume_url: payload.resumeUrl,
        resume_name: payload.resumeName,
      };

      // first check if profile exists
      const { data: profileExists } = await supabase
        .from("user_profiles")
        .select()
        .eq("user_id", userId)
        .maybeSingle();

      let res;

      if (profileExists) {
        res = await supabase
          .from("user_profiles")
          .update(mappedPayload)
          .eq("user_id", userId)
          .select()
          .single();
      } else {
        res = await supabase
          .from("user_profiles")
          .insert(mappedPayload)
          .select()
          .single();
      }

      const { data: profileData, status, error } = res;

      if (profileData) {
        const profileID = profileData.user_id;

        await supabase
          .from("user_profile_skills")
          .delete()
          .eq("user_profile_id", profileData.id);

        const skillsData = payload.skills.map((skillId) => ({
          user_id: profileID,
          skill_id: skillId,
          user_profile_id: profileData.id,
        }));

        const { data: skillsInsertData, error: skillsInsertError } =
          await supabase.from("user_profile_skills").insert(skillsData);
      }

      return { data: profileData, status, error };
    };
  }, [supabase]);

  return { createUpdateCandidateProfile };
};
