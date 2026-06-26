import { cookies } from "next/headers";

export type AbPrefetchVariant = "A" | "B";
export type PrefetchMode = "default" | "hover";

export async function getAbPrefetchVariant(): Promise<AbPrefetchVariant> {
  const cookieStore = await cookies();
  const variant = cookieStore.get("ab_prefetch")?.value;

  return variant === "B" ? "B" : "A";
}

export function getPrefetchMode(variant: AbPrefetchVariant): PrefetchMode {
  return variant === "A" ? "default" : "hover";
}
