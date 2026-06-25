import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductTabs } from "@/components/products/product-tabs";
import { SimilarProducts } from "@/components/products/similar-products";
import type { Product } from "@/features/catalog/domain/product";

type ProductDetailProps = {
  product: Product;
  similarProducts: Product[];
};

export function ProductDetail({ product, similarProducts }: ProductDetailProps) {
  return (
    <div className="space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Retour au catalogue
      </Link>

      <article className="grid gap-7 rounded-3xl border border-line bg-white p-4 md:grid-cols-2 md:p-7">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#eceae6]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Guitare electrique
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-1 text-muted">{product.shortDescription}</p>
          </div>

          <p className="text-2xl font-semibold">{product.price.toFixed(2)} EUR</p>

          <AddToCartButton slug={product.slug} />

          <Suspense
            fallback={
              <div className="rounded-2xl border border-line p-4 text-sm text-muted">
                Chargement des onglets...
              </div>
            }
          >
            <ProductTabs
              slug={product.slug}
              description={product.description}
              specs={product.specs}
            />
          </Suspense>
        </div>
      </article>

      <SimilarProducts products={similarProducts} />
    </div>
  );
}
