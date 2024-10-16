import { useCallback, useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";

export const useCandidateApplicationPresent = (
  candidateId?: string,
  jobId?: string
) => {
  const { supabase } = useSupabase();
  const [applicationPresent, setApplicationPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkCandidateApplicationPresent = useCallback(
    async (candidateId: string, jobId: string) => {
      if (!supabase) return null;

      setIsLoading(true);
      const { data, status, error } = await supabase
        .from("applications")
        .select()
        .eq("candidate_id", candidateId)
        .eq("job_id", jobId)
        .maybeSingle();

      if (data) setApplicationPresent(true);

      setIsLoading(false);
      return { data, status, error };
    },
    [supabase]
  );

  useEffect(() => {
    if (candidateId && jobId && supabase)
      checkCandidateApplicationPresent(candidateId, jobId);
  }, [candidateId, checkCandidateApplicationPresent, jobId, supabase]);

  return { applicationPresent, isLoading, checkCandidateApplicationPresent };
};
