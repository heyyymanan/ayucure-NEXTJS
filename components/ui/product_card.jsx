import Image from "next/image";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import { LucidePlusCircle, LucideMinusCircle } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons/index";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import AddToCartButton from "./addToCartBtn";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => {

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const buttonRef = useRef(null);

  const { cart } = useCart();
  const cartItem = cart.find((item) => item.variantSku === product.variants[0].sku);
  

  useEffect(() => {
    if (buttonRef.current && cartItem?.quantity) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "expo.inOut" }
      );
    }
  }, [cartItem?.quantity]);

  const [Isphone, setIsphone] = useState(true);
  useEffect(() => {
      const handleResize = () => {
        const Isphone = window.innerWidth > 768 ? false : true;
        setIsphone(Isphone);
      };
  
      handleResize(); // set size on mount
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (

    


      <div
        className="border rounded-2xl  shadow-md max-w-xs h-auto sm:max-w-sm md:max-w-md bg-white p-1 pb-3 sm:p-4 transition-transform hover:scale-105 "
      >
        <Link href={`/products/${product.variants[0].sku}`}>
        <div className="relative flex justify-center w-full h-auto sm:h-64 hover:cursor-pointer">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-lg object-contain w-[187px] h-[187px] sm:w-[250px] sm:h-[250px]"
            />
        </div>
            </Link>

        <div className="mt-1 sm:space-y-4">
          <div className="flex  justify-between items-center">
            {product.variants[0].discount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                {product.variants[0].discount}% OFF
              </span>
            )}
            <span className="bg-slate-200 text-black sm:text-xs text-[10px] font-semibold px-2 py-1 ml-1  rounded-full">
              {product.variants[0].size}
            </span>
          </div>

          <h3 className="mt-1 text-base ml-1 sm:text-xl font-bold text-gray-900">{product.name}</h3>

          <div className="hidden md:flex h-4 sm:h-auto items-center mx-1 mt-2">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} className="text-yellow-500 w-5 h-5" />
            ))}
            {hasHalfStar && <StarHalf className="text-yellow-500 w-5 h-5" />}
            {[...Array(emptyStars)].map((_, i) => (
              <StarOutline key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
            ))}
            <span className="text-gray-600 text-xs sm:text-sm ml-2">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>

          {product.remedy_for.length>2 ? (
            <div className="flex flex-row gap-2 mt-3">
              
                <span
                  className="text-[10px] sm:text-sm mx-1 text-gray-700 bg-gray-100 rounded-full px-2 py-1"
                >
                  💊 {product.remedy_for[0]}
                </span>
                <span
                  className="text-[10px] sm:text-sm mx-1 text-gray-700 bg-gray-100 rounded-full px-2 py-1"
                >
                  💊...& More
                </span>

              
            </div>
          ) 
          : 
          <div className="flex flex-row gap-2 mt-3">
          {product.remedy_for.map((remedy, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-sm mx-1 text-gray-700 bg-gray-100 rounded-full px-2 py-1"
            >
              💊 {remedy}
            </span>
          ))}
        </div>}
          <div className="btm flex  gap-2  items-center mt-2 sm:gap-3 justify-around">

            <div className={`flex mx-1 gap-1 md:gap-4 ${Isphone?'flex-col':''} items-center`}>

              <span className={`sm:text-3xl ${Isphone?'text-[27px]':''} font-semibold text-gray-900`}>
                ₹{product.variants[0].price}
              </span>

            {/* cart here */}
            <div className="div h-auto w-fit">

            <AddToCartButton ref={buttonRef} product={product} variantSku={product.variants[0].sku} />
            </div>
            </div>

          </div>
        </div>
      </div>
    
  );
};

export default ProductCard;