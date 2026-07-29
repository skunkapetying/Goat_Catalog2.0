import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  return error || !data?.claims?.sub ? undefined : data.claims;
}

export async function requireUser(nextPath = "/account") {
  const claims = await getCurrentUserClaims();

  if (!claims) {
    redirect(`/auth/sign-in?next=${encodeURIComponent(nextPath)}`);
  }

  return claims;
}
