import type { SponsoredProduct } from "../domain/sponsored-product";
import { fetchSponsoredProductsFromGraphQL } from "../infrastructure/graphql-client";

export async function getSponsoredProducts(
  first = 6,
): Promise<SponsoredProduct[]> {
  return fetchSponsoredProductsFromGraphQL(first);
}
