import { useCallback, useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { ApplicationDetails } from "../types/application";

export const useFetchApplications = (jobId?: string) => {
  const { supabase } = useSupabase();
  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetails[]>();
  const [totalApplications, setTotalApplications] = useState(0);

  const fetchApplicationDetails = useCallback(
    async (supabase: SupabaseClient<Database>) => {
      if (!jobId) return;

      const { data } = await supabase
        .from("applications")
        .select("*, user_profiles (*), jobs(*)")
        .eq("job_id", jobId);

      // fetch total applications count

      const { count } = await supabase
        .from("applications")
        .select("id", { count: "exact" })
        .eq("job_id", jobId);

      if (count !== null) setTotalApplications(count);

      if (data) {
        setApplicationDetails(
          data.map((d) => ({
            candidateId: d.candidate_id ?? "",
            createdAt: new Date(d.created_at).toLocaleDateString(),
            expectedSalary: d.expected_salary ?? 0,
            id: d.id,
            jobId: d.job_id ?? 0,
            manualApplication: d.manual_application ?? false,
            resumeName: d.resume_name ?? "",
            resumeUrl: d.resume_url ?? "",
            status: d.status ?? "",
            candidateNote: d.candidate_note ?? "",
            candidateFirstName: d.user_profiles?.first_name ?? "",
          }))
        );
      }
    },
    [jobId]
  );

  useEffect(() => {
    if (supabase) fetchApplicationDetails(supabase);
  }, [fetchApplicationDetails, supabase]);

  return { applicationDetails, totalApplications };
};
