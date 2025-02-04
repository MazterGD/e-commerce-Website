import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

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
