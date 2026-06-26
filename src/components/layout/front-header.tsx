import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { CartRefreshListener } from "@/components/cart/cart-refresh-listener";
import { CartSummary } from "@/components/cart/cart-summary";
import { getTrigram } from "@/lib/trigram";

async function NavLinks() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="hidden gap-5 text-sm font-medium text-foreground/80 sm:flex">
      <Link href="/">Boutique</Link>
      {isAdmin ? <Link href="/admin/products">Admin</Link> : null}
    </nav>
  );
}

async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/auth/login" className="text-sm font-medium text-foreground/80 hover:text-foreground">
        Connexion
      </Link>
    );
  }

  return (
  <>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
        title={session.user.name ?? session.user.email ?? "Utilisateur"}
      >
        {getTrigram(session.user.name ?? session.user.email ?? "U")}
      </span>
      <SignOutButton />
    </>
  );
}

export function FrontHeader() {
  return (
    <CartRefreshListener>
      <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-display text-4xl leading-none text-brand">
              My Supa Guitar
            </Link>
            <Suspense fallback={null}>
              <NavLinks />
            </Suspense>
          </div>

          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <UserMenu />
            </Suspense>
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
        </div>
      </header>
    </CartRefreshListener>
  );
}
