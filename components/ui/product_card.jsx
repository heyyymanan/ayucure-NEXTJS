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
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "expo.inOut" }
      );
    }
  }, [cartItem?.quantity]);



  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart!");
  };

  const handleIncrement = () => {
    incrementQuantity(product._id);
    toast.success("Quantity increased!");
  };

  const handleDecrement = () => {
    decrementQuantity(product._id);
    toast.success("Quantity decreased!");
  };

  return (

    <Link href={`/products/${product.variants[0].sku}`}>


      <div
        className="border rounded-2xl  shadow-md max-w-xs h-auto sm:max-w-sm md:max-w-md bg-white p-1 pb-3 sm:p-4 transition-transform hover:scale-105 hover:cursor-pointer"
      >
        <div className="relative flex justify-center w-full h-auto sm:h-64">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-lg object-contain w-[187px] h-[187px] sm:w-[250px] sm:h-[250px]"
          />
        </div>

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

          <div className="flex h-4 sm:h-auto items-center mx-1 mt-2">
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

          {product.remedy_for.length ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {product.remedy_for.map((remedy, idx) => (
                <span
                  key={idx}
                  className="text-xs sm:text-sm mx-1 text-gray-700 bg-gray-100 rounded-full px-2 py-1"
                >
                  💊 {remedy}
                </span>
              ))}
            </div>
          ) : null}
          <div className="btm flex items-center mt-2 sm:gap-3 justify-around">

            <div className="flex mx-1 items-center">
              <span className="text-2xl sm:text-3xl font-semibold text-gray-900">
                ₹{product.variants[0].price}
              </span>
            </div>

            {cartItem ? (
              <div ref={buttonRef} className="flex border-2 px-2 py-2 border-lime-500 rounded-lg  items-center justify-evenly gap-3 sm:gap-4">
                <button onClick={handleDecrement} className="text-gray-700 mx-1 hover:text-gray-900">
                  <LucideMinusCircle size={24} />
                </button>
                <span className="sm:text-lg text-base font-medium">{cartItem.quantity}</span>
                <button onClick={handleIncrement} className="text-gray-700 mx-1 hover:text-gray-900">
                  <LucidePlusCircle size={24} />
                </button>
              </div>
            ) : (
              <div className="addToCart w-full flex justify-center mt-1">

                <button
                  onClick={handleAddToCart}
                  className="px-2 py-2 sm:text-xl bg-lime-500 text-white flex items-center justify-center rounded-lg hover:bg-blue-700 transition-all"
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
      </div>
    </Link>
  );
};

export default ProductCard;