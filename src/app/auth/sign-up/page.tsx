import Link from "next/link";
import { AuthCard, inputClassName } from "@/features/auth/components/auth-card";
import { signUpAction } from "@/features/auth/actions";

type SignUpPageProps = { searchParams: Promise<{ error?: string }> };

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  return (
    <AuthCard title="Create your account" description="Save your account details and access future catalog tools." error={params.error} footer={<><span>Already have an account? </span><Link href="/auth/sign-in" className="font-semibold text-[#a1613d] underline-offset-4 hover:underline">Sign in</Link></>}>
      <form action={signUpAction} className="mt-7 space-y-5">
        <label className="block"><span className="text-sm font-semibold text-[#17352f]">Email</span><input className={inputClassName} name="email" type="email" autoComplete="email" required /></label>
        <label className="block"><span className="text-sm font-semibold text-[#17352f]">Password</span><input className={inputClassName} name="password" type="password" autoComplete="new-password" minLength={8} required /></label>
        <label className="block"><span className="text-sm font-semibold text-[#17352f]">Confirm password</span><input className={inputClassName} name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></label>
        <button className="w-full rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90">Create account</button>
      </form>
    </AuthCard>
  );
}
