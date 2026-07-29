import type { CatalogOptions, CatalogSearchParams } from "@/lib/types";

type CatalogFiltersProps = {
  options: CatalogOptions;
  params: CatalogSearchParams;
  resultCount: number;
};

export function CatalogFilters({
  options,
  params,
  resultCount
}: CatalogFiltersProps) {
  return (
    <section className="rounded-[2rem] border border-[#17352f]/10 bg-white/80 px-6 py-6 shadow-[0_18px_40px_rgba(23,53,47,0.12)] backdrop-blur">
      <form action="/catalog" className="space-y-5">
        <div>
          <label htmlFor="q" className="mb-2 block text-sm font-semibold text-[#17352f]">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search by buck name, reg. number, sire, dam, or color"
            className="w-full rounded-2xl border border-[#17352f]/15 bg-[#f4efe4]/40 px-4 py-3 text-[#17352f] outline-none ring-0 placeholder:text-[#17352f]/40 focus:border-[#a1613d]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <FilterSelect
            name="breed"
            label="Breed"
            value={params.breed}
            options={options.breeds}
          />
          <FilterSelect
            name="association"
            label="Association"
            value={params.association}
            options={options.associations}
          />
          <FilterSelect
            name="color"
            label="Color"
            value={params.color}
            options={options.colors}
          />
          <FilterSelect
            name="enoblement"
            label="Enoblement"
            value={params.enoblement}
            options={options.enoblementOptions}
          />
          <FilterSelect
            name="fullBlood"
            label="FullBlood"
            value={params.fullBlood}
            options={options.fullBloodOptions}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-[#17352f]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#17352f]/75">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
          <div className="flex gap-3">
            <a
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-[#17352f]/20 px-5 py-3 text-sm font-semibold text-[#17352f] hover:border-[#17352f] hover:bg-[#17352f] hover:text-[#f4efe4]"
            >
              Clear Filters
            </a>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#a1613d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a1613d]/90"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  name: string;
  value?: string;
  options: string[];
};

function FilterSelect({ label, name, value, options }: FilterSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#17352f]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={value ?? ""}
        className="w-full rounded-2xl border border-[#17352f]/15 bg-[#f4efe4]/40 px-4 py-3 text-[#17352f] outline-none focus:border-[#a1613d]"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
