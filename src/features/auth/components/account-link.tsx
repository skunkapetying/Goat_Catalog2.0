import Link from "next/link";
import { signOutAction } from "@/features/auth/actions";
import { getCurrentUserClaims } from "@/features/auth/require-user";

export async function AccountLink() {
  const claims = await getCurrentUserClaims();
  const signedIn = Boolean(claims?.sub);

  if (!signedIn) {
    return (
      <Link
        href="/auth/sign-in"
        className="inline-flex items-center justify-center rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
      >
        Sign In
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/account"
        className="inline-flex items-center justify-center rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
      >
        My Account
      </Link>
      <form action={signOutAction}>
        <button className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]">
          Sign Out
        </button>
      </form>
    </>
  );

}
