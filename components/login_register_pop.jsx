'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '@/app/firebase/app';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PhoneNumberInput from './ui/phone_no_input';

import {
    DialogContent,
} from "@/components/ui/dialog";
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const Login_register_pop = () => {
    const auth = getAuth(app);
    
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone_number: '',
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
    const appVerifier = window.recaptchaVerifier;

    const sendOtp = async (phone) => {
        try {
            setupRecaptcha();
            const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(confirmation);
            window.confirmationResult = confirmationResult;
            setMessage('OTP Sent! Check your phone.');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage('Failed to send OTP. Try again.'+phone);
            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
              });
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
        <DialogContent >
            <VisuallyHidden>
                <DialogTitle className="DialogTitle ">Login/Singup</DialogTitle>
            </VisuallyHidden>
            <div className="w-full px-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-10 mt-4 text-center">
                    Welcome To BynaTablet.in!
                </h2>
                
                   
                   
                        <CardContent className="mt-10">
                            <form onSubmit={handleSubmit(({ phone_number }) => sendOtp("+" + phone_number))}>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    rules={{ required: 'Phone number is required' }}
                                    render={({ field }) => <PhoneNumberInput {...field} />}
                                />
                                {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}

                                {!confirmationResult && (
                                    <>
                                    
                                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 mt-8 text-lg">Send OTP</Button>
                                    </>
                                )}

                                <div id="recaptcha-container"></div>

                                {confirmationResult && (
                                    <>
                                        <Input
                                            type='text'
                                            placeholder='Enter OTP'
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className='border p-2 w-full mb-2 mt-5 rounded'
                                        />
                                        <Button onClick={verifyOtp} className="w-full bg-green-500 hover:bg-green-600 text-lg">Verify OTP</Button>
                                    </>
                                )}
                                {message && <p className="text-red-500 mt-2">{message}</p>}
                            </form>
                        </CardContent>
                    
                
            </div>
            </DialogContent>

            );
};

            export  {Login_register_pop};