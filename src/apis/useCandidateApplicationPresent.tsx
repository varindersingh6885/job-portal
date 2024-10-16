import { useCallback, useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";
import { useUser } from "@clerk/clerk-react";

export const useCandidateApplicationPresent = (jobId?: string) => {
  const { user } = useUser();
  const candidateId = user?.id;

  const { supabase } = useSupabase();
  const [applicationPresent, setApplicationPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkCandidateApplicationPresent = useCallback(
    async (jobId: string) => {
      if (!supabase || !candidateId) return null;

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
    [supabase, candidateId]
  );

  useEffect(() => {
    if (candidateId && jobId && supabase)
      checkCandidateApplicationPresent(jobId);
  }, [candidateId, checkCandidateApplicationPresent, jobId, supabase]);

  return { applicationPresent, isLoading, checkCandidateApplicationPresent };
};
