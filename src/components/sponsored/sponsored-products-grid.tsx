import type { SponsoredProduct } from "@/features/sponsored/domain/sponsored-product";
import { SponsoredProductCard } from "./sponsored-product-card";

type SponsoredProductsGridProps = {
  products: SponsoredProduct[];
  title?: string;
  action?: React.ReactNode;
};

export function SponsoredProductsGrid({
  products,
  title = "Produits sponsorisés",
  action,
}: SponsoredProductsGridProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {action}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <SponsoredProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
