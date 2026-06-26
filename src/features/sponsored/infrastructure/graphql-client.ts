const GRAPHQL_URL =
  "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage { url }
        priceRange {
          minVariantPrice { amount currencyCode }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      featuredImage { url }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
    }
  }
`;

type GraphQLProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

type GraphQLProductsResponse = {
  data: {
    products: { nodes: GraphQLProductNode[] };
  };
};

type GraphQLProductResponse = {
  data: {
    productByHandle: GraphQLProductNode | null;
  };
};

export type SponsoredCacheStrategy = "force-cache" | "no-store" | "revalidate";

function getFetchInit(tag?: string): RequestInit {
  const strategy =
    (process.env.SPONSORED_CACHE_STRATEGY as SponsoredCacheStrategy | undefined) ??
    "revalidate";

  switch (strategy) {
    case "force-cache":
      return { cache: "force-cache" };
    case "no-store":
      return { cache: "no-store" };
    default:
      return {
        next: {
          revalidate: 3600,
          tags: tag ? [tag] : undefined,
        },
      };
  }
}

async function graphqlFetch<T>(
  query: string,
  variables: Record<string, unknown>,
  tag?: string,
): Promise<T> {
  const start = performance.now();

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    ...getFetchInit(tag),
  });

  console.log(
    `[graphqlStore] fetch products ${(performance.now() - start).toFixed(0)}ms (strategy: ${process.env.SPONSORED_CACHE_STRATEGY ?? "revalidate"})`,
  );

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function toSponsoredProduct(node: GraphQLProductNode) {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    imageUrl: node.featuredImage?.url ?? "/placeholder-product.jpg",
    price: Number.parseFloat(node.priceRange.minVariantPrice.amount),
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
  };
}

export async function fetchSponsoredProductsFromGraphQL(first = 6) {
  const json = await graphqlFetch<GraphQLProductsResponse>(
    GET_PRODUCTS_QUERY,
    { first },
    "sponsored-products",
  );

  return json.data.products.nodes.map(toSponsoredProduct);
}

export async function fetchSponsoredProductByHandleFromGraphQL(handle: string) {
  const json = await graphqlFetch<GraphQLProductResponse>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle },
    "sponsored-products",
  );

  const node = json.data.productByHandle;
  return node ? toSponsoredProduct(node) : null;
}
