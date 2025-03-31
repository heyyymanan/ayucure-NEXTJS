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

                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    

                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ required: 'Email is required' }}
                                        render={({ field }) => <Input {...field} placeholder="Email" type="email" />}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                                        render={({ field }) => <Input {...field} placeholder="Password" type="password" />}
                                    />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                                   

                                    <button onClick={handleSignIn}>Sign In</button>
                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                    
                                </form>
                            </CardContent>
                        
                    
                </div>
            </DialogContent>


        </div>
    )
}

export { Login_register_pop };