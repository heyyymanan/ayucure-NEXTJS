"use client"

import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext.jsx";
import Image from 'next/image';

const page = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating a loading state (can be removed when actual data fetching is done)
        setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
    }, []);

    let delivery;
    let savings;
    const total_of_items = getTotalPrice();
    const tax = Math.round((total_of_items / 100) * 18);
    cart.length === 0 ? (savings = 0.00, delivery = 0.00) : (savings = 10, delivery = 100.00);

    // Skeleton Loader component
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
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto mt-10 max-w-screen-xl px-4 2xl:px-0">
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
                                    <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div className="space-y-5 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <a href="#" className="w-20 shrink-0 md:order-1">
                                                <Image src={item.images[0]} alt={item.name} width={250} height={250} objectFit="contain" className="size-250" />
                                            </a>
                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-base">Choose quantity :</p>
                                                        <button onClick={() => decrementQuantity(item._id)} className="p-2 border">-</button>
                                                        <span className="mx-2">{item.quantity}</span>
                                                        <button onClick={() => incrementQuantity(item._id)} className="p-2 border">+</button>
                                                    </div>
                                                </div>
                                                <div className="text-end md:order-4 md:w-32 mr-0">
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {"₹" + item.variants[0].price * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href="#" className="text-xl font-semibold uppercase text-gray-900 hover:underline dark:text-white">
                                                    {item.name + " - " + item.variants[0].size}
                                                </a>
                                                <div className="gap-4">
                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        type="button"
                                                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                    >
                                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total price</dt>
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
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            {"18% GST - ₹ " + tax}
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
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
                                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
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

export default page;
