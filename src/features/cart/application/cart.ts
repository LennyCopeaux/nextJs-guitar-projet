import { getCartId } from "@/lib/cart-cookie";
import type { CartSummary } from "../domain/cart";
import { EMPTY_CART_SUMMARY } from "../domain/cart";
import {
  addPrismaProductToCart,
  getPrismaCartSummary,
} from "../infrastructure/prisma-cart-repository";

export async function getCartSummary(): Promise<CartSummary> {
  try {
    const cartId = await getCartId();
    return await getPrismaCartSummary(cartId);
  } catch {
    return EMPTY_CART_SUMMARY;
  }
}

export async function addProductToCart(slug: string): Promise<{
  cartId: string;
  summary: CartSummary;
}> {
  const cartId = await getCartId();
  return addPrismaProductToCart(cartId, slug);
}
