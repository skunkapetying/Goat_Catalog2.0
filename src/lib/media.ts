import { access } from "node:fs/promises";
import path from "node:path";

const LISTINGS_DIRECTORY = path.join(process.cwd(), "public", "listings");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const PDF_EXTENSIONS = [".pdf"];

export type ListingMediaRecord = {
  profileImage?: string;
  pedigreeImage?: string;
  catalogPagePdf?: string;
  catalogPagePreviewImage?: string;
  galleryImage?: string;
};

export async function resolveListingMedia(
  slug: string,
  mediaRow?: Record<string, string>
): Promise<ListingMediaRecord> {
  const [profileImage, pedigreeImage, catalogPagePdf, catalogPagePreviewImage, galleryImage] =
    await Promise.all([
      mediaRow?.profileImage || findAsset(slug, `${slug}_profile`, IMAGE_EXTENSIONS),
      mediaRow?.pedigreeImage || findAsset(slug, `${slug}_pedigree`, IMAGE_EXTENSIONS),
      mediaRow?.catalogPagePdf || findAsset(slug, "catalog-page-01", PDF_EXTENSIONS),
      mediaRow?.catalogPagePreviewImage || findAsset(slug, "catalog-page-01", IMAGE_EXTENSIONS),
      mediaRow?.galleryImage || findAsset(slug, `${slug}_gallery`, IMAGE_EXTENSIONS)
    ]);

  return {
    profileImage: profileImage || undefined,
    pedigreeImage: pedigreeImage || undefined,
    catalogPagePdf: catalogPagePdf || undefined,
    catalogPagePreviewImage: catalogPagePreviewImage || undefined,
    galleryImage: galleryImage || undefined
  };
}

async function findAsset(
  slug: string,
  baseName: string,
  extensions: string[]
): Promise<string | undefined> {
  for (const extension of extensions) {
    const absolutePath = path.join(LISTINGS_DIRECTORY, slug, `${baseName}${extension}`);

    try {
      await access(absolutePath);
      return `/listings/${slug}/${baseName}${extension}`;
    } catch {
      continue;
    }
  }

  return undefined;
}
