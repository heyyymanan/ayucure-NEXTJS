import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (

        <footer className="bg-gray-100 text-gray-800">
            <hr className=" border-t border-gray-400 mb-5" />
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Left Section */}
                <div className="mb-6 md:mb-0 flex gap-5 items-center justify-center">  
                    <Image src="/icons/logo.png" alt="Shreeji Remedies" width={60 } height={60 } />
                    <div className="text ">

                    <h2 className="font-bold text-3xl mt-2">BynaTablet.in</h2>
                    <p className="text-sm">By Shreeji Remedies Since 2000.</p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mb-6 md:mb-0">
                    <h3 className="font-semibold mb-2 text-lg">Socials</h3>
                    <ul className="space-y-2">
                        
                        <li className="flex items-center"><a className="flex items-center" href="https://www.instagram.com/ayurvedic_shreejiremedies/" target="_blank"><Image src="/icons/instagram.png" alt="instagram" width={20} height={20} className="mr-2" /> Instagram</a>
                        </li>
                        <li className="flex items-center"><a className="flex items-center" href="https://www.facebook.com/bynatablet" target="_blank"><Image src="/icons/facebook.png" alt="facebook" width={20} height={20} className="mr-2" /> FaceBook</a>
                        </li>
                        <li className="flex items-center"><a className="flex items-center" href="https://wa.me/919928077671?text=Hello%20there!" target="_blank"><Image src="/icons/whatsapp.png" alt="whatsapp" width={20} height={20} className="mr-2" /> WhatsApp</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="mb-6 md:mb-0">
                    <h3 className="font-semibold mb-2 text-lg">Contact Us</h3>
                    <p>Call Us : <a href="tel:+919928077671" className="text-blue-500">+91 9928077671</a></p>
                    <p>Or At : <a href="tel:+917665399832" className="text-blue-500">+91 7665399832</a></p>
                    <p>Email : <a href="mailto:shreejiremedies25@gmail.com" className="text-blue-500">shreejiremedies25@gmail.com</a></p>
                    <p>Address : 37, Gyan Marg, near R.M.V. School, Old City, Surajpole, Brahmpuri, Udaipur, Rajasthan 313001</p>
                </div>

                {/* Get The App */}
                <div className='flex-col grayscale'>
                    <h3 className="font-semibold mb-5 text-lg text-center ">Get The App (Upcoming)</h3>
                    <button className='bg-[#D3D3D3] p-3 rounded-lg hover:cursor-not-allowed'> 

                        <li className="flex items-center"><Image src="/icons/playstore.png" alt="Instagram" width={20} height={20} className="mr-2 " />Download Now</li>

                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-lime-500 text-gray-900 text-center  py-3 mt-6 mb-0">
                {/* <p>&copy; Inc. All rights reserved.</p> */}
                <div className="flex justify-center space-x-4 mt-1">
                    <a href="/terms-and-conditions" className="text-sm hover:underline">Terms And Conditions</a>
                    <a href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</a>
                    <a href="/cancellation-and-refund-policy" className="text-sm hover:underline">Cancellation/Refund Policy</a>
                    {/* <a href="#" className="text-sm hover:underline">Cookies</a> */}
                </div>
            </div>
        </footer>

    )
}

export default Footer
