"use client"; // if using Next.js App Router

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react"; // Optional: or use any icon lib

const PaymentFailed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.replace("/"); // Redirect to homepage if no orderId
    }
  }, [orderId, router]);

  return (

    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          Oops! Something went wrong while processing your payment.
        </p>
        <p className="text-gray-500 mb-6 text-sm">
          Please try again or contact support if the problem continues.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
          Go Back to Home
        </a>
      </div>
    </div>
          
  );
};

export default PaymentFailed;
