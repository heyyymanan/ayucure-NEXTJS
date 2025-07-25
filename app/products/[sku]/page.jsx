import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page";

async function getProductBySKU(sku) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const product = await getProductBySKU(params.sku);
  const variant = product?.variants.find(v => v.sku === params.sku);

  if (!product || !variant) {
    return {
      title: "Product Not Found - BynaTablet.in",
      description: "This product was not found or is unavailable.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${product.name} - ${product.short_description} - ${product.remedy_for?.join(", ")} - BynaTablet.in`,
    description: product.short_description,
    keywords: product.remedy_for?.join(", ")+", "+product.short_description+", "+product.key_benefits.join(", "),
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [{ url: variant?.image || product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySKU(params.sku);
  const variant =  product?.variants.find(v => v.sku === params.sku);

  if (!product || !variant) return notFound();

  return <ProductPageClient product={product} selectedVariant={variant} />;
}