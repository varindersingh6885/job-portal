import { useMemo, useState } from "react";
import { useSupabase } from "./useSupabase";
import { ApplicationManualPayload } from "../types/application";
import { useFetchCandidateProfile } from "./useFetchCandidateProfile";
import { useUser } from "@clerk/clerk-react";

export const useCreateApplication = () => {
  const { supabase } = useSupabase();
  const { user } = useUser();
  const { profileData } = useFetchCandidateProfile(user.id);
  const [isLoading, setIsLoading] = useState(false);

  const createApplication = useMemo(() => {
    if (!supabase || !profileData) return null;

    return async (payload: ApplicationManualPayload) => {
      setIsLoading(true);
      const { data, status, error } = await supabase
        .from("applications")
        .insert({
          candidate_note: payload.candidateNote,
          expected_salary: payload.expectedSalary,
          job_id: payload.jobId,
          manual_application: payload.manualApplication,
          resume_name: payload.resumeName,
          resume_url: payload.resumeUrl,
          profile_id: profileData?.id,
        })
        .select();

      setIsLoading(false);

      return { data, status, error };
    };
  }, [profileData, supabase]);

  return { createApplication, isLoading };
};
