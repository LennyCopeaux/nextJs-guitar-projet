import { SponsoredProductsGrid } from "@/components/sponsored/sponsored-products-grid";
import { getSponsoredProducts } from "@/features/sponsored/application/get-sponsored-products";
import { sleep } from "@/lib/sleep";

type SponsoredProductsStreamProps = {
  first?: number;
  delayMs?: number;
  title?: string;
  action?: React.ReactNode;
};

export async function SponsoredProductsStream({
  first = 3,
  delayMs = 800,
  title,
  action,
}: SponsoredProductsStreamProps) {
  await sleep(delayMs);

  const products = await getSponsoredProducts(first);

  return (
    <SponsoredProductsGrid products={products} title={title} action={action} />
  );
}
