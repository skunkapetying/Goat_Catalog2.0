import type { BuckRecord } from "@/lib/types";

type BuckDetailProps = {
  buck: BuckRecord;
};

export function BuckDetail({ buck }: BuckDetailProps) {
  const { lineage } = buck;

  return (
    <article className="mt-6 overflow-hidden rounded-[2rem] border border-[#17352f]/10 bg-white shadow-[0_18px_40px_rgba(23,53,47,0.12)]">
      <section className="grid gap-8 border-b border-[#17352f]/10 bg-gradient-to-br from-white via-white to-[#8aa085]/10 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a1613d]">
            {buck.association ? `${buck.breed} / ${buck.association}` : buck.breed}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#17352f] sm:text-5xl">
            {buck.buckName}
          </h1>
          <div className="mt-5 grid gap-3 text-sm text-[#17352f]/85 sm:grid-cols-2">
            <Fact label="Registration Number" value={buck.registrationNumber} />
            <Fact label="Association" value={buck.association} />
            <Fact label="Color" value={lineage.color} />
            <Fact label="FullBlood" value={lineage.fullBlood} />
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-gradient-to-br from-[#a1613d]/15 via-[#d1a96a]/20 to-[#8aa085]/20 p-5">
          <div className="flex h-full min-h-[260px] items-end rounded-[1.4rem] border border-white/50 bg-white/60 p-5 backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a1613d]">
                Listing Status
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#17352f]/75">
                This listing is currently marked as {buck.status}. Seller contact,
                description, and media are being handled outside the development data model.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] bg-[#f4efe4]/70 p-5">
            <h2 className="font-serif text-2xl text-[#17352f]">Lineage</h2>
            <dl className="mt-4 space-y-3 text-sm text-[#17352f]/85">
              <Fact label="Enoblement" value={lineage.enoblement} stacked />
              <Fact label="Sire" value={lineage.sire} stacked />
              <Fact label="Dam" value={lineage.dam} stacked />
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#17352f]/10">
            <h2 className="font-serif text-2xl text-[#17352f]">Listing Record</h2>
            <dl className="mt-4 space-y-3 text-sm text-[#17352f]/85">
              <Fact label="Listing ID" value={buck.id} stacked />
              <Fact label="Slug" value={buck.slug} stacked />
              <Fact label="Created" value={buck.createdAt} stacked />
              <Fact label="Updated" value={buck.updatedAt} stacked />
            </dl>
          </section>
        </div>
      </section>
    </article>
  );
}

type FactProps = {
  label: string;
  value?: string;
  stacked?: boolean;
};

function Fact({ label, value, stacked = false }: FactProps) {
  if (!value) {
    return null;
  }

  if (stacked) {
    return (
      <div>
        <dt className="font-semibold text-[#17352f]">{label}</dt>
        <dd className="mt-1">{value}</dd>
      </div>
    );
  }

  return (
    <div>
      <p className="font-semibold text-[#17352f]">{label}</p>
      <p>{value}</p>
    </div>
  );
}
