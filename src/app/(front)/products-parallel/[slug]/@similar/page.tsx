import { SimilarProductsStream } from "@/components/products/similar-products-stream";

type SimilarParallelSlotProps = {
  params: Promise<{ slug: string }>;
};

export default async function SimilarParallelSlot({
  params,
}: SimilarParallelSlotProps) {
  const { slug } = await params;

  return (
    <SimilarProductsStream
      slug={slug}
      delayMs={1500}
    />
  );
}
