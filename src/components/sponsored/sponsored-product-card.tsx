import Image from "next/image";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import type { SponsoredProduct } from "@/features/sponsored/domain/sponsored-product";
import { getAbPrefetchVariant, getPrefetchMode } from "@/lib/ab-prefetch";

type SponsoredProductCardProps = {
  product: SponsoredProduct;
};

export async function SponsoredProductCard({ product }: SponsoredProductCardProps) {
  const prefetchMode = getPrefetchMode(await getAbPrefetchVariant());

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="relative aspect-[4/3] bg-[#eceae6]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-2 py-1 text-xs font-semibold text-white">
          Sponsorisé
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
        </div>

        <p className="text-lg font-semibold">
          {product.price.toFixed(2)} {product.currencyCode}
        </p>

        <PrefetchLink
          href={`/sponsored/${product.handle}`}
          className="btn-outline inline-flex"
          prefetchMode={prefetchMode}
        >
          Voir la fiche
        </PrefetchLink>

        <p className="text-xs text-muted">Panier indisponible pour les produits sponsorisés</p>
      </div>
    </article>
  );
}
