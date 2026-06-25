import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/admin/products" className="font-display text-4xl leading-none text-brand">
          My Supa Guitar
        </Link>

        <Link href="/" className="btn-outline text-sm">
          Retour a la boutique
        </Link>
      </div>
    </header>
  );
}
