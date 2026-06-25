import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { getSimilarProducts } from "@/features/catalog/application/get-similar-products";
import {
  getAllProducts,
  getProductBySlug,
} from "@/features/catalog/application/get-products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, similarProducts] = await Promise.all([
    getProductBySlug(slug),
    getSimilarProducts(slug),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} similarProducts={similarProducts} />;
}
