import { HugeiconsIcon } from '@hugeicons/react';
import { Call02FreeIcons,Trolley01FreeIcons, User03Icon,} from '@hugeicons/core-free-icons/index';
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
import { Separator } from "@/components/ui/separator"


const Navbar = () => {
    return (
        <nav className="bg-[#222831] text-white w-100  flex-col">
            <div className="bar-1 flex justify-between  p-1">
                <div className="call flex  items-center gap-1 ">
                    <HugeiconsIcon
                        icon={Call02FreeIcons}
                        size={20}
                        color="currentColor"
                        strokeWidth={.5}
                    />
                    <p>+91-9928077671</p>
                </div>
                <div className="welcome-text">
                    <p>Welcome ! Get 10% OFF On Your First Purchase. | Shop Now</p>
                    {/* <hr /> */}
                </div>
                <div className="lang flex justify-center">
                    <DropdownMenu >
                        <DropdownMenuTrigger className="flex justify-center items-center">English<ChevronDown className='h-5' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Hindi</DropdownMenuItem>
                            <DropdownMenuItem>Arabic</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <hr className=" border-t border-gray-700" />

            <div className="bar-2 p-2 flex items-center justify-between">

                <div className="logo flex items-center gap-2 px-2">
                    <Image
                        src="/logo.png" // Path to your image in the public folder
                        alt="logo Image"
                        width={50} // Set the desired width
                        height={40} // Set the desired height
                        layout="intrinsic" // Automatically adjust dimensions
                        priority // Load image faster
                    />
                    <h1 className='text-4xl font-serif'>BynaTablet.in</h1>
                </div>

                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>Home</div>
                    <Separator orientation="vertical" />
                    <div>About Us</div>
                    <Separator orientation="vertical" />
                    <div>Contact Us</div>
                    <Separator orientation="vertical" />
                    <div>Doctor Consultany</div>
                </div>

                <div className="user flex justify-center items-center gap-5 px-2">

                    <div className="cart flex gap-2">
                        <DropdownMenu >
                            <DropdownMenuTrigger >
                                <HugeiconsIcon
                                    icon={Trolley01FreeIcons}
                                    size={20}
                                    color="currentColor"
                                    strokeWidth={1}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuTrigger >
                                <p className='flex items-center font-bold text-base'>My Cart<ChevronDown className='h-5' /></p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Hindi</DropdownMenuItem>
                                <DropdownMenuItem>Arabic</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="cart flex gap-2">
                        <DropdownMenu >
                            <DropdownMenuTrigger >
                                <HugeiconsIcon
                                    icon={User03Icon}
                                    size={20}
                                    color="currentColor"
                                    strokeWidth={1}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuTrigger >
                                <p className='flex items-center font-bold text-base'>My Account<ChevronDown className='h-5' /></p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Hindi</DropdownMenuItem>
                                <DropdownMenuItem>Arabic</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;

