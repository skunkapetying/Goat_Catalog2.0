import Link from "next/link";
import { notFound } from "next/navigation";
import { BuckDetail } from "@/components/bucks/buck-detail";
import { getBuckBySlug } from "@/lib/bucks";

type BuckDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BuckDetailPage({ params }: BuckDetailPageProps) {
  const { slug } = await params;
  const buck = await getBuckBySlug(slug);

  if (!buck) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/catalog"
        className="inline-flex rounded-full border border-[#17352f]/20 px-4 py-2 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
      >
        Back to Catalog
      </Link>
      <BuckDetail buck={buck} />
    </main>
  );
}
