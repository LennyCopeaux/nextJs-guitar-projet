import type { Product } from "../domain/product";
import { getPrismaSimilarProducts } from "../infrastructure/prisma-similar-repository";

export async function getSimilarProducts(slug: string): Promise<Product[]> {
  try {
    const similarProducts = await getPrismaSimilarProducts(slug);

    if (similarProducts.length > 0) {
      return similarProducts;
    }
  } catch {
  }

  return [];
}
