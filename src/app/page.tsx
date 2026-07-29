import Link from "next/link";
import { submitListingAction } from "@/app/actions";

type HomePageProps = {
  searchParams: Promise<{
    buckName?: string;
    registrationNumber?: string;
    sellerEmail?: string;
    saveStatus?: string;
    saveMessage?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const isError = params.saveStatus === "error";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#17352f]/10 bg-white/85 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
            Genetics Exchange
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
            Listing Intake
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#17352f]/80">
            Submit a buck name, registration number, and seller email to create an
            inactive listing record. When the registration number matches the ABGA
            studbook, the intake saves the animal details link for later review.
          </p>

          {isError && params.saveMessage ? (
            <div
              className="mt-6 rounded-[1.5rem] border border-[#a1613d]/35 bg-[#a1613d]/10 px-5 py-4 text-sm text-[#17352f]"
            >
              <p className="font-semibold">{params.saveMessage}</p>
            </div>
          ) : null}
        </div>

        <section className="rounded-[2rem] border border-[#17352f]/10 bg-white px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] lg:px-8">
          <h2 className="font-serif text-3xl text-[#17352f]">Create Inactive Listing</h2>
          <form action={submitListingAction} className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-[#17352f]">Buck Name</span>
              <input
                type="text"
                name="buckName"
                defaultValue={params.buckName ?? ""}
                className="mt-2 w-full rounded-[1.2rem] border border-[#17352f]/15 bg-[#f8f5ee] px-4 py-3 text-[#17352f] outline-none transition focus:border-[#17352f]/40 focus:bg-white"
                placeholder="Example: JAD SRB Bulletproof"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#17352f]">Registration Number</span>
              <input
                type="text"
                name="registrationNumber"
                defaultValue={params.registrationNumber ?? ""}
                className="mt-2 w-full rounded-[1.2rem] border border-[#17352f]/15 bg-[#f8f5ee] px-4 py-3 text-[#17352f] outline-none transition focus:border-[#17352f]/40 focus:bg-white"
                placeholder="Example: 10901184"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#17352f]">Seller Email</span>
              <input
                type="email"
                name="sellerEmail"
                defaultValue={params.sellerEmail ?? ""}
                className="mt-2 w-full rounded-[1.2rem] border border-[#17352f]/15 bg-[#f8f5ee] px-4 py-3 text-[#17352f] outline-none transition focus:border-[#17352f]/40 focus:bg-white"
                placeholder="name@example.com"
                required
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
            >
              Save Listing Submission
            </button>
          </form>

          <div className="mt-6 rounded-[1.5rem] bg-[#f4efe4]/80 px-5 py-4 text-sm leading-6 text-[#17352f]/80">
            Saved submissions stay inactive, so they do not appear in the public catalog
            until you or a collaborator finishes the rest of the record.
          </div>
        </section>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#17352f]/10 bg-white/70 px-6 py-6 shadow-[0_18px_40px_rgba(23,53,47,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#17352f]">Public Catalog</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#17352f]/75">
              Active listings still live in the public-facing catalog. Intake submissions
              are saved separately first so you can review and complete them.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
          >
            Open Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
