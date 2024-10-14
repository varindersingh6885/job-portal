import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabase";
import { useSession } from "@clerk/clerk-react";

interface Skill {
  id: number;
  name: string;
}

export const useFetchSkills = () => {
  const { session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string>();

  const fetchSkills = async () => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

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
