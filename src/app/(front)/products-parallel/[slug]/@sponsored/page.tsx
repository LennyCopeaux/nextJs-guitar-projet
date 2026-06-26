import { SponsoredProductsStream } from "@/components/sponsored/sponsored-products-stream";

export default function SponsoredParallelSlot() {
  return (
    <SponsoredProductsStream
      first={3}
      delayMs={1000}
      title="Slot @sponsored (Parallel Routes)"
    />
  );
}
