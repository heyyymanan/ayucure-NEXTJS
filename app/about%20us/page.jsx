"use client"

import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen  bg-center text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Our Services</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Shreeji Remedies Card */}
        <div className="flex-1 bg-black/70 border border-white rounded-lg p-8 flex flex-col items-center text-center">
          <img src="/logo.png" alt="Shreeji Remedies" className="w-20 h-20 object-contain mb-4" />
          <h2 className="text-2xl font-bold mb-6">Shreeji Remedies</h2>
          <p className="text-sm mb-6 leading-relaxed">
            Shreeji Remedies (Ayurvedic Medicine Wholesaler And Distributor) With The Belief Of "Health Is Wealth", We Shreeji Remedies, Aim To Reach Person To Person And Serve Them With High Quality Ayurvedic Medicine Like As Akshay Herbals, Shri Mohta, Shri Shankar, Daber, Badynath Etc. We Also Provide Doctor Consultancy And Deal In Alternative Medicine Of Ayurveda Like As Byna Tablet, Byna Oil, Byna Plus Syrup, Byna Plus Capsule, Aeropile Capsule, Kalyani Syrup.
          </p>
          <p className="font-semibold mb-6">( Managed By Mr. Jyoti Mitra Vyas )</p>
          <a href="#" className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded-full text-lg transition">
            Visit Site
          </a>
        </div>

        {/* Doctor Consultancy Card */}
        <div className="flex-1 bg-black/70 border border-white rounded-lg p-8 flex flex-col items-center text-center">
          <img src="/kpvyas.png" alt="Dr. Kp Vyas" className="w-20 h-20 object-cover rounded-full mb-2" />
          <h3 className="text-md font-semibold">Dr. Kp Vyas</h3>
          <h2 className="text-2xl font-bold mb-6">Doctor Consultancy (Herbal Care)</h2>
          <p className="text-sm mb-6 leading-relaxed">
            Dr. K.P. Vyas Is A Highly Esteemed Expert In Alternative Medicine, Specializing In Ayurvedic Treatments And Holistic Healing. With Years Of Experience And Deep Knowledge In Traditional Medicine, He Provides Professional Consultancy Services To Help Individuals Achieve Optimal Health And Well-Being. His Expertise Is Also Valuable For Those Seeking Natural Remedies For Rheumatic Conditions And Joint Pain.
          </p>
          <p className="font-semibold mb-4">( Consultancy By DR. K.P. Vyas )</p>
          <p className="text-xs mb-6">
            Ex Director Of Dept. Of Ayurveda (Rajasthan) | Gynecology Specialist | Ex Principal M.M.M Gov. College, Udaipur (Raj.)
          </p>
          <a href="/consult a doctor" className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded-full text-lg transition">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  )
}

export default page

