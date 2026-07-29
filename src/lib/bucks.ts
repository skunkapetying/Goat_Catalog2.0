import { readFile } from "node:fs/promises";
import path from "node:path";
import type { BuckRecord, CatalogOptions, CatalogSearchParams } from "@/lib/types";

const LISTINGS_CSV_PATH = path.join(process.cwd(), "GRIST_LISTINGS.csv");
const LINEAGE_CSV_PATH = path.join(process.cwd(), "GRIST_LINEAGE.csv");

export async function getAllBucks(): Promise<BuckRecord[]> {
  const [listingsRaw, lineageRaw] = await Promise.all([
    readFile(LISTINGS_CSV_PATH, "utf8"),
    readFile(LINEAGE_CSV_PATH, "utf8")
  ]);
  const listingRows = parseCsv(listingsRaw);
  const lineageRows = parseCsv(lineageRaw);
  const lineageByListingId = new Map(
    lineageRows.map((row) => [row.listingId, row] as const)
  );

  return listingRows
    .map((row) => mapRowToBuck(row, lineageByListingId.get(row.listingId)))
    .sort((a, b) => {
      const sortOrderDelta = (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER);
      if (sortOrderDelta !== 0) {
        return sortOrderDelta;
      }

      return a.buckName.localeCompare(b.buckName);
    });
}

export async function getBuckBySlug(slug: string): Promise<BuckRecord | undefined> {
  const bucks = await getAllBucks();
  return bucks.find((buck) => buck.slug === slug);
}

export async function getFilteredBucks(
  params: CatalogSearchParams
): Promise<BuckRecord[]> {
  const bucks = await getAllBucks();
  const query = normalize(params.q);

  return bucks.filter((buck) => {
    const matchesQuery =
      !query ||
      [
        buck.buckName,
        buck.registrationNumber,
        buck.lineage.color,
        buck.lineage.sire,
        buck.lineage.dam
      ]
        .map(normalize)
        .some((value) => value.includes(query));

    const matchesBreed = !params.breed || buck.breed === params.breed;
    const matchesAssociation =
      !params.association || buck.association === params.association;
    const matchesColor = !params.color || buck.lineage.color === params.color;
    const matchesEnoblement =
      !params.enoblement || buck.lineage.enoblement === params.enoblement;
    const matchesFullBlood =
      !params.fullBlood || buck.lineage.fullBlood === params.fullBlood;

    return (
      buck.status === "active" &&
      matchesQuery &&
      matchesBreed &&
      matchesAssociation &&
      matchesColor &&
      matchesEnoblement &&
      matchesFullBlood
    );
  });
}

export async function getCatalogOptions(): Promise<CatalogOptions> {
  const bucks = await getAllBucks();
  const activeBucks = bucks.filter((buck) => buck.status === "active");

  return {
    breeds: uniqueValues(activeBucks.map((buck) => buck.breed)),
    associations: uniqueValues(activeBucks.map((buck) => buck.association)),
    colors: uniqueValues(activeBucks.map((buck) => buck.lineage.color)),
    enoblementOptions: uniqueValues(activeBucks.map((buck) => buck.lineage.enoblement)),
    fullBloodOptions: uniqueValues(activeBucks.map((buck) => buck.lineage.fullBlood))
  };
}

function mapRowToBuck(
  listingRow: Record<string, string>,
  lineageRow?: Record<string, string>
): BuckRecord {
  const breed = listingRow.breed;
  return {
    id: listingRow.listingId,
    slug: listingRow.slug,
    buckName: listingRow.buckName,
    registrationNumber: listingRow.registrationNumber,
    breed,
    association: listingRow.association || inferAssociation(breed),
    status: normalizeStatus(listingRow.status),
    lineage: {
      color: lineageRow?.color || undefined,
      fullBlood: lineageRow?.fullBlood || undefined,
      enoblement: lineageRow?.enoblement || undefined,
      sire: lineageRow?.sire || undefined,
      dam: lineageRow?.dam || undefined
    },
    sortOrder: listingRow.sortOrder ? Number(listingRow.sortOrder) : undefined,
    createdAt: listingRow.createdAt || undefined,
    updatedAt: listingRow.updatedAt || undefined
  };
}

function inferAssociation(breed?: string): string | undefined {
  if (!breed) {
    return undefined;
  }

  return breed.toLowerCase() === "boer" ? "ABGA" : undefined;
}

function normalizeStatus(value: string): "active" | "inactive" {
  return normalize(value) === "active" ? "active" : "inactive";
}

function uniqueValues(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b)
  );
}

function normalize(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

function parseCsv(input: string): Array<Record<string, string>> {
  const rows: string[][] = [];
  let currentField = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === "\"") {
      if (inQuotes && nextChar === "\"") {
        currentField += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentField = "";
      currentRow = [];
      continue;
    }

    currentField += char;
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  const [headers, ...dataRows] = rows.filter((row) => row.some((field) => field.length > 0));

  return dataRows.map((row) =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = row[index] ?? "";
      return record;
    }, {})
  );
}
