import { useEffect, useState } from "react";
import { JobListItem } from "../types/job";
import { useSupabase } from "./useSupabase";
import { JobFilters } from "../types/job-filters";
import { useUser } from "@clerk/clerk-react";

export const useJobSearch = (jobFilters: JobFilters, currPage: number) => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [error, setError] = useState<string>();
  const { supabase } = useSupabase();
  const { user, isLoaded } = useUser();

  const fetchJobs = async (
    jobFilters: JobFilters,
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ) => {
    if (!supabase) return;
    setJobs([]);
    setIsLoading(true);

    const { data: appliedJobs, error: appliedJobsError } = await supabase
      .from("applications")
      .select("job_id")
      .eq("candidate_id", userId);

    if (appliedJobsError) {
      console.error(appliedJobsError);
      return;
    }

    const appliedJobIds = appliedJobs.map((application) => application.job_id);

    let query = supabase
      .from("jobs")
      .select(
        `
      id, 
      title, 
      created_at, 
      is_open, 
      work_mode, 
      companies(*), 
      cities(*), 
      states(*), 
      countries(*), 
      skills (name)
      `,
        { count: "exact" } // This will return the total count of matching jobs
      )
      .not("id", "in", `(${appliedJobIds.join(",")})`) // Fallback for empty applied jobs
      .order("created_at", { ascending: false });

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
    if (supabase && isLoaded && user) fetchJobs(jobFilters, user.id, currPage);
  }, [supabase, jobFilters, isLoaded, user, currPage]);

  return { jobs, error, totalJobs, isLoading };
};
