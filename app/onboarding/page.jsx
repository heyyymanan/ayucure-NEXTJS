import UserOnboarding from '@/components/onboarding'
import { Suspense } from 'react'

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-lg">Loading...</div>}>
      <UserOnboarding />
    </Suspense>
  )
}
