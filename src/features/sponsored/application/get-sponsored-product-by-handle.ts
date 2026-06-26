import type { SponsoredProduct } from "../domain/sponsored-product";
import { fetchSponsoredProductByHandleFromGraphQL } from "../infrastructure/graphql-client";

export async function getSponsoredProductByHandle(
  handle: string,
): Promise<SponsoredProduct | null> {
  return fetchSponsoredProductByHandleFromGraphQL(handle);
}
