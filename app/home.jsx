"use client";

import Hero from "@/components/hero.jsx";
import Category from "@/components/category.jsx";
import ProductCard from "@/components/ui/product_card.jsx";
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "@/lib/api/products.js";
import { Fire } from "@/components/ui/fire";




export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [healthyProducts, setHealthyProducts] = useState([]);
  const [sexualWellness, setSexualWellness] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  const [womenSpecial, setwomenSpecial] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const trending = await fetchProducts({ tag: "trending", limit: 5 });
        const healthy = await fetchProducts({ tag: "healthy", limit: 5 });
        const sexual = await fetchProducts({ tag: "sexual-wellness", limit: 5 });
        const women = await fetchProducts({ tag: "women", limit: 5 });
        const skin = await fetchProducts({ tag: "skin-care", limit: 5 });

        setTrendingProducts(trending);
        setHealthyProducts(healthy);
        setSexualWellness(sexual);
        setSkinCare(skin);
        setwomenSpecial(women);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }

    loadProducts();
  }, []);

  const ProductSection = ({ title, products }) => (
    <>
      <h1 className="text-center text-white lg:text-5xl text-3xl mt-5 lg:mt-10 font-serif">
        {title}
      </h1>
      <div className="flex overflow-x-auto whitespace-nowrap gap-x-5 gap-y-5 p-4 md:p-10 justify-evenly">
        {products.length === 0 ? (
          <div className="text-gray-500 text-lg italic">
            No products found in this category.
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );

  return (
    <div className="bg-gradient-to-t from-slate-100 to-[#222831]">
      <Hero sectionRef={sectionRef} />
      <hr className="border-t border-gray-500" />
      <Category />
      <hr className="border-t border-gray-400" />

      
      <div className="flex items-center justify-center mt-5">
        <Fire />
        <h1
          ref={sectionRef}
          className="lg:text-5xl text-3xl mt-1 mx-3 text-white md:mt-4 md:mx-10 font-serif"
        >
          Trending Products
        </h1>
        <Fire />
      </div>
      
      <div className="flex overflow-x-auto whitespace-nowrap gap-x-5 gap-y-5 p-4 md:p-10 justify-evenly">
        {trendingProducts.length === 0 ? (
          <div className="text-white italic text-lg">No trending products available.</div>
        ) : (
          trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      
      <ProductSection title="Womens Special" products={womenSpecial} />
      <ProductSection title="Sexual Wellness" products={sexualWellness} />
      <ProductSection title="Skin Care" products={skinCare} />
      <ProductSection title="Want A Healthy Life?" products={healthyProducts} />
    </div>
  );
}
