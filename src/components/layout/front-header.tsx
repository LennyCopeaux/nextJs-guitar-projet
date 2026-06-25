import Link from "next/link";
import { Suspense } from "react";
import { CartRefreshListener } from "@/components/cart/cart-refresh-listener";
import { CartSummary } from "@/components/cart/cart-summary";

export function FrontHeader() {
  return (
    <CartRefreshListener>
      <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-display text-4xl leading-none text-brand">
              My Supa Guitar
            </Link>
            <nav className="hidden gap-5 text-sm font-medium text-foreground/80 sm:flex">
              <Link href="/">Boutique</Link>
              <Link href="/admin/products">Admin</Link>
            </nav>
          </div>

          <Suspense
            fallback={
              <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted">
                Panier ...
              </div>
            }
          >
            <CartSummary />
          </Suspense>
        </div>
      </header>
    </CartRefreshListener>
  );
}
