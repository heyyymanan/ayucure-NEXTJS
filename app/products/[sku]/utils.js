
export async function getProductBySKU(sku) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}
