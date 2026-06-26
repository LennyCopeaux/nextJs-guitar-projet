import { Suspense } from "react";
import { ProductAnalyticsPanel } from "@/components/products/product-analytics-panel";
import { ProductMainSection } from "@/components/products/product-main-section";
import { SimilarProductsStream } from "@/components/products/similar-products-stream";
import { SponsoredProductsStream } from "@/components/sponsored/sponsored-products-stream";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import { getAllProducts } from "@/features/catalog/application/get-products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="space-y-10">
      <ProductMainSection slug={slug} />

      <Suspense fallback={<SectionSkeleton title="Analyse produit (unstable_cache)..." lines={3} />}>
        <ProductAnalyticsPanel slug={slug} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Produits similaires..." lines={4} />}>
        <SimilarProductsStream slug={slug} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Produits sponsorisés..." lines={4} />}>
        <SponsoredProductsStream
          first={3}
          title="Produits sponsorisés sur cette fiche"
        />
      </Suspense>
    </div>
  );
}
