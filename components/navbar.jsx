"use client"
import { HugeiconsIcon } from '@hugeicons/react';
import { Call02FreeIcons, Trolley01FreeIcons, User03Icon, } from '@hugeicons/core-free-icons/index';
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

import {Login_register_pop} from '../components/login_register_pop';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


const Navbar = () => {

    var IsVerfied = false;
    var Name = "Manan";


    const navItems = ['Home', 'Shop', 'About Us', 'Contact Us', 'Consult a Doctor'];

    return (
        <nav className="bg-[#222831] text-white w-100  flex-col sticky top-0 z-10">
            <div className="bar-1 flex justify-between ml-7 p-1">
                <div className="call flex  items-center gap-1 ">
                    <HugeiconsIcon
                        icon={Call02FreeIcons}
                        size={20}
                        color="currentColor"
                        strokeWidth={.5}
                    />
                    <p>+91-9928077671</p>
                </div>
                <div className="welcome-text text-sm flex items-center ">
                    <Link href='#'>Welcome ! Get 10% OFF On Your First Purchase. | Shop Now</Link>
                </div>
                <div className=""></div>
                
            </div>
            <hr className=" border-t border-gray-700" />

            <div className="bar-2 p-2 flex items-center justify-between">

                <Link href={'/'}>

                    <div className="logo flex items-center gap-2 px-2">

                        <Image
                            src="/logo.png"
                            alt="logo Image"
                            width={50}
                            height={40}
                            priority
                        />
                        <h1 className='text-4xl font-serif'>BynaTablet.in</h1>

                    </div>
                </Link>


                <div className="flex h-5 items-center space-x-4 text-xl font-serif">


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

                <div className="user flex justify-center items-center gap-5 px-2">
                    <Link href={"/cart"}>
                        <div className="cart flex gap-2">
                            <HugeiconsIcon
                                icon={Trolley01FreeIcons}
                                size={20}
                                color="currentColor"
                                strokeWidth={1}
                            />
                            <p className='flex items-center font-bold text-base'>My Cart</p>

                        </div>
                    </Link>
                    {IsVerfied ?
                        <div className="cart flex gap-2">
                            <DropdownMenu >
                                <DropdownMenuTrigger className='flex gap-1 items-center'>
                                    <HugeiconsIcon
                                        icon={User03Icon}
                                        size={20}
                                        color="currentColor"
                                        strokeWidth={1}
                                    />
                                
                                
                                    <p className='flex items-center font-bold text-base'>My Account<ChevronDown className='h-5' /></p>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#222831] text-white">
                                    <DropdownMenuLabel>{"Hey! " + Name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white" />
                                    <DropdownMenuItem>My Account</DropdownMenuItem>
                                    <DropdownMenuItem>My Wishlist</DropdownMenuItem>
                                    <DropdownMenuItem>My Cart</DropdownMenuItem>
                                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>
                        :
                        <Dialog>
                            <DialogTrigger className='flex gap-1 items-center'>
                                <HugeiconsIcon
                                        icon={User03Icon}
                                        size={20}
                                        color="currentColor"
                                        strokeWidth={1}/>

                            <p className='flex items-center font-bold text-lg  mr-5'>Login</p>
                            
                            </DialogTrigger>
                                    
                            <DialogContent>

                                <Login_register_pop/>

                            </DialogContent>
                        </Dialog>

                    }

                </div>
            </div>
            <hr className=" border-t border-gray-700" />
        </nav>
    );
};

export default Navbar;

