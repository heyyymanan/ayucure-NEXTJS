import { Suspense } from 'react'
import PaymentProcessing from '@/components/payment-pending'

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-lg">Loading...</div>}>
      <PaymentProcessing/>
    </Suspense>
  )
}
