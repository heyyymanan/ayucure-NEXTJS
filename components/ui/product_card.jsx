import Image from "next/image";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useRef } from "react";
import { LucidePlusCircle, LucideMinusCircle } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons/index";


gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cart.find((item) => item._id === product._id);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const buttonRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && cartItem?.quantity) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [cartItem?.quantity]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [product]);

  return (
    <div ref={cardRef} className="border rounded-lg shadow-md max-w-xs sm:max-w-md md:max-w-md md:align-i bg-white border-black p-3 sm:p-4">
      <div className="relative flex justify-center  h-auto sm:h-48">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="blocks flex gap-1 sm:gap-2 mb-2 sm:mb-3">

      {product.variants[0].discount!=0?

        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 rounded-full inline-block mt-1 sm:mt-2">
          {product.variants[0].discount}% OFF
        </span>

        : <></>
        }
        <span className="bg-slate-300 text-black text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full inline-block mt-1 sm:mt-2">
          {product.variants[0].size}
        </span>
      </div>

      <p className="text-lg sm:text-2xl text-wrap font-bold">{product.name}</p>

      <div className="2ndpart">

        <div className="flex items-center mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="text-yellow-500 w-4 sm:w-5 h-4" fill="currentColor" />
          ))}
          {hasHalfStar && <StarHalf className="text-yellow-500 w-4 sm:w-5 h-4" fill="currentColor" />}
          {[...Array(emptyStars)].map((_, i) => (
            <StarOutline key={i} className="text-gray-300 w-4 sm:w-5 h-4" strokeWidth={1.5} />
          ))}
          <span className="text-gray-600 text-xs sm:text-sm ml-2">{product.rating} ({product.reviews.length})</span>
        </div>

        {product.remedy_for.length > 1 ?

          product.remedy_for.map((remedy, index) => (
            <div key={index} className="flex items-center text-xs sm:text-sm  text-black mt-1">
              <span className="mr-2 px-2 sm:mr-4">💊 {remedy} 💊</span>
            </div>
          ))
          :
          <div  className="flex flex-col text-xs sm:text-base font-serif text-black mt-2">
            <span className="ml-0 sm:mr-4">💊 Usefull In &nbsp;:&nbsp; {product.remedy_for[0]}</span>
          </div>

        }

        <div className="priceAndBuyNow mb-0">

          <div className="flex gap-5 sm:gap-5 text-center items-center mt-3 sm:mt-5">
            <span className="text-2xl sm:text-3xl text-center font-bold">₹{product.variants[0].price}</span>


            {cartItem ? (

              <div ref={buttonRef} className="flex items-center mt-2 border-2 rounded-lg p-1">
                <button onClick={() => decrementQuantity(product._id)} className="">
                  <LucideMinusCircle />
                </button>
                <span className="mx-2">{cartItem.quantity}</span>
                <button onClick={() => { incrementQuantity(product._id); toast.success("Product Added To Cart!"); }} className="">
                  <LucidePlusCircle />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { addToCart(product); toast.success("Product Added To Cart!"); }}
                className="p-1  bg-blue-500 text-white mt-2 rounded-md"
              >
                <HugeiconsIcon
                  className="md:hidden m-[1px]"
                  icon={PlusSignCircleFreeIcons}
                  size={20}
                  color="currentColor"
                  strokeWidth={1}
                />
                <span className="hidden md:flex p-1">Add To Cart</span>
              </button>
            )}
          </div>

          <Link href="/shop">
            <div className="buy-now h-10 bg-lime-500 rounded-lg flex justify-center items-center mt-4 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <button className="text-white text-base sm:text-lg font-serif">Buy Now</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
