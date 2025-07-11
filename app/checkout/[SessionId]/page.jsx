"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CartList from "@/components/ui/cart_list";
import axios from 'axios';
import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button";
import CheckoutForm from "@/components/deliveryForm";
import { useRouter } from "next/navigation";


const isValidEmail = (email) => {
    return /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email);
};

const FormCheck = (formData, cart) => {
    if (!formData || !cart) return false;

    const {
        contact: { email },
        delivery: {
            firstName,
            lastName,
            fullAddress,
            city,
            state,
            pincode,
            phone,
        },
        preferences: { paymentMethod },
    } = formData;
    return (
        isValidEmail(email?.trim()) &&
        firstName?.trim() !== "" &&
        lastName?.trim() !== "" &&
        fullAddress?.trim() !== "" &&
        city?.trim() !== "" &&
        state?.trim() !== "" &&
        pincode?.trim() !== "" && pincode?.length != 7 &&
        phone?.trim() !== "" && phone?.length > 9 &&
        (paymentMethod === "Online" || paymentMethod === "COD") &&
        cart.length > 0
    );
};


export default function CheckoutPage() {

    const router = useRouter();
    const { cart, getTotalPrice } = useCart();

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
        preferences: { saveAddress: false, paymentMethod: "" },
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const valid = FormCheck(formData, cart);
        setIsFormValid(valid);
    }, [formData, cart]);

    useEffect(() => {
        //  Runs only on the client
        const saved = localStorage.getItem("userAddr");
        if (saved) {
            const savedFormData = JSON.parse(saved);
            setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, ...savedFormData.contact },
                delivery: { ...prev.delivery, ...savedFormData.delivery },
                preferences: { ...prev.preferences, ...savedFormData.preferences },
            }));
        }
    }, []);

    // Save to localStorage when saveAddress is true
   useEffect(() => {
    if (formData.preferences.saveAddress) {
        // Create a copy of formData without paymentMethod
        const { preferences, ...rest } = formData;
        const dataToStore = {
            ...rest,
            preferences: {
                ...preferences,
                paymentMethod: "", // or you can simply omit this line if you want to totally remove it
            },
        };
        localStorage.setItem("userAddr", JSON.stringify(dataToStore));
    }
}, [formData]);




    const OnlineAvailable = true;
    var itemTotal = getTotalPrice();
    const savings = cart.length === 0 ? 0 : 10; // In Percent
    const deliveryCharge = cart.length === 0 ? 0 : 100; // In Rs
    const [CODCharge, setCODCharge] = useState(
        (formData.preferences.paymentMethod === "COD") && (cart.length > 0) ? 99 : 0 // In Rs
    );
    const orderTotal = ((itemTotal - ((itemTotal / 100) * savings)) + deliveryCharge + CODCharge)



    const handleInputChange = (section, field) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleCheckboxChange = (section, field) => (e) => {
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: checked,
            },
        }));
    };

    const handlePaymentChange = (method) => {
        setFormData((prev) => ({
            ...prev,
            preferences: { ...prev.preferences, paymentMethod: method },
        }));
        setCODCharge(method === "COD" && cart.length > 0 ? 99 : 0);
    };

    const transformToOrderDetails = () => {

        const order_amount = orderTotal

        const OrderDetails = {
            customer_details: {
                customer_email: formData.contact.email,
                customer_phone: formData.delivery.phone,
                firstname: formData.delivery.firstName,
                lastname: formData.delivery.lastName,
            },
            shippingInfo: {
                firstname: formData.delivery.firstName,
                lastname: formData.delivery.lastName,
                email: formData.contact.email,
                fulladdress: formData.delivery.fullAddress,
                landmark: formData.delivery.landmark,
                city: formData.delivery.city,
                state: formData.delivery.state,
                pincode: formData.delivery.pincode,
                phone: formData.delivery.phone,
            },
            orderItems: cart, 
            paymentMethod: formData.preferences.paymentMethod,
            order_amount: order_amount,

        };

        return OrderDetails;
    };

    const placeOrder = async (orderDetailsObj) => {
        let data = null; 

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/general/create-order`,
                {
                    order_details: JSON.stringify(orderDetailsObj),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            data = response.data;
            

        } catch (error) {
            console.error('❌ Order Error:', error.response?.data?.message || error.message);
            alert('Failed to place order: ' + (error.response?.data?.message || error.message));
        } finally {
            if (data?.success) {
                router.push(data.phonepe_checkout_url);
            } else {
                alert("An error occurred");
            }
        }
    };






    const redirectToPaymentPage = async (e) => {


        placeOrder(transformToOrderDetails()) //Creates Order In DataBase

        e.preventDefault()

    };
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const fetchCityState = async (pincode) => {
        try {
            const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = res.data[0];

            if (data.Status === "Success") {
                const postOffice = data.PostOffice[0];
                return {
                    city: postOffice.District,
                    state: postOffice.State,
                };
            } else {
                throw new Error("Invalid Pincode");
            }
        } catch (error) {
            throw new Error("Failed to fetch data");
        }
    };


    useEffect(() => {
        const pincode = formData.delivery.pincode;

        // Only trigger fetch if exactly 6 digits
        if (pincode.length === 6) {
            const getCityState = async () => {
                try {
                    const data = await fetchCityState(pincode);
                    setFormData((prev) => ({
                        ...prev,
                        delivery: {
                            ...prev.delivery,
                            city: data.city,
                            state: data.state,
                        },
                    }));
                } catch (error) {
                    alert("Invalid pincode", error);
                    setFormData((prev) => ({
                        ...prev,
                        delivery: {
                            ...prev.delivery,
                            city: "",
                            state: "",
                        },
                    }));
                }
            };

            getCityState();
        } else {
            // Clear city & state if pincode is not complete
            setFormData((prev) => ({
                ...prev,
                delivery: {
                    ...prev.delivery,
                    city: "",
                    state: "",
                },
            }));
        }
    }, [formData.delivery.pincode]);





    return (
        <div className="flex flex-col lg:flex-row p-4 gap-6 max-w-7xl mx-auto font-sans">
            {/* Left section */}
            <>
                <CheckoutForm cart={cart} formData={formData} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} handlePaymentChange={handlePaymentChange} states={states} OnlineAvailable={OnlineAvailable} />
            </>
            {/* Right section: Summary */}
            <div className="w-full lg:w-1/3 border rounded p-4 space-y-4 bg-gray-50">
                {
                    cart.length > 0 ?
                        <CartList />
                        :
                        <div className="div text-lg font-bold text-center font-serif    ">
                            <p>Please Add Items To Your Cart First</p>
                        </div>
                }

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <p className="text-xl font-semibold text-gray-900">Order Summary</p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Total Price</dt>
                                    <dd className="text-base font-medium text-gray-900">₹ {itemTotal}</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                                    <dd className="text-base font-medium text-green-600">- {savings} %</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-500">Delivery Charges</dt>
                                    <dd className="text-base font-medium text-gray-900">
                                        ₹ {deliveryCharge}
                                        {CODCharge ? " + " + CODCharge : null}
                                    </dd>
                                </dl>
                            </div>
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                <dt className="text-base font-bold text-gray-900">Total (Inclusive Tax)</dt>
                                <dd className="text-base font-bold text-gray-900">
                                    ₹ {orderTotal}
                                </dd>
                            </dl>
                        </div>
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            onClick={redirectToPaymentPage}
                            className={`flex w-full items-center justify-center rounded-lg bg-lime-500 p-2 text-lg font-semibold  ${isFormValid
                                ? "bg-green-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {formData.preferences.paymentMethod === "Online" ? "Pay Now" : "Complete Order"}
                        </Button>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-normal text-gray-500">or</span>
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                                Continue Shopping
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}