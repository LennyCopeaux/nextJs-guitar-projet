import { unstable_cache } from "next/cache";
import { PRODUCT_ANALYTICS_TAG } from "@/lib/cache-tags";
import { sleep } from "@/lib/sleep";

export type ProductAnalytics = {
  slug: string;
  popularityScore: number;
  recommendationTier: string;
  computedAt: string;
  durationMs: number;
  fromCache: boolean;
};

async function computeProductAnalytics(slug: string): Promise<ProductAnalytics> {
  const start = performance.now();

  // Simulation d'un calcul coûteux (agrégations, scoring, etc.)
  await sleep(600);

  const seed = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const popularityScore = ((seed * 17) % 100) + 1;

  return {
    slug,
    popularityScore,
    recommendationTier:
      popularityScore > 75 ? "Premium" : popularityScore > 50 ? "Standard" : "Essentiel",
    computedAt: new Date().toISOString(),
    durationMs: Math.round(performance.now() - start),
    fromCache: false,
  };
}

export async function getUncachedProductAnalytics(
  slug: string,
): Promise<ProductAnalytics> {
  const result = await computeProductAnalytics(slug);
  console.log(
    `[analytics] sans cache pour "${slug}" — ${result.durationMs}ms (score: ${result.popularityScore})`,
  );
  return result;
}

const getCachedProductAnalyticsInternal = unstable_cache(
  async (slug: string) => {
    const result = await computeProductAnalytics(slug);
    console.log(
      `[analytics] calcul cache miss pour "${slug}" — ${result.durationMs}ms`,
    );
    return { ...result, fromCache: true };
  },
  ["product-analytics"],
  {
    revalidate: 3600,
    tags: [PRODUCT_ANALYTICS_TAG],
  },
);

export async function getCachedProductAnalytics(
  slug: string,
): Promise<ProductAnalytics> {
  const start = performance.now();
  const result = await getCachedProductAnalyticsInternal(slug);
  console.log(
    `[analytics] avec unstable_cache pour "${slug}" — ${(performance.now() - start).toFixed(0)}ms total`,
  );
  return result;
}
