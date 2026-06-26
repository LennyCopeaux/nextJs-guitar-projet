import {
  getCachedProductAnalytics,
  getUncachedProductAnalytics,
} from "@/lib/expensive-computation";

type ProductAnalyticsPanelProps = {
  slug: string;
};

export async function ProductAnalyticsPanel({ slug }: ProductAnalyticsPanelProps) {
  const [cached, uncached] = await Promise.all([
    getCachedProductAnalytics(slug),
    getUncachedProductAnalytics(slug),
  ]);

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-lg font-semibold">Analyse produit (unstable_cache)</h2>
      <p className="mt-2 text-sm text-muted">
        Comparaison d&apos;un calcul coûteux simulé avec et sans{" "}
        <code className="text-xs">unstable_cache</code>.
      </p>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-[#f6f4f1] p-4">
          <dt className="font-semibold">Avec unstable_cache</dt>
          <dd className="mt-2 text-muted">
            Score : {cached.popularityScore} — {cached.recommendationTier}
          </dd>
          <dd className="mt-1 text-xs text-muted">
            Temps total : {cached.durationMs}ms
          </dd>
        </div>

        <div className="rounded-xl border border-line bg-[#f6f4f1] p-4">
          <dt className="font-semibold">Sans cache</dt>
          <dd className="mt-2 text-muted">
            Score : {uncached.popularityScore} — {uncached.recommendationTier}
          </dd>
          <dd className="mt-1 text-xs text-muted">
            Temps calcul : {uncached.durationMs}ms
          </dd>
        </div>
      </dl>
    </section>
  );
}
