import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getProductBySlug } from "@/features/catalog/application/get-products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { tab = "description" } = await searchParams;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const activeTab = tab === "specs" ? "specs" : "description";

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

          <AddToCartButton slug={product.slug} name={product.name} price={product.price} />

          <div className="rounded-2xl border border-line">
            <div className="flex border-b border-line bg-[#f6f4f1]">
              <Link
                href={`/products/${product.slug}?tab=description`}
                className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === "description"
                    ? "border-foreground bg-white text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                Description
              </Link>
              <Link
                href={`/products/${product.slug}?tab=specs`}
                className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === "specs"
                    ? "border-foreground bg-white text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                Caracteristiques
              </Link>
            </div>

            <div className="p-4">
              {activeTab === "description" ? (
                <p className="leading-7 text-foreground/85">{product.description}</p>
              ) : (
                <ul className="space-y-2 text-sm text-foreground/85">
                  {product.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex justify-between border-b border-line pb-2"
                    >
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
