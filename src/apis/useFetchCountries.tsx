import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Country {
  id: number;
  name: string;
}

export const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string>();

  const fetchCountries = async () => {
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
    fetchCountries();
  }, []);

  return { countries, error };
};
