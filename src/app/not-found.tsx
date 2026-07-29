import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
        Listing Not Found
      </p>
      <h1 className="mt-4 font-serif text-4xl text-[#17352f]">That buck is not in the catalog.</h1>
      <p className="mt-4 max-w-xl text-[#17352f]/75">
        The listing may have been removed, renamed, or the link may be incomplete.
      </p>
      <Link
        href="/catalog"
        className="mt-8 inline-flex rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
      >
        Return to Catalog
      </Link>
    </main>
  );
}
