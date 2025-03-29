import React from 'react'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import PhoneNumberInput from './ui/phone_no_input';
import { FaGoogle } from 'react-icons/fa';

// import { Dialog } from '@radix-ui/react-dialog';
import {
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog } from "radix-ui";





const Login_register_pop = () => {

    const ServerPath = "http://localhost:5000/api/v1";
    const UserPaths = {
        register: `${ServerPath}/users/register`,
        login: `${ServerPath}/users/login`,
        logout: `${ServerPath}/users/logout`,
    };

    const [tab, setTab] = useState('login');

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            terms: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            const url = tab === 'login' ? UserPaths.login : UserPaths.register;
            const response = await axios.post(url, data);
            console.log('Success:', response.data);
            reset();
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div>

            <DialogContent >
                <VisuallyHidden>
                    <DialogTitle className="DialogTitle ">Login/Singup</DialogTitle>
                </VisuallyHidden>



                <div className="w-full px-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-10 mt-4 text-center">
                        Welcome To BynaTablet.in !
                    </h2>

                    <Tabs value={tab} onValueChange={(val) => { setTab(val); reset(); }} className="w-full ">
                        <TabsList className="flex justify-center space-x-11 mb-8 mx-6 bg-[#222831] rounded-lg h-11 text-white">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <Separator orientation="vertical" />
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <CardContent className="mt-10">

                                <form onSubmit={handleSubmit(onSubmit)} className="">


                                    <Controller
                                        name="phone_number"
                                        control={control}
                                        rules={{ required: 'Phone number is required' }}
                                        render={({ field }) => <PhoneNumberInput {...field} />}
                                    />
                                    {errors.phone_number && <p className="text-red-500 ">{errors.phone_number.message}</p>}



                                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 mt-8 text-lg">Login</Button>





                                    <div className="loingoogle flex flex-col w-full gap-5 mt-5 text-center items-center justify-center h-full">
                                        <h4 className="text-gray-500 text-center">Or</h4>
                                        <button className="flex items-center justify-center gap-2 px-6 py-1.5 bg-white outline text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                                            <FaGoogle className="text-red-500" size={20} />
                                            Login with Google
                                        </button>
                                    </div>


                                </form>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="register" className="">
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <Controller
                                        name="first_name"
                                        control={control}
                                        rules={{ required: 'First Name is required' }}
                                        render={({ field }) => <Input {...field} placeholder="First Name" type="text" />}
                                    />
                                    {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

                                    <Controller
                                        name="last_name"
                                        control={control}
                                        rules={{ required: 'Last Name is required' }}
                                        render={({ field }) => <Input {...field} placeholder="Last Name" type="text" />}
                                    />
                                    {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ required: 'Email is required' }}
                                        render={({ field }) => <Input {...field} placeholder="Email (Optional)" type="email" />}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                                        render={({ field }) => <Input {...field} placeholder="Password" type="password" />}
                                    />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                                    <Controller
                                        name="phone_number"
                                        control={control}
                                        rules={{ required: 'Phone number is required' }}
                                        render={({ field }) => <PhoneNumberInput {...field} />}
                                    />
                                    {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}

                                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600  text-lg">Register</Button>
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>


        </div>
    )
}

export { Login_register_pop };
