import { Suspense } from 'react'
import ThankYouClient from '@/components/thankyou.jsx'

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-lg">Loading...</div>}>
      <ThankYouClient />
    </Suspense>
  )
}
