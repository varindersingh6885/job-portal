import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";
import { useSession } from "@clerk/clerk-react";

interface State {
  id: number;
  name: string;
}

export const useFetchStates = (countryIds: number[] = []) => {
  const { session, isLoaded } = useSession();
  const [states, setStates] = useState<State[]>([]);
  const [error, setError] = useState<string>();

  const fetchStates = async (countryIds: number[]) => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    const query = supabase.from("states").select("*");

    if (countryIds.length > 0) {
      query.in("country_id", countryIds);
    }

    const { data, error } = await query;

    setError(error?.message); // ! set Error message
    if (!error) {
      setStates(
        data.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      );
    }
  };

  useEffect(() => {
    if (isLoaded) fetchStates(countryIds);
  }, [countryIds, isLoaded]);

  return { states, error };
};
