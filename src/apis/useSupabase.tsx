import { useSession } from "@clerk/clerk-react";
import supabaseClient from "../utils/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { useEffect, useState } from "react";

export const useSupabase = () => {
  const { session, isLoaded } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient<Database>>();

  const getSupabaseClient = async () => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken as string);
    setSupabase(supabase);
  };

  useEffect(() => {
    if (isLoaded) {
      getSupabaseClient();
    }
  }, [isLoaded]);

  return { supabase };
};
