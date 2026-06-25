"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/features/catalog/domain/product";

type CartLine = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: Pick<Product, "slug" | "name" | "price">) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addToCart(product: Pick<Product, "slug" | "name" | "price">) {
    setLines((currentLines) => {
      const existing = currentLines.find((line) => line.slug === product.slug);

      if (!existing) {
        return [...currentLines, { ...product, quantity: 1 }];
      }

      return currentLines.map((line) =>
        line.slug === product.slug
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      );
    });
  }

  const value = useMemo(() => {
    const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
    const totalPrice = lines.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    );

    return {
      lines,
      totalQuantity,
      totalPrice,
      addToCart,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
