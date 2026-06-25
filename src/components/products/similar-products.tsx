import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { Product } from "@/features/catalog/domain/product";

type SimilarProductsProps = {
  products: Product[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Produits similaires</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.slug}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="relative aspect-[4/3] bg-[#eceae6]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 p-4">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">{product.shortDescription}</p>
              </div>

              <p className="text-lg font-semibold">{product.price.toFixed(2)} EUR</p>

              <div className="flex items-center gap-2">
                <Link href={`/products/${product.slug}`} className="btn-outline">
                  Voir la fiche
                </Link>
                <AddToCartButton slug={product.slug} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
