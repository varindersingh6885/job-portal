import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";
import { useSession } from "@clerk/clerk-react";

interface City {
  id: number;
  name: string;
}

export const useFetchCities = (
  selectedCountriesIds: number[],
  selectedStatesIds: number[]
) => {
  const { session, isLoaded } = useSession();

  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string>();

  const fetchCities = async (
    selectedCountriesIds: number[],
    selectedStatesIds: number[]
  ) => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    const query = supabase.from("cities").select("*");

    //  ! figure out a way to do this
    if (selectedCountriesIds.length > 0) {
      query.in("country_id", selectedCountriesIds);
    }
    if (selectedStatesIds.length > 0) {
      query.in("state_id", selectedStatesIds);
    }

    const { data, error } = await query;

    setError(error?.message); // ! set Error message
    if (!error) {
      setCities(
        data.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      );
    }
  };

  useEffect(() => {
    if (isLoaded) fetchCities(selectedCountriesIds, selectedStatesIds);
  }, [isLoaded, selectedCountriesIds, selectedStatesIds]);

  return { cities, error };
};
