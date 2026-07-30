import Link from "next/link";
import { AuthCard, inputClassName } from "@/features/auth/components/auth-card";
import { signInAction } from "@/features/auth/actions";
import { getCurrentUserClaims } from "@/features/auth/require-user";
import { redirect } from "next/navigation";

type SignInPageProps = { searchParams: Promise<{ error?: string; message?: string; next?: string }> };

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const claims = await getCurrentUserClaims();

  if (claims?.sub) {
    redirect(params.next?.startsWith("/") ? params.next : "/account");
  }

  return (
    <AuthCard title="Welcome back" description="Sign in to manage your account and saved catalog activity." error={params.error} message={params.message} footer={<><span>New here? </span><Link href="/auth/sign-up" className="font-semibold text-[#a1613d] underline-offset-4 hover:underline">Create an account</Link></>}>
      <form action={signInAction} className="mt-7 space-y-5">
        <input type="hidden" name="next" value={params.next ?? "/account"} />
        <label className="block"><span className="text-sm font-semibold text-[#17352f]">Email</span><input className={inputClassName} name="email" type="email" autoComplete="email" required /></label>
        <label className="block"><span className="text-sm font-semibold text-[#17352f]">Password</span><input className={inputClassName} name="password" type="password" autoComplete="current-password" required /></label>
        <button className="w-full rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90">Sign in</button>
      </form>
    </AuthCard>
  );
}
