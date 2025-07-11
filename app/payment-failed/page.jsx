import { Suspense } from 'react'
import PaymentFailed from '@/components/payment-failed'

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-lg">Loading...</div>}>
      <PaymentFailed />
    </Suspense>
  )
}
