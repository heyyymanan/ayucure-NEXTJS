import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page";

async function getProductBySKU(sku) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

function toAbsoluteUrl(imgUrl) {
  if (!imgUrl) return "";
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) return imgUrl;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  return base.replace(/\/$/, '') + '/' + imgUrl.replace(/^\//, '');
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

  
  const shortDesc = product.short_description || "";
  const remedyFor = (product.remedy_for || []).join(", ");
  const keyBenefits = (product.key_benefits || []).join(", ");
  const siteName = "Byna Tablet"; // change if needed
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bynatablet.in";
  const productUrl = `${siteUrl}/products/${params.sku}`;

  
  const rawImageUrl = variant?.image || (product.images?.[0] ?? "");
  const imageUrl = toAbsoluteUrl(rawImageUrl);

  
  const imageWidth = 300;  
  const imageHeight = 300; 

  
  const priceAmount = variant?.price || product?.price || ""; 
  const priceCurrency = "INR"; 

  return {
    title: `${product.name} - ${shortDesc} - ${siteName}`,
    description: `${shortDesc} | ${remedyFor} | ${keyBenefits} | ${siteName}`,
    keywords: `${remedyFor}, ${shortDesc}, ${keyBenefits}`,
    openGraph: {
      siteName: siteName,
      url: productUrl,
      title: product.name,
      description: shortDesc,
      type: "website", 
      images: imageUrl ? [{
        url: imageUrl,
        width: imageWidth,
        height: imageHeight,
        alt: product.name,
        
      }] : [],
      price: {
        amount: priceAmount,
        currency: priceCurrency,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: "@vyas_mitra",
      title: product.name,
      description: shortDesc,
      images: imageUrl ? [imageUrl] : [],
    },
    
    custom: [
      { property: "og:image:secure_url", content: imageUrl },
      { property: "og:image:width", content: String(imageWidth) },
      { property: "og:image:height", content: String(imageHeight) },
      { property: "og:price:amount", content: String(priceAmount) },
      { property: "og:price:currency", content: priceCurrency },
      { name: "twitter:site", content: "@vyas_mitra" }
    ]
  };
}



export default async function ProductPage({ params }) {
  const product = await getProductBySKU(params.sku);
  const variant = product?.variants.find(v => v.sku === params.sku);

  if (!product || !variant) return notFound();

  return <ProductPageClient product={product} selectedVariant={variant} />;
}
