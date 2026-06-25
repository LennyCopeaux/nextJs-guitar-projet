import Link from "next/link";

export default function FrontNotFound() {
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-line bg-white p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Erreur</p>
      <h1 className="mt-2 text-3xl font-semibold">Produit introuvable</h1>
      <p className="mt-3 text-muted">
        La page que vous cherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link href="/" className="btn-primary mt-6 inline-flex">
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
