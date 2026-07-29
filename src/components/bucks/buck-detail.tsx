import type { BuckRecord } from "@/lib/types";

type BuckDetailProps = {
  buck: BuckRecord;
};

export function BuckDetail({ buck }: BuckDetailProps) {
  const { description, lineage, media } = buck;

  return (
    <article className="mt-6 overflow-hidden rounded-[2rem] border border-[#17352f]/10 bg-white shadow-[0_18px_40px_rgba(23,53,47,0.12)]">
      <section className="border-b border-[#17352f]/10 bg-gradient-to-br from-white via-white to-[#8aa085]/10">
        <div className="aspect-[4/3] overflow-hidden bg-[#f4efe4]">
          {media.profileImage ? (
            <img
              src={media.profileImage}
              alt={`${buck.buckName} profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-end bg-gradient-to-br from-[#a1613d]/15 via-[#d1a96a]/18 to-[#8aa085]/20 p-6 lg:p-8">
              <div className="rounded-[1.5rem] border border-white/50 bg-white/70 px-5 py-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a1613d]">
                  Profile Photo
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#17352f]/75">
                  Add a file named <strong>{buck.slug}_profile</strong> inside this
                  listing&apos;s folder and the website will pick it up automatically.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-8 lg:px-8">
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

          <MediaPanel buck={buck} />
        </div>

        <div className="space-y-6">
          {description ? (
            <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#17352f]/10">
              <h2 className="font-serif text-2xl text-[#17352f]">Description</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#17352f]/85">
                {formatDescription(description).map((paragraph, index) => (
                  <p key={`${buck.id}-description-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#17352f]/10">
            <h2 className="font-serif text-2xl text-[#17352f]">Listing Record</h2>
            <dl className="mt-4 space-y-3 text-sm text-[#17352f]/85">
              <Fact label="Listing ID" value={buck.id} stacked />
              <Fact label="Slug" value={buck.slug} stacked />
              <LinkFact label="ABGA Record" href={buck.abgaLink} />
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

type LinkFactProps = {
  label: string;
  href?: string;
};

function LinkFact({ label, href }: LinkFactProps) {
  if (!href) {
    return null;
  }

  return (
    <div>
      <dt className="font-semibold text-[#17352f]">{label}</dt>
      <dd className="mt-1">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[#a1613d] underline-offset-4 hover:underline"
        >
          Open ABGA details
        </a>
      </dd>
    </div>
  );
}

function MediaPanel({ buck }: BuckDetailProps) {
  const { media, slug } = buck;

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#17352f]/10">
      <h2 className="font-serif text-2xl text-[#17352f]">Media</h2>
      <div className="mt-4 space-y-5">
        <MediaSlot
          title="Pedigree Image"
          imagePath={media.pedigreeImage}
          emptyHint={`${slug}_pedigree.jpg or .avif`}
        />
        <MediaSlot
          title="Catalog Page Preview"
          imagePath={media.catalogPagePreviewImage}
          emptyHint="catalog-page-01.jpg or .png"
        />
        <MediaSlot
          title="Gallery Image"
          imagePath={media.galleryImage}
          emptyHint={`${slug}_gallery.jpg or .avif`}
        />
        {media.catalogPagePdf ? (
          <p className="text-sm text-[#17352f]/80">
            <a
              href={media.catalogPagePdf}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#a1613d] underline-offset-4 hover:underline"
            >
              Open catalog page PDF
            </a>
          </p>
        ) : (
          <p className="text-sm text-[#17352f]/65">
            Catalog PDF not added yet. Expected filename: <strong>catalog-page-01.pdf</strong>
          </p>
        )}
      </div>
    </section>
  );
}

type MediaSlotProps = {
  title: string;
  imagePath?: string;
  emptyHint: string;
};

function MediaSlot({ title, imagePath, emptyHint }: MediaSlotProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a1613d]">
        {title}
      </h3>
      {imagePath ? (
        <div className="mt-3 overflow-hidden rounded-[1.25rem] border border-[#17352f]/10 bg-[#f8f5ee]">
          <img src={imagePath} alt={title} className="max-h-[420px] w-full object-cover" />
        </div>
      ) : (
        <div className="mt-3 rounded-[1.25rem] border border-dashed border-[#17352f]/15 bg-[#f8f5ee] px-4 py-5 text-sm text-[#17352f]/70">
          Add <strong>{emptyHint}</strong> to this listing&apos;s folder to display it here.
        </div>
      )}
    </div>
  );
}

function formatDescription(description: string): string[] {
  return description
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.replace(/\s*\r?\n\s*/g, " ").trim())
    .filter(Boolean);
}
