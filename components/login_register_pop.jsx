'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '@/app/firebase/app';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import PhoneNumberInput from './ui/phone_no_input';

import LoginPage from '@/app/test/page.jsx';

import {
    DialogContent,
} from "@/components/ui/dialog";
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const Login_register_pop = () => {
    

    return (
        <DialogContent >
            <VisuallyHidden>
                <DialogTitle className="DialogTitle ">Login/Singup</DialogTitle>
            </VisuallyHidden>
            
            <LoginPage/>
            
            </DialogContent>

            );
};

            export  {Login_register_pop};