
export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/products/${params.sku}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      title: 'Product Not Found – BynaTablet.in',
      description: 'This product was not found.',
      robots: 'noindex, nofollow',
    };
  }

  const product = await res.json();
  const variant = product.variants.find(v => v.sku === params.sku);

  return {
    title: `${product.name} – Buy Now at ₹${variant?.price} | BynaTablet.in`,
    description: product.meta_description || `Buy ${product.name} by ${product.company} online at best price.`,
    keywords: product.meta_keywords || [`${product.name}`, product.company],
    alternates: {
      canonical: `https://bynatablet.in/product/${params.sku}`,
    },
    openGraph: {
      title: `${product.name} – BynaTablet.in`,
      description: product.meta_description || `Buy ${product.name} online in India.`,
      url: `https://bynatablet.in/product/${params.sku}`,
      images: [{ url: product.images?.[0] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.meta_description || `Buy ${product.name} online`,
      images: [product.images?.[0]],
    },
  };
}
