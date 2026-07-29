export type LineageRecord = {
  color?: string;
  fullBlood?: string;
  enoblement?: string;
  sire?: string;
  dam?: string;
};

export type BuckRecord = {
  id: string;
  slug: string;
  buckName: string;
  registrationNumber: string;
  breed: string;
  association?: string;
  status: "active" | "inactive";
  lineage: LineageRecord;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CatalogSearchParams = {
  q?: string;
  breed?: string;
  association?: string;
  color?: string;
  enoblement?: string;
  fullBlood?: string;
};

export type CatalogOptions = {
  breeds: string[];
  associations: string[];
  colors: string[];
  enoblementOptions: string[];
  fullBloodOptions: string[];
};
