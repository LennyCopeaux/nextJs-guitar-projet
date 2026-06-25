"use client";

import { useCart } from "./cart-context";

type AddToCartButtonProps = {
  slug: string;
  name: string;
  price: number;
};

export function AddToCartButton({ slug, name, price }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart({ slug, name, price })}
      className="btn-primary"
    >
      Ajouter au panier
    </button>
  );
}
