import { useEffect, useState } from "react";
import { JobListItem } from "../types/job";
import { useSupabase } from "./useSupabase";

export const useJobSearch = () => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [error, setError] = useState<string>();
  const { supabase } = useSupabase();

  const fetchJobs = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("jobs")
      .select(
        "id, title, created_at, is_open, work_mode, companies(*), cities(*), states(*), countries(*)"
      )
      .order("created_at", { ascending: false });

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
    if (supabase) fetchJobs();
  }, [supabase]);

  return { jobs, error };
};
