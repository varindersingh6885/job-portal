import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";
import { useSession } from "@clerk/clerk-react";

interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export const useFetchCompanies = () => {
  const { session, isLoaded } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string>();

  const fetchCompanies = async () => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

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
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);

  return { companies, error };
};
