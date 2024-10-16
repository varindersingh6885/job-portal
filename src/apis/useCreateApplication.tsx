import { useMemo } from "react";
import { useSupabase } from "./useSupabase";
import { ApplicationManualPayload } from "../types/application";

export const useCreateApplication = () => {
  const { supabase } = useSupabase();

  const createApplication = useMemo(() => {
    if (!supabase) return null;

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
        })
        .select();

      return { data, status, error };
    };
  }, [supabase]);

  return { createApplication };
};
