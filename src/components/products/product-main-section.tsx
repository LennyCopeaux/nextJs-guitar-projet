import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/features/catalog/application/get-products";

type ProductMainSectionProps = {
  slug: string;
};

export async function ProductMainSection({ slug }: ProductMainSectionProps) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
  <div className="space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Retour au catalogue
      </Link>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-line p-4 text-sm text-muted">
            Chargement des onglets...
          </div>
        }
      >
        <ProductDetail product={product} />
      </Suspense>
    </div>
  );
}
