"use client";

import { useState, useEffect, use } from "react";
import { LucideMinusCircle, LucidePlusCircle, Star } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons/index";

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
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = product ? cart.find((item) => item._id === product._id) : null;

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

  const handleAddToCart = () => {
    addToCart({ ...product, variant: selectedVariant });
  };

  const handleIncrement = () => {
    incrementQuantity(product._id);
  };

  const handleDecrement = () => {
    decrementQuantity(product._id);
  };

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

  if (!product || !selectedVariant) {
    return <SkeletonLoader />;
  }

  return (
    <div className="relative">
      <section className="flex flex-col md:flex-row gap-8 p-6 md:px-24 md:py-12">
        <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-6">

          {/* Thumbnails for larger screens */}

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
          <div className="hidden md:flex flex-1 justify-center items-start">
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
          <ProductInfo product={product} variant={selectedVariant} onVariantChange={handleVariantChange} />
          
        </div>
      </section>

      {/* Mobile Cart Buttons */}
      <div className="md:hidden justify-evenly flex items-center fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">

      <div className="">
        
        <select
          id="variant-selector"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={handleVariantChange}
          value={selectedVariant.sku}
        >
          {
          product.variants.map((v) => (
            <option key={v.sku} value={v.sku}>
              {v.size} - ₹{v.price}
            </option>
          ))}
        </select>
      </div>

        {cartItem ? (
          <div className="flex border-2 px-5 py-2 h-10 border-lime-500 rounded-lg items-center justify-evenly gap-3 sm:gap-4">
            <button onClick={handleDecrement} className="text-gray-700 mx-1 hover:text-gray-900">
              <LucideMinusCircle size={24} />
            </button>
            <span className="sm:text-lg text-base font-medium">{cartItem.quantity}</span>
            <button onClick={handleIncrement} className="text-gray-700 mx-1 hover:text-gray-900">
              <LucidePlusCircle size={24} />
            </button>
          </div>
        ) : (
          <div className="addToCart flex justify-center mt-1">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 text-xl font-serif sm:text-xl bg-lime-500 text-white flex items-center justify-center rounded-lg hover:bg-blue-700 transition-all"
            >
              <HugeiconsIcon
                icon={PlusSignCircleFreeIcons}
                size={20}
                className="mr-2 hidden sm:block"
                color="currentColor"
                strokeWidth={1}
              />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
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
      <div className="flex gap-5 mb-5">
        <p className="text-orange-600 font-semibold text-2xl mt-1">₹ {variant.price}</p>
        <div className="flex items-center gap-2 mt-1">
          <Star className="text-yellow-400 fill-yellow-400" size={18} />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({product.reviews.length} reviews)</span>
        </div>
      </div>

      <RemedyList remedies={product.remedy_for.map((i)=>(
        <span>{i}</span>
      ))} />

      <div className="w-full bg-black h-[1px] mt-5 mb-5 rounded-md"></div>


      {/* Variant Size Selector */}
      <div className="hidden md:block w-fit mb-5">
        <label htmlFor="variant-selector" className="block w-fit mb-2 font-medium text-gray-700">
          Select Size:
        </label>
        <select
          id="variant-selector"
          className="w-full p-2 px-3 border border-gray-300 rounded-lg"
          onChange={onVariantChange}
          value={variant.sku}
        >
          {product.variants.map((v) => (
            <option key={v.sku} value={v.sku}>
              {v.size} - ₹{v.price}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mt-5">
        <ProductDescription description={decodeHtmlEntities(product.description)} />
      </div>
    </div>
  );

  function RemedyList({ remedies }) {
    return (
      <div className="bg-[#BECBD6] text-center flex items-center gap-5 md:p-4 p-2 justify-center  rounded-xl">
        <h2 className="font-semibold text-center text-lg ">Helps With</h2>
        <ul className="list-disc flex gap-3 list-inside text-sm">
          {remedies.map((remedy, idx) => (
            <li key={idx}>{remedy}</li>
          ))}
        </ul>
      </div>
    );
  }
}
