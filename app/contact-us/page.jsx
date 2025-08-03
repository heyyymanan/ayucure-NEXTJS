"use client"
import Image from 'next/image';
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-t from-slate-100 to-[#222831] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full">

                {/* Contact Information Section */}
                <div className="get in touch">
                    <h3 className="text-2xl font-bold text-center text-gray-700 mb-6">Get In Touch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 text-center">
                        <div className="flex flex-col items-center">
                            <FaPhone className="text-blue-500 text-3xl mb-2" />
                            <p>Call Us : <a href="tel:+917665399832" className="text-blue-500">+91 7665399832</a></p>
                            <p>Or At : <a href="tel:+919928077671" className="text-blue-500">+91 9928077671</a></p>
                        </div>

                        <div className="flex flex-col items-center">
                            <FaEnvelope className="text-blue-500 text-3xl mb-2" />
                            <p>Support : <a href="mailto:support@bynatablet.com" className="text-blue-500">support@bynatablet.in</a></p>
                            <p>Or : <a href="mailto:shreejiremedies25@gmail.com" className="text-blue-500">shreejiremedies25@gmail.com</a></p>
                        </div>

                        <div className="flex flex-col items-center">
                            <FaMapMarkerAlt className="text-blue-500 text-3xl mb-2" />
                            <p>Address : 37, Gyan Marg, near R.M.V. School, Old City, Surajpole, Brahmpuri, Udaipur, Rajasthan 313001</p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mt-8">
                        <a href="https://www.instagram.com/ayurvedic_shreejiremedies/" target="_blank" className="text-blue-500 hover:text-blue-700 text-2xl">
                            <Image src="/icons/instagram.png" alt="instagram" width={30} height={30} className="mr-2 md:size-10" />
                        </a>
                        <a href="https://www.facebook.com/bynatablet" target="_blank" className="text-blue-400 hover:text-blue-600 text-2xl">
                           <Image src="/icons/facebook.png" alt="facebook" width={30} height={30} className="mr-2 md:size-10" />
                        </a>
                        <a href="https://wa.me/919928077671?text=Hello%20there!" target="_blank" className="text-blue-600 hover:text-blue-800 text-2xl">
                            <Image src="/icons/whatsapp.png" alt="whatsapp" width={30} height={30} className="mr-2 md:size-10" />
                        </a>
                    </div>
                </div>
                {/* <div className="br h-[2px] w-full bg-black my-5"></div> */}
                {/* <h3 className="text-2xl font-bold text-center text-gray-700 mb-6">OR</h3>
                <div className="br h-[2px] w-full bg-black my-5"></div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2> */}
                {/* <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Write your message here..."
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form> */}


            </div>
        </div>
    );
};

export default ContactUs;
