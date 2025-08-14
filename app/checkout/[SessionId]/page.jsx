"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import CartList from "@/components/ui/cart_list";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button";
import CheckoutForm from "@/components/deliveryForm";
import { useRouter } from "next/navigation";
import OTPOnClick from "@/lib/utils/MSG91";

/* ------------------- Form Validation ------------------- */
const FormCheck = (formData, cart, deliverySetSuccess) => {
    if (!formData || !cart) return false;
    const {
        delivery: { firstName, lastName, fullAddress, city, state, pincode, phone },
        preferences: { paymentMethod },
    } = formData;

    return (
        firstName?.trim() &&
        lastName?.trim() &&
        fullAddress?.trim()?.length > 9 &&
        city?.trim() &&
        state?.trim() &&
        pincode?.trim()?.length === 6 &&
        phone?.trim()?.length >= 10 &&
        ["Online", "COD"].includes(paymentMethod) &&
        deliverySetSuccess &&
        cart.length > 0
    );
};

/* ------------------- Courier Selection Helper ------------------- */
function getCustomBestCourier(couriers) {
    if (!Array.isArray(couriers) || couriers.length === 0) return { totalPrice: 0 };
    const filtered = couriers.filter(
        (c) => (c?.deliveryDate?.dateDifference ?? 999) <= 4
    );
    return (filtered.length ? filtered : couriers).sort((a, b) => a.totalPrice - b.totalPrice)[0];
}

