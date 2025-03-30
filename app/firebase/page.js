'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import {app} from '@/app/firebase/app';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import PhoneNumberInput from '../../components/ui/phone_no_input';
import { FaGoogle } from 'react-icons/fa';
import {
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog } from "radix-ui";

const  Login_register_pop = () => {
    const auth = getAuth(app);
    const [tab, setTab] = useState('login');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

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

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
                console.log('Recaptcha verified:', response);
            },
        });
    };

    const sendOtp = async (phone) => {
        try {
            setupRecaptcha();
            const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setMessage('OTP Sent! Check your phone.');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage('Failed to send OTP. Try again.'+phone);
        }
    };

    const verifyOtp = async () => {
        try {
            await confirmationResult.confirm(otp);
            setMessage('Phone number verified successfully!');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage('Invalid OTP. Try again.');
        }
    };

    return (
        
            <div className="w-full px-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-10 mt-4 text-center">
                    Welcome To BynaTablet.in!
                </h2>
                <Tabs value={tab} onValueChange={(val) => { setTab(val); reset(); }} className="w-full">
                    <TabsList className="flex justify-center space-x-11 mb-8 mx-6 bg-[#222831] rounded-lg h-11 text-white">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <Separator orientation="vertical" />
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <CardContent className="mt-10">
                            <form onSubmit={handleSubmit(({ phone_number }) => sendOtp("+"+phone_number))}>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    rules={{ required: 'Phone number is required' }}
                                    render={({ field }) => <PhoneNumberInput {...field} />}
                                />
                                {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
                                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 mt-8 text-lg">Send OTP</Button>
                                <div id="recaptcha-container"></div>
                                {confirmationResult && (
                                    <>
                                        <Input
                                            type='text'
                                            placeholder='Enter OTP'
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className='border p-2 w-full mb-2 rounded'
                                        />
                                        <Button onClick={verifyOtp} className="w-full bg-green-500 hover:bg-green-600 text-lg">Verify OTP</Button>
                                    </>
                                )}
                                {message && <p className="text-red-500 mt-2">{message}</p>}
                            </form>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </div>
        
    );
};

export default Login_register_pop;