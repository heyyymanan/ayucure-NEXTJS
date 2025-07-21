"use client";

import { useState, useEffect, use } from "react";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/ui/addToCartBtn";
import Image from "next/image";



function decodeHtmlEntities(str) {
  if (typeof window === "undefined") return str;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

async function getProductBySKU(sku) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

function ProductDescription({ description }) {
  return (
    <div
      className="prose prose-sm sm:prose lg:prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse p-6 md:px-24 md:py-12">
      <div className="h-80 bg-gray-300 rounded-lg mb-4"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductBySKU(unwrappedParams.sku);
        const foundVariant = productData.variants.find(v => v.sku === unwrappedParams.sku);

        if (!productData || !foundVariant) {
          setIsError(true);
          return;
        }

        setProduct(productData);
        setSelectedVariant(foundVariant);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [unwrappedParams.sku]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleVariantChange = (e) => {
    const newSku = e.target.value;
    const variant = product.variants.find((v) => v.sku === newSku);
    setSelectedVariant(variant);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError || !product || !selectedVariant) {
    return (
      <>
        <head>
          <meta name="robots" content="noindex, nofollow" />
          <title>Product Not Found - BynaTablet.in</title>
        </head>
        <div className="text-center py-20 px-4">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or is currently unavailable.</p>
          <button
            onClick={() => window.location.href = "/shop-all"}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Browse All Products
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
    
      <section className="flex flex-col md:flex-row gap-8 p-6 md:px-24 md:py-12">
        <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-6">
          <div className="hidden md:flex flex-col gap-4">
            {product.images.map((img, idx) => (
              <Image
                height={300}
                width={300}
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-20 rounded-lg border object-cover cursor-pointer ${currentIndex === idx ? "border-orange-500" : "border-gray-300"}`}
                onClick={() => setCurrentIndex(idx)}
                loading="lazy"
              />
            ))}
          </div>

          <div className="hidden md:flex flex-1 justify-center items-start">
            <Image
              height={500}
              width={500}
              src={product.images[currentIndex]}
              alt="Main Product"
              className="rounded-2xl object-contain max-h-[26rem] border"
            />
          </div>

          <div className="md:hidden w-full relative">
            <div className="relative overflow-hidden rounded-2xl w-full h-72 border flex items-center justify-center">
              <Image
                height={200}
                width={200}
                src={product.images[currentIndex]}
                alt="Product"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <button
              onClick={handlePrev}
              className={`${product.images.length === 1 ? 'hidden' : 'absolute'} top-1/2 left-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full`}
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className={`${product.images.length === 1 ? 'hidden' : 'absolute'} top-1/2 right-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full`}
            >
              ❯
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <ProductInfo
            product={product}
            variant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
        </div>
      </section>

      <div className="md:hidden justify-evenly flex items-center fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
        <div className="">
          <select
            id="variant-selector"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={handleVariantChange}
            value={selectedVariant.sku}
          >
            {product.variants.map((v) => (
              <option key={v.sku} value={v.sku}>
                {v.size} - ₹{v.price}
              </option>
            ))}
          </select>
        </div>
        <AddToCartButton product={product} variantSku={selectedVariant.sku} />
      </div>
    </div>
  );
}

function ProductInfo({ product, variant, onVariantChange }) {
  return (
    <div>
      <div className="md:flex items-center justify-start gap-5">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-[12px] md:text-base text-gray-600 mb-1">- By {product.company}</p>
      </div>

      <div className="flex gap-5 mb-5 items-center">
        <p className="text-orange-600 font-semibold text-2xl md:text-3xl mt-1 ">
          ₹ {variant?.price} <span className="text-base text-center">(MRP Inclusive Of All Taxes)</span>
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Star className="text-yellow-400 fill-yellow-400" size={18} />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">
            ({product.reviews.length} reviews)
          </span>
        </div>
      </div>

      <RemedyList remedies={product.remedy_for} />

      <div className="w-full bg-black h-[1px] mt-5 mb-5 rounded-md"></div>

      <div className="hidden md:flex h-auto items-center justify-evenly">
        <div className="w-fit">
          <select
            id="variant-selector"
            className="w-full p-2 px-3 border border-gray-300 rounded-lg"
            onChange={onVariantChange}
            value={variant?.sku}
          >
            {product.variants.map((v) => (
              <option key={v.sku} value={v.sku}>
                {v.size} - ₹{v.price}
              </option>
            ))}
          </select>
        </div>
        <AddToCartButton product={product} variantSku={variant.sku} />
      </div>

      <div className="hidden md:block w-full bg-black h-[1px] mt-5 mb-5 rounded-md"></div>

      <div className="mt-5">
        <ProductDescription description={decodeHtmlEntities(product.description)} />
      </div>
    </div>
  );
}

function RemedyList({ remedies }) {
  return (
    <div className="bg-[#BECBD6] text-center flex items-center gap-5 md:p-4 p-2 justify-center rounded-xl">
      <h2 className="font-semibold text-center text-lg ">Helps With</h2>
      <ul className="list-disc flex gap-3 list-inside text-sm">
        {remedies.map((remedy, idx) => (
          <li key={idx}>{remedy}</li>
        ))}
      </ul>
    </div>
  );
}
