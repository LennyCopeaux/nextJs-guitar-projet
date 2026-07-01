import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import type { Product, ProductSpecification } from "../domain/product";

function normalizeSpecs(specs: Prisma.JsonValue): ProductSpecification[] {
  if (!Array.isArray(specs)) return [];

  return specs
    .map((spec) => {
      if (
        typeof spec === "object" &&
        spec !== null &&
        "label" in spec &&
        "value" in spec
      ) {
        return {
          label: String(spec.label),
          value: String(spec.value),
        };
      }

      return null;
    })
    .filter((spec): spec is ProductSpecification => spec !== null);
}

export function toDomainProduct(product: {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  price: number;
  specs: Prisma.JsonValue;
}): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    specs: normalizeSpecs(product.specs),
  };
}

export async function getPrismaProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(toDomainProduct);
}

export async function getPrismaProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  return product ? toDomainProduct(product) : null;
}
