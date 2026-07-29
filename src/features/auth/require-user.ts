import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser(nextPath = "/account") {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect(`/auth/sign-in?next=${encodeURIComponent(nextPath)}`);
  }

  return data.claims;
}
