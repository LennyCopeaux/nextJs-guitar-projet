import Image from "next/image";
import Link from "next/link";
import { getPrismaProducts } from "@/features/catalog/infrastructure/prisma-repository";

export default async function AdminProductsPage() {
  const products = await getPrismaProducts();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Catalogue
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Guitares en base</h1>
        <p className="mt-2 text-sm text-muted">
          {products.length} guitare{products.length > 1 ? "s" : ""} enregistree
          {products.length > 1 ? "s" : ""} dans SQLite
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#f6f4f1] text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Fiche</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-[#eceae6]">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted">{product.slug}</td>
                <td className="px-4 py-3 font-semibold">{product.price.toFixed(2)} EUR</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted" colSpan={5}>
                  Aucune guitare en base. Lance{" "}
                  <code className="rounded bg-[#f6f4f1] px-1.5 py-0.5 text-xs">
                    npm run prisma:seed
                  </code>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
