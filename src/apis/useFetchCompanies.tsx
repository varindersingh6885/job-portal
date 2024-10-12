import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export const useFetchCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string>();

  const fetchCompanies = async () => {
    const { data, error } = await supabase.from("companies").select("*");

    setError(error?.message); // ! set Error message
    if (!error) {
      setCompanies(
        data.map((c) => ({
          id: c.id,
          logoUrl: c.logo_url ?? "",
          name: c.name,
        }))
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  return { companies, error };
};
