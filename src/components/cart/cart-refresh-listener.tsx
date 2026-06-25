"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CART_UPDATED_EVENT } from "@/lib/cart-events";

export function CartRefreshListener({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function handleCartUpdated() {
      router.refresh();
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
  }, [router]);

  return children;
}
