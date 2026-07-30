import Link from "next/link";
import { BuckCard } from "@/components/catalog/buck-card";
import { AccountLink } from "@/features/auth/components/account-link";
import { getFilteredBucks } from "@/lib/bucks";

export default async function BoerAbgaCatalogPage() {
  const bucks = await getFilteredBucks({
    breed: "Boer",
    association: "ABGA"
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[#17352f]/10 bg-white/85 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
              Catalog Page
            </p>
            <h1 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
              Boer / ABGA Semen Listings
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#17352f]/80">
              Browse the public Boer / ABGA listings with searchable, high-visibility
              catalog presentation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AccountLink />
            <Link
              href="/catalog?breed=Boer&association=ABGA"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Open Filtered Catalog Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#17352f]/10 bg-white/75 px-6 py-5 shadow-[0_18px_40px_rgba(23,53,47,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#17352f]/75">
            {bucks.length} {bucks.length === 1 ? "listing" : "listings"} currently visible
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Back Home
            </Link>
            <Link
              href="/#submission-form"
              className="inline-flex items-center justify-center rounded-full bg-[#a1613d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a1613d]/90"
            >
              Submit a Listing
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        {bucks.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#17352f]/20 bg-white/70 px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-[#17352f]">No public Boer listings yet</h2>
            <p className="mt-2 text-[#17352f]/75">
              Add or activate a listing to populate this catalog page.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {bucks.map((buck) => (
              <BuckCard key={buck.id} buck={buck} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
