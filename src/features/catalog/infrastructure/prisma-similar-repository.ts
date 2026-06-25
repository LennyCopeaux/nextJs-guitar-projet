import { prisma } from "@/lib/prisma";
import { toDomainProduct } from "@/features/catalog/infrastructure/prisma-repository";
import type { Product } from "@/features/catalog/domain/product";

export async function getPrismaSimilarProducts(slug: string): Promise<Product[]> {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return [];
  }

  const relations = await prisma.similarProduct.findMany({
    where: { productId: product.id },
    include: {
      similar: true,
    },
  });

  return relations.map((relation) => toDomainProduct(relation.similar));
}
