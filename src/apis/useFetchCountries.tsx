import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";
import { useSession } from "@clerk/clerk-react";

interface Country {
  id: number;
  name: string;
}

export const useFetchCountries = () => {
  const { session, isLoaded } = useSession();

  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string>();

  const fetchCountries = async () => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    const { data, error } = await supabase.from("countries").select("*");

    setError(error?.message); // ! set Error message
    if (!error) {
      setCountries(
        data.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      );
    }
  };

  useEffect(() => {
    if (isLoaded) fetchCountries();
  }, [isLoaded]);

  return { countries, error };
};
