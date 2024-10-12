import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface State {
  id: number;
  name: string;
}

export const useFetchStates = (countryIds: number[] = []) => {
  const [states, setStates] = useState<State[]>([]);
  const [error, setError] = useState<string>();

  const fetchStates = async (countryIds: number[]) => {
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
    fetchStates(countryIds);
  }, [countryIds]);

  return { states, error };
};
