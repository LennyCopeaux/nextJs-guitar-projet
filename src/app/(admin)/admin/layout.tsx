import Link from "next/link";
import { Suspense } from "react";
import { AdminHeader } from "@/components/layout/admin-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AdminHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <Suspense fallback={<p className="text-muted">Chargement admin...</p>}>
          {children}
        </Suspense>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-7 text-sm text-muted sm:px-6">
          <p>My Supa Guitar — Administration</p>
          <Link href="/" className="font-semibold text-foreground">
            Voir la boutique
          </Link>
        </div>
      </footer>
    </div>
  );
}
