import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Skill {
  id: number;
  name: string;
}

export const useFetchSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string>();

  const fetchSkills = async () => {
    const { data, error } = await supabase.from("skills").select("*");

    setError(error?.message); // ! set Error message
    if (!error) {
      setSkills(
        data.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      );
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { skills, error };
};
