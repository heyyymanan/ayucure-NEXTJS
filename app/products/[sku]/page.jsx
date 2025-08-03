import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page";

// Fetch product data by SKU
async function getProductBySKU(sku) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

// Utility to ensure URLs are absolute
function toAbsoluteUrl(imgUrl) {
  if (!imgUrl) return "";
  try {
    // Is already absolute
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
      return imgUrl;
    }
    // Otherwise, join with site URL
    const base = process.env.NEXT_PUBLIC_SITE_URL || "";
    // Remove double slashes if any
    return base.replace(/\/$/, '') + '/' + imgUrl.replace(/^\//, '');
  } catch {
    return imgUrl;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProductBySKU(params.sku);
  const variant = product?.variants.find((v) => v.sku === params.sku);

  if (!product || !variant) {
    return {
      title: "Product Not Found - BynaTablet.in",
      description: "This product was not found or is unavailable.",
      robots: "noindex, nofollow",
    };
  }

  // Safe fallback for all optional values.
  const shortDesc = product.short_description || "";
  const remedyFor = (product.remedy_for || []).join(", ");
  const keyBenefits = (product.key_benefits || []).join(", ");

  // Choose the variant image, else the first product image, else fallback to blank image.
  const rawImageUrl = variant?.image || (product.images?.[0] ?? "");
  const imageUrl = toAbsoluteUrl(rawImageUrl);

  return {
    title: `${product.name} - ${shortDesc} - BynaTablet.in`,
    description: `${shortDesc} | ${remedyFor} | ${keyBenefits} | BynaTablet.in`,
    keywords: `${remedyFor}, ${shortDesc}, ${keyBenefits}`,
    openGraph: {
      title: product.name,
      description: shortDesc,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "website",
      siteName: "BynaTablet.in",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${params.sku}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: shortDesc,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySKU(params.sku);
  const variant = product?.variants.find((v) => v.sku === params.sku);

  if (!product || !variant) return notFound();

  return <ProductPageClient product={product} selectedVariant={variant} />;
}
