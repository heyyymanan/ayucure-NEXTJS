'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AuthForm() {
  const [tab, setTab] = useState('login');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = tab === 'login' ? '/api/login' : '/api/register';
      const response = await axios.post(url, data);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex justify-center">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
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
                rules={{ required: 'Password is required' }}
                render={({ field }) => <Input {...field} placeholder="Password" type="password" />} 
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="register">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => <Input {...field} placeholder="Full Name" type="text" />} 
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              
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
              
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
