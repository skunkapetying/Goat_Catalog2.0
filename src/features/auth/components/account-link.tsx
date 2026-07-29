import Link from "next/link";
import { getCurrentUserClaims } from "@/features/auth/require-user";

export async function AccountLink() {
  const claims = await getCurrentUserClaims();
  const signedIn = Boolean(claims?.sub);

  return (
    <Link
      href={signedIn ? "/account" : "/auth/sign-in"}
      className="inline-flex items-center justify-center rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
    >
      {signedIn ? "My Account" : "Sign In"}
    </Link>
  );
}
