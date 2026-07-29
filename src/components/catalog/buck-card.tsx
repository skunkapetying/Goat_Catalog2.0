import Link from "next/link";
import type { BuckRecord } from "@/lib/types";

type BuckCardProps = {
  buck: BuckRecord;
};

export function BuckCard({ buck }: BuckCardProps) {
  const { lineage } = buck;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#17352f]/10 bg-white shadow-[0_18px_40px_rgba(23,53,47,0.12)]">
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <div className="flex min-h-[220px] items-end bg-gradient-to-br from-[#8aa085]/60 via-[#8aa085]/25 to-[#f4efe4] px-5 py-5">
          <div className="w-full rounded-[1.5rem] border border-white/50 bg-white/60 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a1613d]">
              {buck.association ? `${buck.breed} / ${buck.association}` : buck.breed}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-[#17352f]">
              {buck.buckName}
            </h2>
            {lineage.color ? (
              <p className="mt-2 text-sm text-[#17352f]/80">{lineage.color}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col justify-between p-6">
          <dl className="grid gap-3 text-sm text-[#17352f]/85 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-[#17352f]">Reg. Number</dt>
              <dd>{buck.registrationNumber || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#17352f]">FullBlood</dt>
              <dd>{lineage.fullBlood || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#17352f]">Sire</dt>
              <dd>{lineage.sire || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#17352f]">Dam</dt>
              <dd>{lineage.dam || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#17352f]">Enoblement</dt>
              <dd>{lineage.enoblement || "Not provided"}</dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-end">
            <Link
              href={`/bucks/${buck.slug}`}
              className="shrink-0 rounded-full bg-[#17352f] px-5 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#17352f]/90"
            >
              View Listing
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
