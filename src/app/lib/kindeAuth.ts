import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { createClient } from "@supabase/supabase-js";

// Function to fetch the authenticated Kinde user
export const getKindeUser = async () => {
  try {
    const { getUser } = useKindeBrowserClient();
    const user = await getUser(); // Fetch authenticated user
    if (!user) {
      console.warn("No authenticated user found.");
      return null;
    }
    console.log("------------------");
    console.log(user);
    console.log("------------------");
    return user; // Contains user details like ID, email, and name
  } catch (error) {
    // console.error("Error fetching Kinde user:", error);
    return null;
  }
};

// export function SyncKindeWithSupabase() {
//   const { user, getAccessToken, isAuthenticated } = useKindeBrowserClient();

//   useEffect(() => {
//     const syncUserToSupabase = async () => {
//       if (!user || !isAuthenticated) return;

//       try {
//         const kindeToken = await getAccessToken();
//         if (!kindeToken || typeof kindeToken !== "string") {
//           console.error("Invalid Kinde token:", kindeToken);
//           return;
//         }

//         const { data, error } = await supabase.auth.signInWithIdToken({
//           provider: "kinde",
//           token: kindeToken, // Ensure this is a valid ID token
//         });

//         if (error) {
//           console.error("Error syncing with Supabase:", error.message);
//         } else {
//           console.log("User synced successfully:", data);
//         }
//       } catch (error) {
//         console.error("Unexpected error syncing user:", error);
//       }
//     };

//     syncUserToSupabase();
//   }, [user, isAuthenticated]); // Run when user changes
// }

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    accessToken: async () => {
      const {accessTokenRaw, getAccessTokenRaw} = useKindeBrowserClient();
      const aTokRaw = getAccessTokenRaw();
      console.log("Access Token: ", aTokRaw);
      return aTokRaw ?? null; // Ensures it returns null if no token is available
    }
  }
);
