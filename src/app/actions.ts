"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { submitListingIntake } from "@/lib/submissions";

export async function submitListingAction(formData: FormData) {
  const buckName = String(formData.get("buckName") ?? "").trim();
  const registrationNumber = String(formData.get("registrationNumber") ?? "").trim();
  const sellerEmail = String(formData.get("sellerEmail") ?? "").trim();

  try {
    const result = await submitListingIntake({
      buckName,
      registrationNumber,
      sellerEmail
    });

    revalidatePath("/");
    revalidatePath("/catalog");
    revalidatePath(`/bucks/${result.slug}`);
    redirect(`/bucks/${result.slug}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save the listing submission.";

    const params = new URLSearchParams({
      saveStatus: "error",
      saveMessage: message,
      buckName,
      registrationNumber,
      sellerEmail
    });

    redirect(`/?${params.toString()}`);
  }
}
