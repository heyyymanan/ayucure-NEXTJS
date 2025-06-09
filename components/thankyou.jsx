'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { OrderConfirmed } from '@/components/ui/order_confirmed'
import Link from 'next/link'

export default function ThankYouClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const router = useRouter()

  useEffect(() => {
    if (!orderId) {
      router.replace('/')
    }
  }, [orderId, router])

  if (!orderId) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-10 px-2">
      <OrderConfirmed />
      <h1 className="text-3xl font-bold text-green-700">Order Confirmed!</h1>
      <p className="mt-2 text-lg text-gray-700">Thank you for your purchase 🛒</p>
      <p className="mt-1 text-sm text-gray-500">
        Order ID: <strong>{orderId}</strong>
      </p>
      <br/>
      <p>We Will Update You Through Whatsapp Now.</p>
      <div className="flex items-center justify-center mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl font-medium text-primary-700 underline hover:no-underline"
        >
          Continue Shopping
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
