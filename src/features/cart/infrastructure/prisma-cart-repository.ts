import { prisma } from "@/lib/prisma";
import type { CartSummary } from "../domain/cart";
import { EMPTY_CART_SUMMARY } from "../domain/cart";

export async function getPrismaCartSummary(cartId: string | null): Promise<CartSummary> {
  if (!cartId) {
    return EMPTY_CART_SUMMARY;
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return EMPTY_CART_SUMMARY;
  }

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return { totalQuantity, totalPrice };
}

export async function addPrismaProductToCart(
  cartId: string | null,
  slug: string,
): Promise<{ cartId: string; summary: CartSummary }> {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  let activeCartId = cartId;

  if (!activeCartId) {
    const cart = await prisma.cart.create({ data: {} });
    activeCartId = cart.id;
  } else {
    const existingCart = await prisma.cart.findUnique({
      where: { id: activeCartId },
    });

    if (!existingCart) {
      const cart = await prisma.cart.create({ data: {} });
      activeCartId = cart.id;
    }
  }

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: activeCartId,
        productId: product.id,
      },
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    create: {
      cartId: activeCartId,
      productId: product.id,
      quantity: 1,
    },
  });

  const summary = await getPrismaCartSummary(activeCartId);

  return { cartId: activeCartId, summary };
}
