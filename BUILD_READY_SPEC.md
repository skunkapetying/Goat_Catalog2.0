# Goat Semen Catalog Website

## Goal

Build a public website that acts as a searchable goat semen catalog.

Version 1 includes:

- A catalog page with search and filters
- An individual listing page for each buck
- Data managed in a Grist table

Version 1 does not include:

- A homepage
- A contact page
- A multi-user admin dashboard

## Recommended Stack

Use:

- `Next.js`
- `TypeScript`
- `Tailwind CSS`
- Static or server-rendered data pulled from Grist

Why this stack:

- It supports clean routing for `/catalog` and `/bucks/[slug]`
- It is a simple path for building search and filters
- It leaves room to add a CMS or team workflow later

## Site Map

### Public Pages

- `/catalog`
- `/bucks/[slug]`

### User Flow

1. Visitor lands on `/catalog`
2. Visitor searches by text or applies filters
3. Visitor scans result cards
4. Visitor opens a buck detail page
5. Visitor returns to the catalog to continue browsing

## Data Source

Use one Grist table named `bucks`.

Each row represents one buck listing.

## Grist Data Model

### Required Fields

| Field | Type | Notes |
|---|---|---|
| `id` | Text | Stable internal ID |
| `slug` | Text | Unique URL slug |
| `buckName` | Text | Main listing title |
| `registrationNumber` | Text | Official registration number |
| `breed` | Choice/Text | Breed name |
| `color` | Text | Color description |
| `bloodStatus` | Choice | `Percentage` or `Full Blooded` |
| `pedigree` | Text | Full pedigree text |
| `sire` | Text | Sire name |
| `dam` | Text | Dam name |
| `enoblementOrPoints` | Text | Keep flexible for mixed formatting |
| `showCorrect` | Choice | `Yes`, `No`, or `Unknown` |
| `teatStructure` | Text | Short structure notes |
| `isAvailable` | Bool | Availability flag |

### Recommended Fields

| Field | Type | Notes |
|---|---|---|
| `profileImage` | Text | Main image URL/path |
| `gallery` | Text | Comma-separated URLs for v1 |
| `notes` | Text | Public extra notes |
| `sortOrder` | Numeric | Manual display order |
| `createdAt` | DateTime | Record creation date |
| `updatedAt` | DateTime | Record update date |

## Website Field Labels

Map Grist fields to display labels like this:

| Data Key | Website Label |
|---|---|
| `buckName` | Buck Name |
| `registrationNumber` | Registration Number |
| `breed` | Breed |
| `color` | Color |
| `bloodStatus` | Percentage/Full Blooded |
| `pedigree` | Pedigree |
| `sire` | Sire |
| `dam` | Dam |
| `enoblementOrPoints` | Enoblement / Points |
| `showCorrect` | Show Correct |
| `teatStructure` | Teat Structure |
| `isAvailable` | Availability |
| `notes` | Notes |

## Search and Filter Spec

Keep the rules simple for version 1.

### Text Search

One search box should match partial text across:

- `buckName`
- `registrationNumber`
- `color`
- `sire`
- `dam`

Behavior:

- Case-insensitive
- Partial-match search
- Ignore leading and trailing spaces

### Filters

Use exact-match filters for:

- `breed`
- `bloodStatus`
- `showCorrect`
- `teatStructure`
- `isAvailable`

### Sorting

Default sort:

1. `sortOrder` ascending when present
2. `buckName` ascending as fallback

### Empty States

If no results match:

- Show `No bucks match your current search or filters.`
- Provide a `Clear filters` action

## Catalog Page Spec

Route: `/catalog`

### Main Sections

1. Page title
2. Search input
3. Filter controls
4. Result count
5. Result card grid or list

### Required UI Elements

- Search input with placeholder:
  `Search by buck name, reg. number, sire, dam, or color`
- Filter dropdown for breed
- Filter dropdown for percentage/full blooded
- Filter dropdown for show correct
- Filter dropdown for teat structure
- Filter toggle or dropdown for availability
- Clear filters button
- Results count

### Result Card Fields

Each card should show:

- Profile image if available
- Buck name
- Registration number
- Breed
- Color
- Blood status
- Sire
- Dam
- Show correct
- Availability
- Link to full listing

### URL State

Search and filters should live in the URL query string.

Examples:

- `/catalog?q=archer`
- `/catalog?breed=Nubian&bloodStatus=Full%20Blooded`
- `/catalog?q=titan&showCorrect=Yes`

This makes the catalog shareable and easier to debug.

## Buck Detail Page Spec

Route: `/bucks/[slug]`

### Main Sections

1. Header with buck name and key facts
2. Main image
3. Quick facts
4. Pedigree section
5. Notes section
6. Optional gallery
7. Back to catalog link

### Required Display Fields

- Buck name
- Registration number
- Breed
- Color
- Availability
- Percentage/Full Blooded
- Enoblement / Points
- Show Correct
- Teat Structure
- Sire
- Dam
- Pedigree
- Notes when present

### Page Rules

- If a field is empty, hide that row instead of showing a blank value
- If no image exists, show a simple placeholder
- If the slug does not exist, return a `404`

## Data Validation Rules

Apply these rules in Grist or in the site import layer:

- `slug` must be unique
- `buckName` is required
- `registrationNumber` is strongly recommended
- `bloodStatus` should only allow `Percentage` or `Full Blooded`
- `showCorrect` should only allow `Yes`, `No`, or `Unknown`
- `isAvailable` should be boolean

## Suggested Folder Structure

```text
src/
  app/
    catalog/
      page.tsx
    bucks/
      [slug]/
        page.tsx
  components/
    catalog/
      catalog-filters.tsx
      catalog-search.tsx
      buck-card.tsx
    bucks/
      buck-detail.tsx
      pedigree-panel.tsx
  lib/
    grist.ts
    bucks.ts
    filters.ts
    types.ts
  data/
    sample-bucks.json
```

## TypeScript Model

```ts
export type BloodStatus = "Percentage" | "Full Blooded";
export type ShowCorrect = "Yes" | "No" | "Unknown";

export type BuckRecord = {
  id: string;
  slug: string;
  buckName: string;
  registrationNumber: string;
  breed: string;
  color: string;
  bloodStatus: BloodStatus;
  pedigree: string;
  sire: string;
  dam: string;
  enoblementOrPoints: string;
  showCorrect: ShowCorrect;
  teatStructure: string;
  isAvailable: boolean;
  profileImage?: string;
  gallery?: string[];
  notes?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};
```

## Build Order

1. Create the Grist table
2. Add 3 to 5 real sample buck records
3. Build the TypeScript type and data mapper
4. Build the `/catalog` page
5. Add search and filter state in the URL
6. Build `/bucks/[slug]`
7. Test with real entries that have missing optional fields

## Future Extensions

Possible later additions:

- Team editing workflow
- Direct Grist API sync
- Structured multi-generation pedigree data
- Inquiry forms
- Saved searches
- Breed-specific landing pages
