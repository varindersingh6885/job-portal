import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import { JobListItem } from "../types/job";
import { useSupabase } from "./useSupabase";
import { JobFilters } from "../types/job-filters";

export const useFetchCreatedJobs = (
  jobFilters: JobFilters,
  currPage: number
) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  const { supabase } = useSupabase();

  const fetchJobs = async (
    user: UserResource,
    jobFilters: JobFilters,
    page: number = 1,
    pageSize: number = 10
  ) => {
    if (!supabase) return;

    setIsLoading(true);

    let query = supabase
      .from("jobs")
      .select(
        "id, title, created_at, is_open, work_mode, companies(*), cities(*), states(*), countries(*), skills (name)",
        { count: "exact" } // Fetch total count of jobs
      )
      .order("created_at", { ascending: false })
      .eq("user_id", user?.id);

    // Apply filters based on the input

    if (jobFilters.cityIds?.length) {
      query = query.in("city_id", jobFilters.cityIds);
    }

    if (jobFilters.stateIds?.length) {
      query = query.in("state_id", jobFilters.stateIds);
    }

    if (jobFilters.countryIds?.length) {
      query = query.in("country_id", jobFilters.countryIds);
    }

    if (jobFilters.companyIds?.length) {
      query = query.in("company_id", jobFilters.companyIds);
    }

    if (jobFilters.experience !== undefined && jobFilters.experience) {
      query = query
        .gte("max_experience", jobFilters.experience)
        .lte("min_experience", jobFilters.experience);
    }

    if (jobFilters.minSalary !== undefined) {
      query = query.gte("min_salary", jobFilters.minSalary);
    }

    if (jobFilters.keyword) {
      query = query.or(
        `title.ilike.%${jobFilters.keyword}%,description.ilike.%${jobFilters.keyword}%`
      );
    }

    if (jobFilters.title) {
      query = query.ilike("title", `%${jobFilters.title}%`);
    }

    if (jobFilters.workMode) {
      query = query.eq("work_mode", jobFilters.workMode);
    }

    if (jobFilters.jobStatus !== undefined) {
      query = query.eq("is_open", jobFilters.jobStatus);
    }

    if (jobFilters.skillsIds?.length) {
      query = query.in(
        "id",
        (
          await supabase
            .from("job_skills")
            .select("job_id")
            .in("skill_id", jobFilters.skillsIds)
        ).data.map((job) => job.job_id)
      );
    }

    // Pagination: Calculate the range for the current page
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Apply pagination using the range method
    query = query.range(from, to);

    // Execute the query
    const { data, error, count } = await query;

    setError(error?.message); // ! set Error message
    if (!error) {
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

      setTotalJobs(count);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoaded && user && supabase) fetchJobs(user, jobFilters, currPage);
  }, [isUserLoaded, supabase, user, jobFilters, currPage]);

  return { jobs, error, isLoading, totalJobs };
};
