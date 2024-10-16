import { useCallback, useEffect, useMemo, useState } from "react";
import { useSupabase } from "./useSupabase";
import { JobDetails } from "../types/job";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export const useFetchJobDetails = (jobId?: string) => {
  const { supabase } = useSupabase();
  const [jobDetails, setJobDetails] = useState<JobDetails>();

  const fetchJobDetails = useCallback(
    async (supabase: SupabaseClient<Database>) => {
      if (!jobId) return;

      const { data, error } = await supabase
        .from("jobs")
        .select(
          "*, companies(*), cities(*), states(*), countries(*), skills (name, id)"
        )
        .eq("id", jobId)
        .maybeSingle();

      if (data) {
        setJobDetails({
          city: data.cities?.name ?? "",
          companyLogoUrl: data.companies?.logo_url ?? "",
          companyName: data.companies?.name ?? "",
          country: data.countries?.name ?? "",
          contactEmail: data.contact_email ?? "",
          contactNumber: data.contact_number ?? "",
          createdAt: new Date(data.created_at).toLocaleDateString(),
          description: data.description ?? "",
          descriptionDocumentFileName: data.description_document_name ?? "",
          descriptionDocumentUrl: data.description_document_url ?? "",
          id: data.id,
          jobStatus: data.is_open,
          maxExperience: data.max_experience,
          maxSalary: data.max_salary,
          minExperience: data.min_experience,
          minSalary: data.min_salary,
          skills: data.skills.map((s) => s.name),
          state: data.states?.name ?? "",
          title: data.title,
          workMode: data.work_mode,
        });
      }
    },
    [jobId]
  );

  useEffect(() => {
    if (supabase) fetchJobDetails(supabase);
  }, [fetchJobDetails, supabase]);

  return { jobDetails };
};
