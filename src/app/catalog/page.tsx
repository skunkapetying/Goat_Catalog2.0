import Link from "next/link";
import { BuckCard } from "@/components/catalog/buck-card";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { AccountLink } from "@/features/auth/components/account-link";
import { getCatalogOptions, getFilteredBucks } from "@/lib/bucks";
import type { CatalogSearchParams } from "@/lib/types";

type CatalogPageProps = {
  searchParams: Promise<CatalogSearchParams>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const [bucks, options] = await Promise.all([
    getFilteredBucks(params),
    getCatalogOptions()
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2rem] border border-[#17352f]/10 bg-white/80 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
              Genetics Exchange
            </p>
            <h1 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
              Goat Genetics Catalog
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#17352f]/80">
              Search by buck name, registration number, sire, dam, or color.
              Filter by breed, association, enoblement, and FullBlood while we
              simplify the catalog around listings and lineage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AccountLink />
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Reset Search
            </Link>
          </div>
        </div>
      </section>

      <CatalogFilters options={options} params={params} resultCount={bucks.length} />

      <section className="mt-8">
        {bucks.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#17352f]/20 bg-white/70 px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-[#17352f]">No matching bucks</h2>
            <p className="mt-2 text-[#17352f]/75">
              No bucks match your current search or filters.
            </p>
            <Link
              href="/catalog"
              className="mt-6 inline-flex rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
            >
              Clear Filters
            </Link>
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
