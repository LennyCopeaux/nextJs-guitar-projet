import Image from "next/image";
import Link from "next/link";
import type { SponsoredProduct } from "@/features/sponsored/domain/sponsored-product";

type SponsoredProductCardProps = {
  product: SponsoredProduct;
  showCart?: boolean;
};

export function SponsoredProductCard({
  product,
  showCart = false,
}: SponsoredProductCardProps) {
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

        <Link href={`/sponsored/${product.handle}`} className="btn-outline inline-flex">
          Voir la fiche
        </Link>

        {showCart ? (
          <p className="text-xs text-muted">Panier indisponible pour les produits sponsorisés</p>
        ) : null}
      </div>
    </article>
  );
}
