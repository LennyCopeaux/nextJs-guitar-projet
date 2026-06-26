"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function RefreshSponsoredButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  async function handleRefresh() {
    setMessage(null);

    const response = await fetch("/api/revalidate/sponsored", {
      method: "POST",
    });

    if (!response.ok) {
      setMessage("Erreur lors de l'actualisation");
      return;
    }

    const data = (await response.json()) as { revalidatedAt: string };
    setMessage(`Cache invalidé à ${new Date(data.revalidatedAt).toLocaleTimeString("fr-FR")}`);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleRefresh}
        disabled={isPending}
        className="btn-outline text-sm"
      >
        {isPending ? "Actualisation..." : "Actualiser"}
      </button>
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}
