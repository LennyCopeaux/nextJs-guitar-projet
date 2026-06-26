import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SPONSORED_PRODUCTS_TAG } from "@/lib/cache-tags";

export async function POST() {
  revalidateTag(SPONSORED_PRODUCTS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/products", "layout");

  return NextResponse.json({
    ok: true,
    revalidatedAt: new Date().toISOString(),
    tags: [SPONSORED_PRODUCTS_TAG],
  });
}
