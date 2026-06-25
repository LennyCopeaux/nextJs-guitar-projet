import type { Product } from "../domain/product";
import { getMockProductBySlug, getMockProducts } from "../infrastructure/mock-repository";
import {
  getPrismaProductBySlug,
  getPrismaProducts,
} from "../infrastructure/prisma-repository";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await getPrismaProducts();

    if (dbProducts.length > 0) {
      return dbProducts;
    }
  } catch {
  }

  return getMockProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProduct = await getPrismaProductBySlug(slug);

    if (dbProduct) {
      return dbProduct;
    }
  } catch {
  }

  return getMockProductBySlug(slug);
}
