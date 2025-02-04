// fetchUserDetails.ts (or any utility file)
"use client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Fetch user details WITHOUT using React state
export const fetchUserDetails = async (userId: string) => {
  const { data, error } = await supabase
    .from("User")
    .select("first_name, last_name")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }

  return data; // ✅ Return the fetched data
};
