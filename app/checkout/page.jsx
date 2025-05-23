"use client";
import CartList from "@/components/ui/cart_list";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
    const { getTotalPrice } = useCart();
    const total_of_items = getTotalPrice();
    const savings = 10;

    const [deliveryCharge] = useState(100);
    const [codCharge, setCodCharge] = useState(0);

    const [formData, setFormData] = useState({
        contact: {
            email: "",
        },
        delivery: {
            firstName: "",
            lastName: "",
            fullAddress: "",
            landmark: "",
            city: "",
            state: "",
            pinCode: "",
            phone: "",
        },
        preferences: {
            saveAddress: false,
            paymentMethod: "prepaid", // or 'cod'
        }
    });

    useEffect(() => {
        if (formData.preferences.paymentMethod === "cod") {
            setCodCharge(99);
        } else {
            setCodCharge(0);
        }
    }, [formData.preferences.paymentMethod]);

    const handleInputChange = (section, field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: e.target.value
            }
        }));
    };

    const handleCheckboxChange = (section, field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: e.target.checked
            }
        }));
    };

    const handlePaymentChange = (method) => {
        setFormData((prev) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                paymentMethod: method
            }
        }));
    };

    const redirectToPaymentPage = () => {
        if (formData.preferences.saveAddress) {
            localStorage.setItem("userAddress", JSON.stringify(formData.delivery));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row p-4 gap-6 max-w-7xl mx-auto font-sans">
            {/* Left section */}
            <div className="flex-1 space-y-6">
                {/* Contact */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Contact</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.contact.email}
                        onChange={handleInputChange("contact", "email")}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Delivery */}
                <div className="space-y-2">
                    <h2 className="font-semibold text-lg mb-2">Delivery</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="First name"
                            value={formData.delivery.firstName}
                            onChange={handleInputChange("delivery", "firstName")}
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            value={formData.delivery.lastName}
                            onChange={handleInputChange("delivery", "lastName")}
                            className="border p-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Full Address"
                        value={formData.delivery.fullAddress}
                        onChange={handleInputChange("delivery", "fullAddress")}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={formData.delivery.landmark}
                        onChange={handleInputChange("delivery", "landmark")}
                        className="w-full border p-2 rounded"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <input
                            type="text"
                            placeholder="City"
                            value={formData.delivery.city}
                            onChange={handleInputChange("delivery", "city")}
                            className="border p-2 rounded"
                        />
                        <select
                            value={formData.delivery.state}
                            onChange={handleInputChange("delivery", "state")}
                            className="border p-2 rounded"
                        >
                            <option value="">State</option>
                            <option value="Rajasthan">Rajasthan</option>
                        </select>
                        <input
                            type="text"
                            placeholder="PIN Code"
                            value={formData.delivery.pinCode}
                            onChange={handleInputChange("delivery", "pinCode")}
                            className="border p-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={formData.delivery.phone}
                        onChange={handleInputChange("delivery", "phone")}
                        className="w-full border p-2 rounded"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            defaultChecked={formData.preferences.saveAddress}
                            onChange={handleCheckboxChange("preferences", "saveAddress")}
                        />
                        Save this information for next time
                    </label>
                </div>

                {/* Payment Options */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Prepaid or COD</h2>
                    <div className="space-y-2">
                        <label className="flex items-center justify-between border rounded p-2 cursor-pointer">
                            <div>
                                <input
                                    type="radio"
                                    onClick={() => handlePaymentChange("prepaid")}
                                    name="payment"
                                    defaultChecked={formData.preferences.paymentMethod === "prepaid"}
                                    className="mr-2"
                                />
                                Prepaid <span className="text-xs text-green-600 ml-2"> Priority Shipping</span>
                            </div>
                            <span className="font-bold">FREE</span>
                        </label>
                        <label className="flex items-center justify-between border rounded p-2 cursor-pointer">
                            <div>
                                <input
                                    type="radio"
                                    onClick={() => handlePaymentChange("cod")}
                                    name="payment"
                                    defaultChecked={formData.preferences.paymentMethod === "cod"}
                                    className="mr-2"
                                />
                                COD: <span className="text-xs text-yellow-600 ml-2">Pay Online & Save Rs. 99</span>
                            </div>
                            <span className="font-bold">₹ 99.00</span>
                        </label>
                    </div>
                </div>

                {/* Payment Method Description */}
                {formData.preferences.paymentMethod === "prepaid" ? (
                    <div className="border rounded p-4">
                        <h2 className="font-semibold mb-2">Online Payment :</h2>
                        <p className="text-sm mb-2 text-gray-600">
                            All Transactions Are Secure And Encrypted.
                        </p>
                    </div>
                ) : (
                    <div className="border rounded p-4">
                        <h2 className="font-semibold mb-2">Cash On Delivery :</h2>
                        <p className="text-sm mb-2 text-gray-600">
                            Pay Online To Save COD Charges.
                        </p>
                    </div>
                )}
            </div>

            {/* Right section: Summary */}
            <div className="w-full lg:w-1/3 border rounded p-4 space-y-4 bg-gray-50">
                <CartList />

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <p className="text-xl font-semibold text-gray-900">Order Summary</p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Total Price</dt>
                                    <dd className="text-base font-medium text-gray-900">₹ {total_of_items}</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                                    <dd className="text-base font-medium text-green-600">- {savings} %</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Delivery Charges</dt>
                                    <dd className="text-base font-medium text-gray-900">
                                        ₹ {deliveryCharge}
                                        {codCharge ? " + " + codCharge : null}
                                    </dd>
                                </dl>
                            </div>
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                <dt className="text-base font-bold text-gray-900">Total (Inclusive Tax)</dt>
                                <dd className="text-base font-bold text-gray-900">
                                    ₹{" "}
                                    {Math.floor(
                                        deliveryCharge +
                                        total_of_items +
                                        codCharge -
                                        ((deliveryCharge + total_of_items) / 100) * savings
                                    )}
                                </dd>
                            </dl>
                        </div>
                        <button
                            onClick={redirectToPaymentPage}
                            className="flex w-full items-center justify-center rounded-lg bg-lime-500 p-2 text-lg font-semibold"
                        >
                            {formData.preferences.paymentMethod === "prepaid" ? "Pay Now" : "Complete Order"}
                        </button>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-normal text-gray-500">or</span>
                            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                                Continue Shopping
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
