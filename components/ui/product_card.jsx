import Image from "next/image";
import { ShoppingBag, ShoppingBagIcon, Star, StarHalf, Star as StarOutline } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useRef } from "react";
import { LucidePlusCircle, LucideMinusCircle } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";


gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  const fullStars = Math.floor(product.p_rating);
  const hasHalfStar = product.p_rating % 1 !== 0;
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
    <div ref={cardRef} className="border rounded-lg shadow-md max-w-xs sm:max-w-md md:max-w-md md:align-i bg-white border-black p-3  sm:p-4">
      <div className="relative flex justify-center  h-36 sm:h-48">
        <Image 
          src={product.p_img} 
          alt={product.p_name} 
          width={200}
          height={200}
          style={{ objectFit: "contain" }} 
        />
      </div>
      
      <div className="blocks flex gap-1 sm:gap-2 mb-2 sm:mb-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 rounded-full inline-block mt-1 sm:mt-2">
          {product.discount}
        </span>
        <span className="bg-slate-300 text-black text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full inline-block mt-1 sm:mt-2">
          {product.qty}
        </span>
      </div>

      <p className="text-lg sm:text-2xl text-wrap font-bold">{product.p_name}</p>

      <div className="flex items-center mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="text-yellow-500 w-4 sm:w-5 h-4" fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-500 w-4 sm:w-5 h-4" fill="currentColor" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={i} className="text-gray-300 w-4 sm:w-5 h-4" strokeWidth={1.5} />
        ))}
        <span className="text-gray-600 text-xs sm:text-sm ml-2">{product.p_rating} ({product.reviews})</span>
      </div>

      <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
        <span className="mr-2 sm:mr-4">🚚 {product.delivery}</span>
        <span>💰 {product.priceTag}</span>
      </div>

      <div className="flex gap-5 sm:gap-5 text-center items-center mt-3 sm:mt-5">
        <span className="text-2xl sm:text-3xl text-center font-bold">₹{product.p_price}</span>
        {cartItem ? (
          <div ref={buttonRef} className="flex items-center mt-2 border-2 rounded-lg p-1">
            <button onClick={() => decrementQuantity(product.id)} className="">
              <LucideMinusCircle />
            </button>
            <span className="mx-2">{cartItem.quantity}</span>
            <button onClick={() => { incrementQuantity(product.id); toast.success("Product Added To Cart!"); }} className="">
              <LucidePlusCircle />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => { addToCart(product); toast.success("Product Added To Cart!"); }} 
            className="p-1  bg-blue-500 text-white mt-2 rounded-md"
          >
            <ShoppingBagIcon size={20}/>
          </button>
        )}
      </div>

      <Link href="/shop">
        <div className="buy-now h-10 bg-lime-500 rounded-lg flex justify-center items-center mt-4 transition-transform duration-200 hover:scale-105 cursor-pointer">
          <button className="text-white text-base sm:text-lg font-serif">Buy Now</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
