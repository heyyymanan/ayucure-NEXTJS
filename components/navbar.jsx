"use client"
import { HugeiconsIcon } from '@hugeicons/react';
import { Call02FreeIcons, Hamburger01FreeIcons, Hamburger02FreeIcons, HamburgerIconFreeIcons, Menu01FreeIcons, Trolley01FreeIcons, User03Icon, } from '@hugeicons/core-free-icons/index';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';


import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from '@clerk/nextjs'
import { FaHamburger } from 'react-icons/fa';




const Navbar = () => {

    const { user } = useUser();
    const name = user?.firstName;


    const navItems = ['Home', 'Shop', 'About Us', 'Contact Us', 'Consult a Doctor', 'test'];

    return (
        <nav className="bg-[#222831] text-white max-w-screen  flex-col sticky top-0 z-10">
            <div className="bar-1 lg:flex md:justify-between max-w-screen ml-4 md:p-1">
                <div className="call flex md:justify-normal justify-center text-sm items-center gap-1 ">
                    <HugeiconsIcon
                        icon={Call02FreeIcons}
                        size={20}
                        color="currentColor"
                        strokeWidth={.5}
                    />
                    <p>+91-9928077671</p>
                </div>
                <div className="welcome-text text-sm hidden lg:flex mr-48 lg:mr-24 items-center ">
                    <Link href='#'>Welcome ! Get 10% OFF On Your First Purchase. | Shop Now</Link>
                </div>
                <div className=""></div>

            </div>
            <hr className=" border-t border-gray-700" />

            <div className="bar-2 md:p-2 h-16 flex justify-between items-center ">

                <Link href={'/'}>

                    <div className="logo lg:size-15 size-[50px]   flex items-center gap-2  px-2">

                        <Image
                            src="/icons/logo.png"
                            alt="logo Image"
                            width={50}
                            height={40}
                            priority
                            className=' '
                        />
                        <h1 className='lg:text-2xl text-xl font-serif'>BynaTablet.in</h1>

                    </div>
                </Link>


                <div className="lg:flex h-5 items-center hidden lg:ml-32 lg:text-xl font-serif">


                    <ul className="flex items-center justify-evenly gap-3">
                        {navItems.map((item, index) => (
                            <li key={item} className="flex items-center">
                                <Link
                                    href={`/${item.toLowerCase()}`}
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

                <div className="user md:flex flex justify-center items-center gap-5 md:px-2 p-4">
                    
                    
                    <div className="user flex justify-center items-center md:gap-2 gap-4">
                        

                        <Link href={"/cart"}>
                            <div className="cart flex mr-4 gap-2">
                                <HugeiconsIcon
                                    icon={Trolley01FreeIcons}
                                    size={20}
                                    color="currentColor"
                                    strokeWidth={1}
                                    />
                                <p className='md:flex hidden items-center font-bold text-base'>My Cart</p>

                            </div>
                        </Link>

                        <SignedIn >
                            <div className=" flex gap-4 items-center">




                            <div className="cart md:flex hidden gap-5">
                                <DropdownMenu >


                                    <DropdownMenuTrigger>
                                        <p className='flex items-center font-bold text-base'>My Account<ChevronDown className='h-5' /></p>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-[#222831] text-white">
                                        <DropdownMenuLabel>{"Hey! " + name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white" />
                                        <DropdownMenuItem>My Account</DropdownMenuItem>
                                        <DropdownMenuItem>My Wishlist</DropdownMenuItem>
                                        <DropdownMenuItem>My Cart</DropdownMenuItem>
                                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                                    </DropdownMenuContent>

                                </DropdownMenu>


                            </div>
                            
                                <UserButton />


                                    </div>
                        </SignedIn>


                        <SignedOut>


                            <SignInButton className="md:flex  lg:mr-2 md:mr-5 gap-2 justify-center items-center hover:cursor-pointer">

                                <div className="login flex gap-2 text-white items-center">


                                    <HugeiconsIcon
                                        icon={User03Icon}
                                        size={20}
                                        color="currentColor"
                                        strokeWidth={1}
                                    />


                                    <p className='md:flex hidden items-center font-bold text-base'>Login</p>

                                </div>
                            </SignInButton>


                        </SignedOut>


                    </div>


                </div>
            </div >
            <hr className=" border-t border-gray-700" />
        </nav >
    );
};

export default Navbar;

