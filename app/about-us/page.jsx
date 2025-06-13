"use client"

import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-slate-100 to-[#222831] text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Our Services</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Shreeji Remedies Card */}
        <div className="flex-1 bg-black/70 border border-white rounded-lg p-8 flex flex-col items-center text-center">
          <Image height={50}
            width={50} src="/logo.png" alt="Shreeji Remedies" className="w-20 h-20 object-contain mb-4" />
          <h2 className="text-2xl font-bold mb-6">Shreeji Remedies</h2>
          <p className="text-sm mb-6 leading-relaxed">
            At Shreeji Remedies, we are proud to be a trusted Ayurvedic medicine wholesaler and distributor, committed to the timeless belief that “Health is Wealth.” Our mission is to deliver high-quality Ayurvedic solutions from renowned brands such as Akshay Pharma, Shri Mohta, Shri Shankar, Dabur, Baidyanath, and more — reaching people from all walks of life with nature’s healing power. We also specialize in alternative Ayurvedic medicines, including trusted formulations like Byna Tablet, Byna Oil, Byna Plus Syrup, Byna Plus Capsule, Aeropile Capsule, and Kalyani Syrup. Going beyond products, we provide access to qualified doctor consultations, ensuring that every customer receives the right guidance for their wellness journey. With a strong focus on authenticity, customer care, and holistic health, Shreeji Remedies is your one-stop online platform for wholesale Ayurvedic products that promote natural healing and long-term wellness.


          </p>
          <p className="font-semibold mb-6">( Managed By Mr. Jyoti Mitra Vyas )</p>
          <a href="/contact-us" className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded-full text-lg transition">
            Contact Us
          </a>
        </div>

        {/* Doctor Consultancy Card */}
        <div className="flex-1 bg-black/70 border border-white rounded-lg p-8 flex flex-col items-center text-center">
          <Image height={50}
            width={50} src="/kpvyas.png" alt="Dr. Kp Vyas" className="w-20 h-20 object-cover rounded-full mb-2" />
          <h3 className="text-md font-semibold">Dr. K.P. Vyas</h3>
          <h2 className="text-2xl font-bold mb-6">Doctor Consultancy (Herbal Care)</h2>
          <p className="text-sm mb-6 leading-relaxed">
            Dr. K.P. Vyas Is A Highly Esteemed Expert In Alternative Medicine, Specializing In Ayurvedic Treatments And Holistic Healing. With Years Of Experience And Deep Knowledge In Traditional Medicine, He Provides Professional Consultancy Services To Help Individuals Achieve Optimal Health And Well-Being. His Expertise Is Also Valuable For Those Seeking Natural Remedies For Rheumatic Conditions And Joint Pain.
          </p>
          <p className="font-semibold mb-4">( Consultancy By DR. K.P. Vyas )</p>
          <p className="text-xs mb-6">
            Ex Director Of Dept. Of Ayurveda (Rajasthan) | Gynecology Specialist | Ex Principal M.M.M Gov. College, Udaipur (Raj.)
          </p>
          <a href="/consult-a-doctor" className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded-full text-lg transition">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  )
}

export default page

