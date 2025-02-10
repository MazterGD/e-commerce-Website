import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const { getAccessTokenRaw } = useKindeBrowserClient();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async () => {
        const token = await getAccessTokenRaw();
        console.log("Access Token: ", token);
        return token ?? null;
      },
    }
  );

  return supabase;
};
