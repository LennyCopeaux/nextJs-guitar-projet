import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsoredProductByHandle } from "@/features/sponsored/application/get-sponsored-product-by-handle";

type SponsoredProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function SponsoredProductPage({
  params,
}: SponsoredProductPageProps) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
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
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            Produit sponsorisé
          </span>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Catalogue GraphQL
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.title}</h1>
          </div>

          <p className="text-2xl font-semibold">
            {product.price.toFixed(2)} {product.currencyCode}
          </p>

          <p className="leading-7 text-foreground/85">{product.description}</p>

          <p className="rounded-2xl border border-line bg-[#f6f4f1] p-4 text-sm text-muted">
            Les produits sponsorisés ne peuvent pas être ajoutés au panier.
          </p>
        </div>
      </article>
    </div>
  );
}
