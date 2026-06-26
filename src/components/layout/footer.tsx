import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");
  cacheTag("footer");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-7 text-sm text-muted sm:px-6">
        <p>My Supa Guitar — Boutique de guitares electriques ({year})</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin/products" className="font-semibold text-foreground">
            Aller a l&apos;admin
          </Link>
          <Link href="/products-parallel/strat-classic-v2" className="font-semibold text-foreground">
            Demo Parallel Routes
          </Link>
        </div>
      </div>
    </footer>
  );
}
