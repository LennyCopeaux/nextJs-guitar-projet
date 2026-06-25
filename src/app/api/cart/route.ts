import { NextResponse } from "next/server";
import { addProductToCart } from "@/features/cart/application/cart";
import { setCartId } from "@/lib/cart-cookie";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { slug?: string };

    if (!body.slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const { cartId, summary } = await addProductToCart(body.slug);

    await setCartId(cartId);

    return NextResponse.json(summary);
  } catch (error) {
    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "unable to update cart" }, { status: 500 });
  }
}
