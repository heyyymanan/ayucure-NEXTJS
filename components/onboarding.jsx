'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { OrderConfirmed } from './ui/order_confirmed'

export default function UserOnboarding() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get('userID')

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      router.replace('/')
    }
  }, [userId, router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!isValidEmail(formData.email)) {
      setError("Invalid email format. Please enter a valid email address.")
      setLoading(false)
      return
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/general/completeonboarding`,
        {
          userId,
          ...formData,
        },
        {
          withCredentials: true,
        }
      )

      if (response.data.success) {
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(response.data?.data?.user || {}))
        localStorage.setItem("isLoggedin", true)
        localStorage.setItem("isOnboarded", true)
        setSuccess(true)

        // Redirect after short delay
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (err) {
      console.error("❌ Update error:", err.response?.data || err.message)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!userId) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome! Complete your profile 📝</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 gap-5">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading || success}
          className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {success && (
          <div className="success flex flex-col items-center py-5 gap-16">
            <p className="text-green-600 text-center font-bold">
              Profile updated! 🎉 Redirecting...
            </p>
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}
