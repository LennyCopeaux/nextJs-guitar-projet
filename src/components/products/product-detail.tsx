import Image from "next/image";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductTabs } from "@/components/products/product-tabs";
import type { Product } from "@/features/catalog/domain/product";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
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

          <ProductTabs
            slug={product.slug}
            description={product.description}
            specs={product.specs}
          />
        </div>
      </article>
  );
}
