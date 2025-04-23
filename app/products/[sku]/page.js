"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use } from "react";

// Helper function to decode HTML entities
function decodeHtmlEntities(str) {
  if (typeof window === "undefined") return str; // Safety for server
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

async function getProductBySKU(sku) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/products/${sku}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductBySKU(unwrappedParams.sku);
        setProduct(productData);
        const foundVariant = productData.variants.find(v => v.sku === unwrappedParams.sku);
        setSelectedVariant(foundVariant);
      } catch (error) {
        console.error("Error fetching product:", error);
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

  if (!product || !selectedVariant) {
    return <SkeletonLoader />;
  }

  return (
    <section className="flex flex-col md:flex-row gap-8 p-6 md:px-24 md:py-12">
      {/* Product Images */}
      <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-6">
        {/* Desktop Thumbnails */}
        <div className="hidden md:flex flex-col gap-4">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-20 h-20 rounded-lg border object-cover cursor-pointer ${currentIndex === idx ? "border-orange-500" : "border-gray-300"}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        {/* Main Image Desktop */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img src={product.images[currentIndex]} alt="Main Product" className="rounded-2xl object-contain max-h-[26rem] border" />
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden w-full relative">
          <div className="relative overflow-hidden rounded-2xl w-full h-72 border flex items-center justify-center">
            <img
              src={product.images[currentIndex]}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${currentIndex === idx ? "bg-orange-500" : "bg-gray-300"}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6 w-full md:w-1/3">
        <ProductInfo product={product} variant={selectedVariant} />
        <RemedyList remedies={product.remedy_for} />
        <AddToCartButton />
      </div>
    </section>
  );
}

function ProductInfo({ product, variant }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-1">By {product.company}</p>
      <p className="text-orange-600 font-semibold text-lg">₹{variant.price}</p>
      <div className="flex items-center gap-2 mt-1">
        <Star className="text-yellow-400 fill-yellow-400" size={18} />
        <span className="font-medium">{product.rating.toFixed(1)}</span>
        <span className="text-gray-500 text-sm">({product.reviews.length} reviews)</span>
      </div>
      {/* Decode and render the description */}
      <ProductDescription description={decodeHtmlEntities(product.description)} />
    </div>
  );
}

function RemedyList({ remedies }) {
  return (
    <div className="bg-blue-50 p-4 rounded-xl">
      <h2 className="font-semibold text-lg mb-2">Helps With</h2>
      <ul className="list-disc list-inside text-sm">
        {remedies.map((remedy, idx) => (
          <li key={idx}>{remedy}</li>
        ))}
      </ul>
    </div>
  );
}

function AddToCartButton() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-2 rounded-full">
        Add To Cart
      </Button>
    </div>
  );
}
