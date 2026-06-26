"use client";

import { useTransition } from "react";
import { signOutAction } from "@/features/auth/actions/sign-out";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => signOutAction())}
      className="text-sm font-medium text-foreground/80 hover:text-foreground"
    >
      {isPending ? "..." : "Déconnexion"}
    </button>
  );
}
