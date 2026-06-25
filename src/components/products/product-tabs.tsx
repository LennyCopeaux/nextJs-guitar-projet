"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ProductSpecification } from "@/features/catalog/domain/product";

type ProductTabsProps = {
  slug: string;
  description: string;
  specs: ProductSpecification[];
};

export function ProductTabs({ slug, description, specs }: ProductTabsProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tab === "specs" ? "specs" : "description";

  return (
    <div className="rounded-2xl border border-line">
      <div className="flex border-b border-line bg-[#f6f4f1]">
        <Link
          href={`/products/${slug}?tab=description`}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "description"
              ? "border-foreground bg-white text-foreground"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Description
        </Link>
        <Link
          href={`/products/${slug}?tab=specs`}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "specs"
              ? "border-foreground bg-white text-foreground"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Caracteristiques
        </Link>
      </div>

      <div className="p-4">
        {activeTab === "description" ? (
          <p className="leading-7 text-foreground/85">{description}</p>
        ) : (
          <ul className="space-y-2 text-sm text-foreground/85">
            {specs.map((spec) => (
              <li key={spec.label} className="flex justify-between border-b border-line pb-2">
                <span className="font-medium">{spec.label}</span>
                <span>{spec.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
