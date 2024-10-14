import { useMemo } from "react";
import { useSupabase } from "./useSupabase";
import { JobCreatePayload } from "../types/job";

export const useCreateJob = () => {
  const { supabase } = useSupabase();

  const createJob = useMemo(() => {
    if (!supabase) return null;

    return async (payload: JobCreatePayload) => {
      return await supabase.from("jobs").insert({
        title: payload.title,
        city_id: payload.cityId,
        company_id: payload.companyId,
        contact_email: payload.contactEmail,
        contact_number: payload.contactNumber,
        country_id: payload.countryId,
        description: payload.description,
        description_document_url: payload.descriptionDocumentUrl,
        max_experience: payload.maxExperience,
        min_experience: payload.minExperience,
        min_salary: payload.minSalary,
        max_salary: payload.maxSalary,
        state_id: payload.stateId,
        work_mode: payload.workMode,
        description_document_name: payload.descriptionDocumentFileName,
      });
    };
  }, [supabase]);

  return { createJob };
};
