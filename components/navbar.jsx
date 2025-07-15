"use client"
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Call02FreeIcons,
    Trolley01FreeIcons,
    User03Icon
} from '@hugeicons/core-free-icons/index';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from '@clerk/nextjs';

const Navbar = () => {
    const { user } = useUser();
    const name = user?.firstName;

    const navItems = ['Home', 'Shop All', 'About Us', 'Contact Us'];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#222831] text-white sticky top-0 z-10 w-full">
            {/* Top Bar */}
            <div className="bar-1 lg:flex md:justify-between  max-w-screen md:p-1 ">
                <div className="call flex md:justify-normal justify-center text-sm md:ml-5 items-center gap-1">
                    <HugeiconsIcon icon={Call02FreeIcons} size={20} color="currentColor" strokeWidth={1} />
                    <p >+91-9928077671</p>
                </div>
                <div className="welcome-text text-sm hidden lg:flex lg:mr-[730px] items-center ">
                    <Link href='/shop-all' >Welcome! Get 10% OFF On All Your Purchase. | Shop Now</Link>
                </div>
            </div>

            <hr className="border-t border-gray-700" />

            {/* Main Bar */}
            <div className="bar-2 md:p-2 h-16 flex justify-between items-center relative">
                {/* Logo */}
                <Link href={'/'}>
                    <div className="logo lg:size-15 size-[50px] flex items-center gap-2 px-2">
                        <Image src="/icons/logo.png" alt="logo Image" width={40} height={40} priority />
                        <h1 className='lg:text-2xl text-xl font-serif'>BynaTablet.in</h1>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="lg:flex h-5 items-center hidden lg:ml-32 lg:text-xl font-serif">
                    <ul className="flex items-center justify-evenly gap-3">
                        {navItems.map((item, index) => (
                            <li key={item} className="flex items-center">
                                <Link
                                    href={`/${item.replace(/ /g, '-').toLowerCase()}`}
                                    className="relative text-white hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {item}
                                </Link>
                                {index < navItems.length - 1 && (
                                    <span className="h-6 w-[1px] bg-gray-400 mx-2 ml-3.5"></span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side - Cart & Hamburger */}
                <div className="flex justify-center items-center gap-5 md:px-2 p-4">
                    {/* Cart */}
                    <Link href={"/cart"}>
                        <div className="cart flex mr-2 gap-2">
                            <HugeiconsIcon icon={Trolley01FreeIcons} size={20} color="currentColor" strokeWidth={1} />
                            <p className='md:flex hidden items-center font-bold text-base'>My Cart</p>
                        </div>
                    </Link>

                    {/* Mobile Hamburger Icon */}
                    <div className="lg:hidden block cursor-pointer">
                        {isMobileMenuOpen ? (
                            <IoClose className="text-2xl" onClick={() => setIsMobileMenuOpen(false)} />
                        ) : (
                            <FaBars className="text-xl" onClick={() => setIsMobileMenuOpen(true)} />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden flex flex-col bg-[#1d1f24] px-6 py-4 space-y-4 text-lg font-serif transition-all duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            href={`/${item.replace(/ /g, '-').toLowerCase()}`}
                            className="hover:text-gray-300 text-center border py-1"
                            onClick={() => setIsMobileMenuOpen(false)} // auto close on click
                        >
                            {item}
                            
                        </Link>
                    ))}
                    {/* <hr className="border-white" /> */}
                    <Link href={"/cart"} onClick={() => setIsMobileMenuOpen(false)} className='hover:text-gray-300 text-center border py-1'>
                        🛒 My Cart
                    </Link>
                </div>
            )}

            <hr className="border-t border-gray-700" />
        </nav>
    );
};

export default Navbar;
