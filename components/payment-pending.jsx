"use client"; // Only for Next.js App Router. Remove if using CRA or older Next.js

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react"; // You can also use any other loading spinner

const PaymentProcessing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL_PROD+'/verify-payment?merchantOrderId=${orderId}&raw=true'
        );
        const data = await res.json();

        if (data?.paymentStatus === "COMPLETED") {
          router.replace(`/order-success?orderId=${orderId}`);
        } else if (data?.paymentStatus === "FAILED") {
          router.replace(`/payment-failed?orderId=${orderId}`);
        } else {
          setStatus("PENDING");
          setTimeout(checkStatus, 3000); // poll every 3 seconds
        }
      } catch (err) {
        console.error("Status check failed", err);
        setTimeout(checkStatus, 5000); // retry on error
      }
    };

    checkStatus();
  }, [orderId, router]);

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <Loader2 className="animate-spin text-yellow-500 w-12 h-12 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-yellow-700 mb-2">
          Verifying your payment...
        </h1>
        <p className="text-gray-600 mb-4">
          Please wait while we confirm your transaction.
        </p>
        <p className="text-sm text-gray-500">
          This may take a few seconds. Do not close this page.
        </p>
        {status === "PENDING" && (
          <p className="mt-4 text-xs text-yellow-600">
            Payment is still pending. We're retrying...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessing;
