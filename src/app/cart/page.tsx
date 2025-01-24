import ProductStack from "../components/ProductStack";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export default async function cart() {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  const supabase = await createClient();
  const { data: countries } = await supabase.from("countries").select();

  return (
    <div>
      This page is protected - but you can view it because you are authenticated
      <ProductStack />
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </div>
  );
}
