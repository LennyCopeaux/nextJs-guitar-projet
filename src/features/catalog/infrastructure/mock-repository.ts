import mockProducts from "./mock-products.json";
import type { Product } from "../domain/product";

export async function getMockProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getMockProductBySlug(slug: string): Promise<Product | null> {
  return mockProducts.find((product) => product.slug === slug) ?? null;
}
