import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseCsv, stringifyCsv, type CsvRow } from "@/lib/csv";

const LISTINGS_CSV_PATH = path.join(process.cwd(), "GRIST_LISTINGS.csv");
const LINEAGE_CSV_PATH = path.join(process.cwd(), "GRIST_LINEAGE.csv");
const CONTACTS_CSV_PATH = path.join(process.cwd(), "GRIST_CONTACTS.csv");

const LISTINGS_HEADERS = [
  "listingId",
  "slug",
  "buckName",
  "registrationNumber",
  "abgaLink",
  "description",
  "breed",
  "association",
  "status",
  "sortOrder",
  "createdAt",
  "updatedAt"
];

const LINEAGE_HEADERS = ["listingId", "color", "fullBlood", "enoblement", "sire", "dam"];

const CONTACTS_HEADERS = ["contactId", "listingId", "email", "createdAt", "updatedAt"];

export type ListingSubmissionInput = {
  buckName: string;
  registrationNumber: string;
  sellerEmail: string;
};

export type ListingSubmissionResult = {
  listingId: string;
  slug: string;
  abgaLink?: string;
};

export async function submitListingIntake(
  input: ListingSubmissionInput
): Promise<ListingSubmissionResult> {
  const buckName = input.buckName.trim();
  const registrationNumber = input.registrationNumber.trim();
  const sellerEmail = input.sellerEmail.trim().toLowerCase();

  if (!buckName || !registrationNumber || !sellerEmail) {
    throw new Error("Buck name, registration number, and seller email are required.");
  }

  const [listingsRaw, lineageRaw, contactsRaw] = await Promise.all([
    readFile(LISTINGS_CSV_PATH, "utf8"),
    readFile(LINEAGE_CSV_PATH, "utf8"),
    readOptionalFile(CONTACTS_CSV_PATH, CONTACTS_HEADERS)
  ]);

  const listingRows = parseCsv(listingsRaw);
  const lineageRows = parseCsv(lineageRaw);
  const contactRows = parseCsv(contactsRaw);

  const listingId = getNextListingId(listingRows);
  const slug = buildUniqueSlug(buckName, registrationNumber, listingId, listingRows);
  const sortOrder = String(getNextSortOrder(listingRows));
  const timestamp = new Date().toISOString();
  const abgaLink = await lookupAbgaDetailsLink(registrationNumber);

  const listingRow: CsvRow = {
    listingId,
    slug,
    buckName,
    registrationNumber,
    abgaLink: abgaLink ?? "",
    description: "",
    breed: "",
    association: abgaLink ? "ABGA" : "",
    status: "inactive",
    sortOrder,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  const lineageRow: CsvRow = {
    listingId,
    color: "",
    fullBlood: "",
    enoblement: "",
    sire: "",
    dam: ""
  };

  const contactRow: CsvRow = {
    contactId: `contact-${listingId.replace("buck-", "")}`,
    listingId,
    email: sellerEmail,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await Promise.all([
    writeFile(
      LISTINGS_CSV_PATH,
      stringifyCsv([...listingRows, listingRow], LISTINGS_HEADERS),
      "utf8"
    ),
    writeFile(
      LINEAGE_CSV_PATH,
      stringifyCsv([...lineageRows, lineageRow], LINEAGE_HEADERS),
      "utf8"
    ),
    writeFile(
      CONTACTS_CSV_PATH,
      stringifyCsv([...contactRows, contactRow], CONTACTS_HEADERS),
      "utf8"
    )
  ]);

  return {
    listingId,
    slug,
    abgaLink: abgaLink ?? undefined
  };
}

async function lookupAbgaDetailsLink(
  registrationNumber: string
): Promise<string | undefined> {
  if (!/^\d+$/.test(registrationNumber)) {
    return undefined;
  }

  const searchUrl = "https://abga.icompete.net/Studbook";
  const getResponse = await fetch(searchUrl, { cache: "no-store" });
  const searchPageHtml = await getResponse.text();
  const requestVerificationToken = matchValue(
    /name="__RequestVerificationToken"[^>]*value="([^"]+)"/i,
    searchPageHtml
  );

  if (!requestVerificationToken) {
    return undefined;
  }

  const cookieHeader = getCookieHeader(getResponse);
  const response = await fetch(searchUrl, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: cookieHeader
    },
    body: new URLSearchParams({
      __RequestVerificationToken: requestVerificationToken,
      AnimalIdent: registrationNumber,
      AnimalName: "",
      BirthYear: "",
      Sire: "",
      Dam: "",
      Gender: "",
      Status: ""
    })
  });

  const resultsHtml = await response.text();
  const detailsHref = matchValue(
    /href="([^"]*\/Studbook\/Animals\/Details\/\d+)"/i,
    resultsHtml
  );

  if (!detailsHref) {
    return undefined;
  }

  return new URL(detailsHref, "https://abga.icompete.net").toString();
}

function getNextListingId(rows: CsvRow[]): string {
  const maxValue = rows.reduce((currentMax, row) => {
    const numericValue = Number(row.listingId.replace("buck-", ""));
    return Number.isFinite(numericValue) ? Math.max(currentMax, numericValue) : currentMax;
  }, 0);

  return `buck-${String(maxValue + 1).padStart(3, "0")}`;
}

function getNextSortOrder(rows: CsvRow[]): number {
  const maxValue = rows.reduce((currentMax, row) => {
    const numericValue = Number(row.sortOrder);
    return Number.isFinite(numericValue) ? Math.max(currentMax, numericValue) : currentMax;
  }, 0);

  return maxValue + 10;
}

function buildUniqueSlug(
  buckName: string,
  registrationNumber: string,
  listingId: string,
  rows: CsvRow[]
): string {
  const baseSlug =
    slugify(buckName) || slugify(registrationNumber) || `${listingId}-listing`;
  const existingSlugs = new Set(rows.map((row) => row.slug).filter(Boolean));

  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  return `${baseSlug}-${listingId}`;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function matchValue(pattern: RegExp, input: string): string | undefined {
  const match = input.match(pattern);
  return match?.[1];
}

function getCookieHeader(response: Response): string {
  const getSetCookie = response.headers.getSetCookie?.();
  if (getSetCookie && getSetCookie.length > 0) {
    return getSetCookie.map((value) => value.split(";", 1)[0]).join("; ");
  }

  const rawSetCookie = response.headers.get("set-cookie");
  if (!rawSetCookie) {
    return "";
  }

  return rawSetCookie
    .split(",")
    .map((value) => value.split(";", 1)[0].trim())
    .join("; ");
}

async function readOptionalFile(filePath: string, headers: string[]): Promise<string> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return stringifyCsv([], headers);
  }
}