export default function CheckoutPage() {
    const router = useRouter();


    const { cart, getTotalPrice } = useCart();

    const [mounted, setMounted] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [formData, setFormData] = useState({
        contact: { email: "" },
        delivery: {
            firstName: "",
            lastName: "",
            fullAddress: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            country: "India",
        },
        preferences: { saveAddress: false, paymentMethod: " " },
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [OnlineAvailable, setOnlineAvailable] = useState(true);
    const [deliveryCharge, setDeliveryCharge] = useState(null);
    const [loadingDelivery, setLoadingDelivery] = useState(false);
    const [DeliverySetSuccess, setDeliverySetSuccess] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({ addresses: [] });
    const [showAddAddressUI, setShowAddAddressUI] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [localCart, setLocalCart] = useState([]);


    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    /* ------------------- Ensure client-only rendering ------------------- */
    useEffect(() => {
        setMounted(true);
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setLocalCart(storedCart);
        } catch {
            setLocalCart([]);
        }
    }, []);

    /* ------------------- Derived Totals ------------------- */
    const itemTotal = useMemo(() => getTotalPrice(), [cart, getTotalPrice]);
    const savings = useMemo(() => (cart.length ? 10 : 0), [cart]);
    const orderTotal = useMemo(
        () => itemTotal - (itemTotal / 100) * savings + (deliveryCharge || 0),
        [itemTotal, savings, deliveryCharge]
    );

    /* ------------------- Fetch User ------------------- */
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isOnboarded = localStorage.getItem("isOnboarded");
        const isLoggedin = localStorage.getItem("isLoggedin");
        if (!(isLoggedin || isOnboarded)) return;

        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
                    withCredentials: true,
                });
                const uData = res.data || {};
                setUserData({ ...uData, addresses: uData.addresses || [] });
                setFormData((prev) => ({
                    ...prev,
                    contact: { email: uData.email || "" },
                    delivery: {
                        ...prev.delivery,
                        firstName: uData.first_name || "",
                        lastName: uData.last_name || "",
                        phone: uData.phone_number?.startsWith("91")
                            ? uData.phone_number.slice(2)
                            : uData.phone_number || "",
                    },
                }));
            } catch (err) {
                console.error("Profile load error:", err.message);
            }
        };
        fetchUserInfo();
    }, []);

    /* ------------------- Save Address if checked ------------------- */
    useEffect(() => {
        if (formData.preferences.saveAddress && mounted) {
            const dataToStore = {
                ...formData,
                preferences: { ...formData.preferences, paymentMethod: "" },
            };
            localStorage.setItem("userAddr", JSON.stringify(dataToStore));
        }
    }, [formData, mounted]);

    /* ------------------- Validate Form ------------------- */
    useEffect(() => {
        setIsFormValid(FormCheck(formData, cart, DeliverySetSuccess));
    }, [formData, cart, DeliverySetSuccess]);

    /* ------------------- Calculate Package Weight ------------------- */
    const getTotalPackageWeight = useCallback(
        (cartItems) =>
            Array.isArray(cartItems)
                ? cartItems.reduce(
                    (total, item) =>
                        total + (parseFloat(item.weight || 0) * Number(item.quantity || 1)),
                    0
                )
                : 0,
        []
    );

    /* ------------------- Pincode / Courier API ------------------- */
    useEffect(() => {
        if (!mounted) return;
        let isMounted = true;
        const { pincode, phone } = formData.delivery;
        if (pincode.length !== 6 || !cart.length) return;

        (async () => {
            try {
                setLoadingDelivery(true);

                const resPin = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
                if (resPin.data[0]?.Status === "Success") {
                    setDeliverySetSuccess(true);
                    if (!isMounted) return;
                    setFormData((prev) => ({
                        ...prev,
                        delivery: {
                            ...prev.delivery,
                            city: resPin.data[0].PostOffice[0]?.District || "",
                            state: resPin.data[0].PostOffice[0]?.State || "",
                        },
                    }));
                } else throw new Error("Invalid Pincode");

                const orderInfo = {
                    customer_details: {
                        firstname: formData.delivery.firstName,
                        lastname: formData.delivery.lastName,
                        customer_email: formData.contact.email,
                        customer_phone: phone,
                    },
                    shippingInfo: {
                        address: formData.delivery.fullAddress,
                        city: formData.delivery.city,
                        state: formData.delivery.state,
                    },
                    orderItems: cart,
                    order_amount: orderTotal,
                };

                const resCourier = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/general/list-available-couriers`,
                    {
                        pickup_postcode: "313001",
                        delivery_postcode: pincode,
                        cod: formData.preferences.paymentMethod === "COD" ? 1 : 0,
                        weight: getTotalPackageWeight(cart),
                        orderInfo,
                    }
                );

                const bestCourier = getCustomBestCourier(resCourier.data?.data || []);
                if (isMounted) setDeliveryCharge(bestCourier?.totalPrice || 0);
            } catch (err) {
                console.error("Delivery calc error:", err.message);
                setDeliverySetSuccess(false);
            } finally {
                if (isMounted) setLoadingDelivery(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [formData.delivery.pincode, formData.preferences.paymentMethod, cart, orderTotal, getTotalPackageWeight, mounted]);

    /* ------------------- Handlers ------------------- */
    const handleInputChange = useCallback(
        (section, field) => (e) => {
            setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [field]: e.target.value },
            }));
        },
        []
    );

    const handleCheckboxChange = useCallback(
        (section, field) => (e) => {
            setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [field]: e.target.checked },
            }));
        },
        []
    );

    const handlePaymentChange = useCallback((method) => {
        setFormData((prev) => ({
            ...prev,
            preferences: { ...prev.preferences, paymentMethod: method },
        }));
    }, []);

    const handleAddressSelect = useCallback((address, index) => {
        setSelectedAddressIndex(index);
        setShowAddAddressUI(false);
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, email: address.email || "" },
            delivery: {
                ...prev.delivery,
                ...address,
                phone: address.phone?.startsWith("91")
                    ? address.phone.slice(2)
                    : address.phone || "",
                country: address.country || "India",
            },
        }));
        setDeliverySetSuccess(true);
    }, []);

    /* ------------------- Create Order ------------------- */
    const transformToOrderDetails = useCallback(
        () => ({
            customer_details: {
                customer_email: formData.contact.email,
                customer_phone: formData.delivery.phone,
                firstname: formData.delivery.firstName,
                lastname: formData.delivery.lastName,
            },
            shippingInfo: { ...formData.delivery, email: formData.contact.email },
            orderItems: cart,
            paymentMethod: formData.preferences.paymentMethod,
            order_amount: orderTotal.toFixed(2),
            order_weight: getTotalPackageWeight(cart),
        }),
        [formData, cart, orderTotal, getTotalPackageWeight]
    );

    const placeOrder = async (orderDetailsObj) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/create-order`,
                { order_details: JSON.stringify(orderDetailsObj) },
                { withCredentials: true }
            );
            if (data?.success) {
                data?.order.paymentMethod === "Online"
                    ? router.push(data.phonepe_checkout_url)
                    : router.push(`/order-success?orderId=${data?.order.orderId}`);
            } else alert("An error occurred during order creation.");
        } catch (error) {
            alert("Failed to place order: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const CreateOrder = async (e) => {
        e.preventDefault();
        const combinedData = { ...formData };
        if (mounted) {
            localStorage.setItem("initUser", JSON.stringify(combinedData));
        }

        if (!localStorage.getItem("isLoggedin")) {
            setShowLoginPopup(true);
        } else {
            await placeOrder(transformToOrderDetails());
        }
    };

    if (!mounted) return null; // Prevent hydration issues

    // 🛑 If both cart and localCart are empty → show empty cart UI
    if ((!cart || cart.length === 0) && (!localCart || localCart.length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 font-sans">
                <img src="/icons/empty-cart.png" alt="Empty Cart" className="w-40 h-40 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven’t added anything yet.</p>
                <Link href="/">
                    <Button className="bg-green-600 text-white px-6 py-2 rounded">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    const closeModal = () => setShowLoginPopup(false);

    return (
        <div className="flex flex-col lg:flex-row p-4 gap-6 max-w-7xl mx-auto font-sans">
            {/* Left: Addresses & Add New */}
            <div className="w-full lg:w-2/3">
                {userData.addresses && userData.addresses.length > 0 && !showAddAddressUI ? (
                    <div className="saved-addresses">
                        <h2 className="text-lg font-semibold mb-4 font-serif">Select Delivery Address</h2>
                        {userData.addresses.map((address, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleAddressSelect(address, idx)}
                                className={`flex items-start gap-3  address-card border rounded p-4 my-2 cursor-pointer transition
                                        ${selectedAddressIndex === idx ? "border-blue-600 bg-blue-50" : "hover:border-blue-500 hover:shadow-md"}
                                        `}
                            >
                                {/* Checkbox mimic */}
                                <div className="chckbx w-fit my-auto">

                                    <div
                                        className={`mt-1 w-5 h-5 flex-shrink-0 rounded-full border-2  flex  items-center justify-center
                                        ${selectedAddressIndex === idx ? "border-blue-600 bg-blue-600" : "border-gray-400"}
                                        `}
                                    >
                                        {selectedAddressIndex === idx && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-7.414 7.414a1 1 0 01-1.414 0L3.293 10.12a1 1 0 011.414-1.414l3.172 3.172 6.707-6.707a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Address Info */}
                                <div className="flex-1 text-sm">
                                    <p className="font-semibold">
                                        {address.firstName} {address.lastName}
                                        <span className="text-xs text-blue-600 mx-2">{address.tag}</span>
                                        {selectedAddressIndex === idx && (
                                            <span className="ml-2 text-green-700 text-sm font-semibold">(Selected)</span>
                                        )}
                                    </p>
                                    <p>
                                        {address.fullAddress}
                                        {address.landmark && `, ${address.landmark}`}
                                    </p>
                                    <p>{address.city}, {address.state} - {address.pincode}</p>
                                    <p>Phone : {address.phone}</p>
                                    <p>Email : {address.email}</p>
                                </div>
                            </div>
                        ))}


                        <div className="flex flex-col items-center p-2">
                            <Button
                                className="w-fit bg-lime-600 text-white rounded "
                                onClick={() => setShowAddAddressUI(true)}
                                type="button"
                            >
                                + Add New Address
                            </Button>
                        </div>
                    </div>
                ) : (
                    <CheckoutForm
                        cart={cart}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                        handlePaymentChange={handlePaymentChange}
                        states={[]}
                        OnlineAvailable={OnlineAvailable}
                    />
                )}
                {/* Payment Options */}
                <div className="flex flex-col gap-5 mt-2 border-t border-black py-2">

                    <div >
                        <h2 className="font-semibold text-lg mb-2 font-serif">
                            Payment Method : {formData.preferences.paymentMethod} {!OnlineAvailable && "(Online Payment Currently Unavailable)"}
                        </h2>

                        <div className="space-y-3 ">
                            <label
                                className={`flex gap-2 items-center justify-start border ${formData.preferences.paymentMethod == "Online" ? 'border-green-600 border-2' : ''} rounded p-2 cursor-pointer transition
                                ${!OnlineAvailable ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:shadow-md"}`}
                            >
                                <input
                                    type="radio"
                                    onClick={() => handlePaymentChange("Online")}
                                    name="payment"
                                    defaultChecked={formData.preferences.paymentMethod === "Online"}
                                    className="mr-2 w-fit"
                                    disabled={!OnlineAvailable}
                                />
                                <div className="">


                                    <span className={`${!OnlineAvailable ? "text-gray-500" : ""}`}>Online :</span>
                                    {OnlineAvailable ? (

                                        <>
                                            <br />
                                            <span className="text-xs text-green-600 ">Priority Shipping & Secure Payment</span>

                                        </>) : (

                                        <></>
                                    )}
                                </div>

                            </label>

                            <label className={`flex gap-2 items-center justify-start border ${formData.preferences.paymentMethod == "COD" ? 'border-green-600 border-2' : ''}  rounded p-2 cursor-pointer hover:shadow-md`}>
                                <input
                                    type="radio"
                                    onClick={() => handlePaymentChange("COD")}
                                    name="payment"
                                    defaultChecked={formData.preferences.paymentMethod === "COD"}
                                    className="mr-2 w-fit"
                                />
                                <div className="">
                                    Cash On Delivery :
                                    {OnlineAvailable ? (
                                        <>
                                            <br />
                                            <span className="text-xs text-yellow-600 "> Pay Online & Get Priority Shipping</span>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {/* <span className="font-bold">₹ 99.00</span> */}
                            </label>
                        </div>
                    </div>

                    {/* Payment Method Description */}
                    {formData.preferences.paymentMethod != " " ?
                        <>

                            {formData.preferences.paymentMethod === "Online" ? (
                                <div className="border rounded py-3 px-2">
                                    <h2 className="font-semibold mb-2 rounded-sm bg-slate-300 text-black p-2">Online Payment :</h2>

                                    <div className="px-1">
                                        <p className="text-sm text-gray-600">All Transactions Are Secured And Encrypted By :</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <img className="h-[30px]" src="/icons/safety-icon.svg" alt="secure" />
                                            <img className="h-[30px]" src="/icons/phonepe-1.svg" alt="phonepe" />
                                        </div>
                                    </div>


                                </div>
                            ) : (
                                <div className="border rounded py-3 px-2">
                                    <h2 className="font-semibold mb-2 rounded-sm bg-slate-300 text-black p-2">Cash On Delivery :</h2>
                                    <p className="text-sm mb-2 text-gray-600">
                                        Pay Online & Get Priority Shipping
                                    </p>
                                </div>
                            )}
                        </> : <p className="font-semibold mb-2 rounded-sm bg-slate-200 text-red-600 p-2 border-b shadow-md">⚠️ Please Select A Payment Method.</p>
                    }
                </div>
            </div>



            {/* Right Summary */}
            <div className="w-full lg:w-1/3 border rounded p-4 py-1 space-y-4 bg-gray-50">
                <h2 className="font-semibold text-lg font-serif">
                    Order Summary :
                </h2>
                {cart.length > 0 ? (
                    <div className="w-full max-w-md mx-auto">
                        {cartItems.map((item, index) => (
                            <div key={item.productId + item.variantSku} className="flex items-center gap-3 border-b py-4 relative">
                                <div className="w-14 h-14 relative shrink-0">
                                    <Image
                                        height={50}
                                        width={50}
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center font-bold">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.company} • {item.size}</p>
                                </div>
                                <div className="text-sm font-semibold whitespace-nowrap">₹{item.price.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-lg font-bold text-center font-serif">
                        <p>Please Add Items To Your Cart First</p>
                    </div>
                )}

                <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-xl font-semibold text-gray-900">Order Summary</p>
                    <dl className="flex items-center justify-between">
                        <dt>Total Price</dt>
                        <dd>₹ {itemTotal}</dd>
                    </dl>
                    <dl className="flex items-center justify-between">
                        <dt className="text-green-600 font-semibold">Savings</dt>
                        <dd className="text-green-600 font-semibold">- {savings} %</dd>
                    </dl>
                    <dl className="flex items-center justify-between">
                        <dt>
                            Delivery Charges{" "}
                            {loadingDelivery && <span className="text-sm">(Calculating...)</span>}
                        </dt>
                        {DeliverySetSuccess ? (
                            <dd>₹ {deliveryCharge}</dd>
                        ) : (
                            <p className="text-red-600 text-base text-end">Enter a Valid Pincode</p>
                        )}
                    </dl>
                    <dl className="flex items-center justify-between border-t pt-2 font-bold">
                        <dt>Total (Inclusive Tax)</dt>
                        <dd>₹ {orderTotal.toFixed(2)}</dd>
                    </dl>
                    <Button
                        type="submit"
                        disabled={!isFormValid}
                        onClick={CreateOrder}
                        className={`flex w-full justify-center rounded-lg p-2 text-lg font-semibold ${isFormValid
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {formData.preferences.paymentMethod === "Online"
                            ? "Pay Now"
                            : "Complete Order"}
                    </Button>

                    {/* Login Popup */}
                    {showLoginPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white py-5 pt-1 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                                <Button
                                    onClick={closeModal}
                                    className="bg-transparent flex justify-end"
                                >
                                    ❌
                                </Button>
                                <h2 className="text-2xl font-serif mb-4">Login Required !</h2>
                                <p className="text-gray-600 mb-6">
                                    Please login first to make an order.
                                </p>
                                <OTPOnClick />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-500">or</span>
                        <Link
                            href="/"
                            className="text-sm font-medium text-primary-700 underline"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            {
                Loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )
            }
        </div >
    );
}
