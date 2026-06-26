import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { UpdateProductForm } from "@/components/admin/update-product-form";
import { getProductBySlug } from "@/features/catalog/application/get-products";

type AdminEditProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditProductPage({
  params,
}: AdminEditProductPageProps) {
  await connection();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <div>
        <Link href="/admin/products" className="text-sm font-semibold text-brand hover:underline">
          ← Retour à la liste
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Modifier {product.name}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Server Action + Zod + revalidateTag après mutation
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-[#eceae6]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{product.slug}</p>
            <p className="text-sm text-muted">{product.price.toFixed(2)} EUR</p>
          </div>
        </div>

        <UpdateProductForm product={product} />
      </div>
    </section>
  );
}
