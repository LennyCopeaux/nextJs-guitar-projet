import { connection } from "next/server";
import { SimilarProducts } from "@/components/products/similar-products";
import { getSimilarProducts } from "@/features/catalog/application/get-similar-products";
import { sleep } from "@/lib/sleep";

type SimilarProductsStreamProps = {
  slug: string;
  delayMs?: number;
};

export async function SimilarProductsStream({
  slug,
  delayMs = 1200,
}: SimilarProductsStreamProps) {
  await connection();
  await sleep(delayMs);

  const products = await getSimilarProducts(slug);

  return <SimilarProducts products={products} />;
}
