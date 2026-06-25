"use client";

import { useState } from "react";
import { dispatchCartUpdated } from "@/lib/cart-events";

type AddToCartButtonProps = {
  slug: string;
};

export function AddToCartButton({ slug }: AddToCartButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      dispatchCartUpdated();
    } catch {
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Ajout..." : "Ajouter au panier"}
    </button>
  );
}
