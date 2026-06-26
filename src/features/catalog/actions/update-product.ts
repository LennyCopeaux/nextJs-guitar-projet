"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { PRODUCTS_TAG } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";

const updateProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(2, "Le nom est trop court"),
  shortDescription: z.string().min(2, "La description courte est trop courte"),
  description: z.string().min(10, "La description est trop courte"),
  price: z.coerce.number().positive("Le prix doit être positif"),
  imageUrl: z.string().url("URL d'image invalide"),
  forceError: z.string().optional(),
});

export type UpdateProductState = {
  error?: string;
  success?: boolean;
};

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return { error: "Accès refusé : rôle admin requis" };
  }

  if (formData.get("forceError") === "1") {
    return { error: "Erreur de test volontaire depuis le bouton de debug" };
  }

  const parsed = updateProductSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
    forceError: formData.get("forceError")?.toString(),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { slug, ...data } = parsed.data;

  try {
    const updated = await prisma.product.update({
      where: { slug },
      data,
    });

    if (!updated) {
      return { error: "Produit introuvable en base" };
    }
  } catch {
    return { error: "Échec de la mise à jour du produit" };
  }

  revalidateTag(PRODUCTS_TAG, "max");
  revalidateTag(`product-${slug}`, "max");
  revalidatePath("/");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin/products");

  return { success: true };
}
