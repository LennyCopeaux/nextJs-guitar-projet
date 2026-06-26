import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllProducts } from "@/features/catalog/application/get-products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { RefreshSponsoredButton } from "@/components/sponsored/refresh-sponsored-button";
import { SponsoredProductsStream } from "@/components/sponsored/sponsored-products-stream";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-10">
      <Suspense
        fallback={
          <SectionSkeleton title="Produits sponsorisés (GraphQL)..." lines={5} />
        }
      >
        <SponsoredProductsStream
          first={6}
          action={<RefreshSponsoredButton />}
        />
      </Suspense>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Nos guitares</h2>
          <p className="text-sm text-muted">{products.length} produits</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  sizes="(max-width: 1024px) 100vw, 33vw"
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
    </div>
  );
}
