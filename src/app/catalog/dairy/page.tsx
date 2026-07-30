import Link from "next/link";
import { BuckCard } from "@/components/catalog/buck-card";
import { AccountLink } from "@/features/auth/components/account-link";
import { getAllBucks } from "@/lib/bucks";

export default async function DairyCatalogPage() {
  const bucks = (await getAllBucks()).filter(
    (buck) => buck.status === "active" && buck.breed.toLowerCase() !== "boer"
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[#17352f]/10 bg-white/85 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
              Catalog Page
            </p>
            <h1 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
              Dairy Semen Listings
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#17352f]/80">
              This page is reserved for dairy-focused semen listings and gives that side
              of the catalog a dedicated landing area as inventory grows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AccountLink />
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Open Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        {bucks.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#17352f]/20 bg-white/70 px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-[#17352f]">Dairy listings are coming soon</h2>
            <p className="mt-2 max-w-2xl mx-auto text-[#17352f]/75">
              The Dairy catalog page is live, but there are no active dairy semen listings
              published yet in the current dataset.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#submission-form"
                className="inline-flex items-center justify-center rounded-full bg-[#a1613d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a1613d]/90"
              >
                Submit a Listing
              </Link>
              <Link
                href="/catalog/boer-abga"
                className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
              >
                View Boer / ABGA Catalog
              </Link>
            </div>
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
