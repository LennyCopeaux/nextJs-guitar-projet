import { cookies } from "next/headers";

const CART_COOKIE_NAME = "cart-id";

export async function getCartId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value ?? null;
}

export async function setCartId(cartId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}
