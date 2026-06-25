import { getCartSummary } from "@/features/cart/application/cart";

export async function CartSummary() {
  const { totalQuantity, totalPrice } = await getCartSummary();

  return (
    <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-foreground/80">
      Panier <strong className="text-foreground">{totalQuantity}</strong> -{" "}
      <strong className="text-foreground">{totalPrice.toFixed(2)} EUR</strong>
    </div>
  );
}
