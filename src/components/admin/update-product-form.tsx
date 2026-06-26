"use client";

import { useActionState } from "react";
import {
  updateProductAction,
  type UpdateProductState,
} from "@/features/catalog/actions/update-product";
import type { Product } from "@/features/catalog/domain/product";

const initialState: UpdateProductState = {};

type UpdateProductFormProps = {
  product: Product;
};

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const [state, formAction, isPending] = useActionState(updateProductAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={product.slug} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Nom
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-xl border border-line px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="shortDescription" className="mb-1 block text-sm font-medium">
            Description courte
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            defaultValue={product.shortDescription}
            required
            className="w-full rounded-xl border border-line px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            required
            rows={5}
            className="w-full rounded-xl border border-line px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium">
            Prix (EUR)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            required
            className="w-full rounded-xl border border-line px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium">
            URL image
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={product.imageUrl}
            required
            className="w-full rounded-xl border border-line px-3 py-2"
          />
        </div>
      </div>

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          Produit mis à jour — cache invalidé via revalidateTag.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>

        <button
          type="submit"
          name="forceError"
          value="1"
          disabled={isPending}
          className="btn-outline"
        >
          Tester une erreur
        </button>
      </div>
    </form>
  );
}
