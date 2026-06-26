import { unstable_cache } from "next/cache";
import type { Product } from "../domain/product";
import { getMockProductBySlug, getMockProducts } from "../infrastructure/mock-repository";
import {
  getPrismaProductBySlug,
  getPrismaProducts,
} from "../infrastructure/prisma-repository";
import { PRODUCTS_TAG } from "@/lib/cache-tags";

async function fetchAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await getPrismaProducts();

    if (dbProducts.length > 0) {
      return dbProducts;
    }
  } catch {
  }

  return getMockProducts();
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProduct = await getPrismaProductBySlug(slug);

    if (dbProduct) {
      return dbProduct;
    }
  } catch {
  }

  return getMockProductBySlug(slug);
}

const getCachedAllProductsInternal = unstable_cache(
  async () => {
    const start = performance.now();
    const products = await fetchAllProducts();
    console.log(
      `[products] unstable_cache miss — ${products.length} produits en ${(performance.now() - start).toFixed(0)}ms`,
    );
    return products;
  },
  ["all-products"],
  {
    revalidate: 3600,
    tags: [PRODUCTS_TAG],
  },
);

export async function getAllProducts(): Promise<Product[]> {
  const start = performance.now();
  const products = await getCachedAllProductsInternal();
  console.log(
    `[products] getAllProducts — ${(performance.now() - start).toFixed(0)}ms (${products.length} produits)`,
  );
  return products;
}

const getCachedProductBySlug = unstable_cache(
  async (slug: string) => fetchProductBySlug(slug),
  ["product-by-slug"],
  {
    revalidate: 3600,
    tags: [PRODUCTS_TAG],
  },
);

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getCachedProductBySlug(slug);
}
