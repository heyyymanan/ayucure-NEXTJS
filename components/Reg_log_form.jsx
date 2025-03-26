'use client'

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import PhoneNumberInput from './ui/phone_no_input';

export default function AuthForm() {
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
    <div className="mx-auto h-auto w-max p-10">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-md flex">
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <Image src="/Login-animate.svg" alt="Auth-Illustration" width={450} height={200} />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-4 text-center">
            {tab === "login" ? "User Login" : "Register User"}
          </h2>

          <Tabs value={tab} onValueChange={(val) => { setTab(val); reset(); }} className="w-full">
            <TabsList className="flex justify-center space-x-4 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <Separator orientation="vertical" />
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardContent className="gap-10">
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
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => <Input {...field} placeholder="Password" type="password" />}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">Sign In</Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register" className="p-6">
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

                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => <PhoneNumberInput {...field} />}
                  />
                  {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}

                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">Sign Up</Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}