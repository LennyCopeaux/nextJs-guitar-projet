import Link from "next/link";
import { FrontHeader } from "@/components/layout/front-header";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <FrontHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-7 text-sm text-muted sm:px-6">
          <p>My Supa Guitar — Boutique de guitares electriques</p>
          <Link href="/admin/products" className="font-semibold text-foreground">
            Aller a l&apos;admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
