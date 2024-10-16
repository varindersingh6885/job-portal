import { useMemo } from "react";
import { useSupabase } from "./useSupabase";
import { ApplicationManualPayload } from "../types/application";
import { useFetchCandidateProfile } from "./useFetchCandidateProfile";

export const useCreateApplication = () => {
  const { supabase } = useSupabase();
  const { profileData } = useFetchCandidateProfile();

  const createApplication = useMemo(() => {
    if (!supabase || !profileData) return null;

    return async (payload: ApplicationManualPayload) => {
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

      return { data, status, error };
    };
  }, [profileData, supabase]);

  return { createApplication };
};
