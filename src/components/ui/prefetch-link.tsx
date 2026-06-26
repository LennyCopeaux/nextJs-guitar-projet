"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PrefetchMode } from "@/lib/ab-prefetch";

type PrefetchLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  prefetchMode: PrefetchMode;
};

export function PrefetchLink({
  href,
  className,
  children,
  prefetchMode,
}: PrefetchLinkProps) {
  const router = useRouter();

  if (prefetchMode === "hover") {
    return (
      <Link
        href={href}
        className={className}
        prefetch={false}
        onMouseEnter={() => router.prefetch(href)}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className} prefetch>
      {children}
    </Link>
  );
}
