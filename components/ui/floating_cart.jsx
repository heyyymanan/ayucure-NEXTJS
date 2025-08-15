"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext"; // ✅ Make sure this path is correct

export default function FloatingCart() {
    const router = useRouter();
    const pathname = usePathname();
    const { cart, clearCart } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    // 👇 Hide FloatingCart on /checkout and /cart pages
    useEffect(() => {
        if (pathname.startsWith("/checkout") || pathname.startsWith("/products") || pathname === "/cart") {
            setIsVisible(false);
        } else {
            setIsVisible(cart.length > 0);
        }
    }, [pathname, cart]);


    const handleRemove = () => {
        clearCart();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={`parent ${isVisible ? 'flex' : 'hidden'} bg-red-900 w-screen justify-center`}>
            <div className="fixed bottom-4 z-50 bg-neutral-900 text-white flex items-center py-4 rounded-2xl shadow-xl w-[340px] justify-evenly">
                {/* Image */}
                <div className="img">
                    <img
                        src="/icons/cart.png"
                        alt="Cart"
                        className="h-7 rounded-full object-cover"
                    />
                </div>

                {/* Cart Info */}
                <div className="txt">
                    <p className="font-semibold text-white text-sm">
                        {cart.length} Item{cart.length > 1 ? "s" : ""} In Your Cart
                    </p>
                </div>

                {/* View Cart */}
                <div className="btn1">
                    <button
                        onClick={() => router.push('/cart/')}
                        className="bg-lime-500 text-black px-4 py-2 rounded-md text-sm font-semibold"
                    >
                        View Cart
                    </button>
                </div>

                {/* Close Icon */}
                <div className="btn2">
                    <button onClick={handleRemove}>
                        <X className="w-5 h-5 text-gray-300 hover:text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
