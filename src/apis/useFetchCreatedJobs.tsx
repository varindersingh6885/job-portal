import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import { JobListItem } from "../types/job";
import { useSupabase } from "./useSupabase";
import { JobFilters } from "../types/job-filters";

export const useFetchCreatedJobs = (jobFilters: JobFilters) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [error, setError] = useState<string>();
  const { supabase } = useSupabase();

  const fetchJobs = async (user: UserResource, jobFilters: JobFilters) => {
    if (!supabase) return;

    let query = supabase
      .from("jobs")
      .select(
        "id, title, created_at, is_open, work_mode, companies(*), cities(*), states(*), countries(*), skills (name)"
      )
      .order("created_at", { ascending: false })
      .eq("user_id", user?.id);

    // Apply filters based on the input

    // City IDs filter
    if (jobFilters.cityIds?.length) {
      query = query.in("city_id", jobFilters.cityIds);
    }

    // State IDs filter
    if (jobFilters.stateIds?.length) {
      query = query.in("state_id", jobFilters.stateIds);
    }

    // Country IDs filter
    if (jobFilters.countryIds?.length) {
      query = query.in("country_id", jobFilters.countryIds);
    }

    // Company IDs filter
    if (jobFilters.companyIds?.length) {
      query = query.in("company_id", jobFilters.companyIds);
    }

    // Experience filter
    if (jobFilters.experience !== undefined && jobFilters.experience) {
      query = query
        .gte("max_experience", jobFilters.experience)
        .lte("min_experience", jobFilters.experience);
    }

    // Min salary filter
    if (jobFilters.minSalary !== undefined) {
      query = query.gte("min_salary", jobFilters.minSalary);
    }

    // Keyword filter (searches in title and description)
    if (jobFilters.keyword) {
      query = query.or(
        `title.ilike.%${jobFilters.keyword}%,description.ilike.%${jobFilters.keyword}%`
      );
    }

    // Title filter
    if (jobFilters.title) {
      query = query.ilike("title", `%${jobFilters.title}%`);
    }

    // Work mode filter
    if (jobFilters.workMode) {
      query = query.eq("work_mode", jobFilters.workMode);
    }

    // Job status filter (is_open)
    if (jobFilters.jobStatus !== undefined) {
      query = query.eq("is_open", jobFilters.jobStatus);
    }

    // Execute the query
    const { data, error } = await query;

    setError(error?.message); // ! set Error message
    if (!error) {
      console.log("jobs list data", data);
      setJobs(
        data.map((c) => ({
          id: c.id,
          title: c.title ?? "",
          city: c.cities?.name ?? "",
          state: c.states?.name ?? "",
          country: c.countries?.name ?? "",
          company: c.companies?.name ?? "",
          companyUrl: c.companies?.logo_url ?? "",
          createdAt: c.created_at ?? "",
          jobStatus: c.is_open,
          workMode: c.work_mode,
        }))
      );
    }
  };

  useEffect(() => {
    if (isUserLoaded && user && supabase) fetchJobs(user, jobFilters);
  }, [isUserLoaded, supabase, user, jobFilters]);

  return { jobs, error };
};
