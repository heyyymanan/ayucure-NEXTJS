"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext.jsx";
import Image from 'next/image';

const CartPage = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
    const [isLoading, setIsLoading] = useState(true); // Default loading state set to true

    useEffect(() => {
        // Simulating loading state (you can replace this with real data fetching logic)
        setTimeout(() => setIsLoading(false), 100); // Simulate loading delay
    }, []);

    let delivery = 0.00;
    let savings = 0.00;
    const total_of_items = getTotalPrice();
    const tax = Math.round((total_of_items / 100) * 12);

    if (cart.length > 0) {
        savings = 10;  // Applying a 10% savings as an example
        delivery = 100.00;  // Flat delivery charge
    }

    // Skeleton Loader component for displaying during loading state
    const SkeletonLoader = () => (
        <div className="animate-pulse space-y-10">
            <div className="flex space-x-4">
                <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 pt-0">
            <div className="mx-auto mt-5 max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Shopping Cart
                </h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl md:justify-center">
                        <div className="space-y-5">
                            {/* Skeleton Loader for cart items */}
                            {isLoading ? (
                                <SkeletonLoader />
                            ) : cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.variantSku} className="rounded-lg border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-800 md:p-6">

                                        <div class="div flex md:flex-col justify-start">

                                            <div className="flex order-2 items-start md:w-full justify-end">
                                                <button
                                                    onClick={() => removeFromCart(item.variantSku)}
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                >
                                                    <svg className="me-1.5 h-5 w-4 md:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="md:order-2 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

                                                <div class="div flex items-center gap-5">

                                                    <a href={`/products/${item.variantSku}`} className="w-20 shrink-0 md:order-1">
                                                        <Image src={item.image} alt={item.name} width={250} height={250} objectFit="contain" className="size-20" />
                                                    </a>
                                                    <div className="w-full min-w-0 flex-1 space-y-4 sm:order-2 md:max-w-md">
                                                        <a href={`/products/${item.variantSku}`} className="text-xl font-semibold uppercase text-gray-900 hover:underline dark:text-white">
                                                            {item.name + " - " + item.size}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                            <div className="flex items-center justify-between sm:justify-between md:order-3 md:justify-end">
                                                <div className="flex order-2 sm:order-1 items-center gap-3">
                                                    <p className="text-base hidden sm:block">Choose quantity :</p>
                                                    <button onClick={() => decrementQuantity(item.variantSku)} className="p-2 text-base font-bold border">➖</button>
                                                    <span className="mx-2 text-lg">{item.quantity}</span>
                                                    <button onClick={() => incrementQuantity(item.variantSku)} className="p-2 text-base font-bold border">➕</button>
                                                </div>
                                                <div className="text-end order-1 sm:order-2 md:order-4 md:w-32 mr-0">
                                                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                                        {"₹ " + item.price * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total Price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            ₹ {total_of_items}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-600">- {savings} %</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charges</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            {"₹ " + delivery}
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total (Inclusive Tax)</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                                        {"₹ " + Math.floor((delivery + tax + total_of_items) - (((delivery + tax + total_of_items) / 100) * savings))}
                                    </dd>
                                </dl>
                            </div>
                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-lime-500 p-2 text-lg font-semibold">
                                Proceed to Checkout
                            </a>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
                                <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
