import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { getAllProducts, getProductBySlug } from "@/features/catalog/application/get-products";

type ProductParallelPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductParallelPage({
  params,
}: ProductParallelPageProps) {
  const { slug } = await params;
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

      <p className="rounded-2xl border border-line bg-[#f6f4f1] p-4 text-sm text-muted">
        Exercice 08 — Parallel Routes : le contenu principal charge ici, les slots{" "}
        <code>@sponsored</code> et <code>@similar</code> streament indépendamment.
      </p>

      <ProductDetail product={product} />
    </div>
  );
}
