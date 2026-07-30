import Link from "next/link";
import { signOutAction } from "@/features/auth/actions";
import { requireUser } from "@/features/auth/require-user";

export default async function AccountPage() {
  const claims = await requireUser("/account");
  const email = typeof claims.email === "string" ? claims.email : "Signed-in user";

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[#17352f]/10 bg-white p-7 shadow-[0_18px_40px_rgba(23,53,47,0.12)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">Account</p>
        <h1 className="mt-3 font-serif text-4xl text-[#17352f]">Welcome, {email}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#17352f]/75">Your account is ready. Saved listings and other member features can be added here without changing the catalog module.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalog" className="rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]">Open catalog</Link>
          <form action={signOutAction}><button className="rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90">Sign out</button></form>
        </div>
      </section>
    </main>
  );
}
