import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  error?: string;
  message?: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, description, error, message, children, footer }: AuthCardProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
      <section className="w-full rounded-[2rem] border border-[#17352f]/10 bg-white p-7 shadow-[0_18px_40px_rgba(23,53,47,0.12)] sm:p-8">
        <Link href="/catalog" className="text-sm font-semibold text-[#a1613d] underline-offset-4 hover:underline">← Back to catalog</Link>
        <h1 className="mt-6 font-serif text-4xl text-[#17352f]">{title}</h1>
        <p className="mt-3 leading-7 text-[#17352f]/75">{description}</p>
        {error ? <p className="mt-5 rounded-xl bg-[#a1613d]/10 px-4 py-3 text-sm text-[#17352f]">{error}</p> : null}
        {message ? <p className="mt-5 rounded-xl bg-[#8aa085]/20 px-4 py-3 text-sm text-[#17352f]">{message}</p> : null}
        {children}
        <div className="mt-6 text-sm text-[#17352f]/75">{footer}</div>
      </section>
    </main>
  );
}

export const inputClassName = "mt-2 w-full rounded-xl border border-[#17352f]/15 bg-[#f8f5ee] px-4 py-3 text-[#17352f] outline-none transition focus:border-[#17352f]/40 focus:bg-white";
