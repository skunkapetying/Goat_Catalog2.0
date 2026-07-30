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
  const highlights = [
    {
      title: "Detailed semen listings",
      description:
        "Each listing is built to spotlight registration details, pedigree context, and catalog-ready visuals in one place."
    },
    {
      title: "High visibility presentation",
      description:
        "We are shaping the catalog so breeders can browse quickly, compare genetics easily, and find standout bucks fast."
    },
    {
      title: "Catalogs built for growth",
      description:
        "Boer / ABGA listings are live now, while the Dairy side is being prepared so both audiences have a clear path."
    }
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#17352f]/10 bg-white/85 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
            Goat Genetics Exchange
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl text-[#17352f] sm:text-5xl">
            Detailed semen listings with the visibility serious breeders need.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#17352f]/80">
            We are building a cleaner, more useful marketplace for goat semen sales.
            The goal is straightforward: help buyers browse strong genetics, compare
            pedigrees, and reach listings that feel complete, credible, and easy to review.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#17352f]/80">
            Our current focus is Boer / ABGA semen listings, with a Dairy catalog path
            being prepared alongside it. Each catalog is meant to surface the details that
            matter most, from buck identity and association data to listing media and future
            submission visibility.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/catalog/boer-abga"
              className="inline-flex items-center justify-center rounded-full bg-[#17352f] px-6 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
            >
              Browse Boer / ABGA Catalog
            </Link>
            <Link
              href="/catalog/dairy"
              className="inline-flex items-center justify-center rounded-full bg-[#a1613d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a1613d]/90"
            >
              Browse Dairy Catalog
            </Link>
            <Link
              href="#submission-form"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-6 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Submit a Listing
            </Link>
          </div>
        </div>

        <section className="rounded-[2rem] border border-[#17352f]/10 bg-[#17352f] px-6 py-8 text-[#f4efe4] shadow-[0_18px_40px_rgba(23,53,47,0.18)] lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d8b48f]">
            About Us
          </p>
          <h2 className="mt-3 font-serif text-3xl">What we are selling</h2>
          <p className="mt-4 text-base leading-7 text-[#f4efe4]/80">
            This site is built to market goat semen listings with more detail than a quick
            classified post. We want each entry to feel visible, organized, and useful for
            breeders who are shopping with intent.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4"
              >
                <h3 className="text-lg font-semibold">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#f4efe4]/78">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[#17352f]/10 bg-white/80 px-6 py-6 shadow-[0_18px_40px_rgba(23,53,47,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a1613d]">
            Featured Catalog
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#17352f]">Boer / ABGA</h2>
          <p className="mt-3 text-sm leading-6 text-[#17352f]/75">
            Browse the public Boer listings already prepared for catalog visibility, with
            searchable genetics and listing details.
          </p>
          <Link
            href="/catalog/boer-abga"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
          >
            Open Boer / ABGA Catalog
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[#17352f]/10 bg-white/80 px-6 py-6 shadow-[0_18px_40px_rgba(23,53,47,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a1613d]">
            Growing Catalog
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#17352f]">Dairy</h2>
          <p className="mt-3 text-sm leading-6 text-[#17352f]/75">
            Use the Dairy catalog page as the dedicated landing area for dairy-focused
            semen listings as that side of the site grows.
          </p>
          <Link
            href="/catalog/dairy"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#a1613d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a1613d]/90"
          >
            Open Dairy Catalog
          </Link>
        </div>
      </section>

      <section
        id="submission-form"
        className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="rounded-[2rem] border border-[#17352f]/10 bg-white/85 px-6 py-8 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
            Listing Intake
          </p>
          <h2 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
            Submit a new listing
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#17352f]/80">
            Submit a buck name, registration number, and seller email to create a
            draft listing record. When the registration number matches the ABGA
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
          <h3 className="font-serif text-3xl text-[#17352f]">Create Draft Listing</h3>
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
            Saved submissions stay off the public catalog until you or a collaborator
            finishes the rest of the record.
          </div>
        </section>
      </section>
    </main>
  );
}
