"use client";

import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export default function AuthPage() {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { user } = useUser();
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!signInLoaded || !signUpLoaded) return;
    try {
      if (isSignUp) {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
        });
        await signUp.prepareEmailAddressVerification();
        setError("Verification email sent. Please check your inbox.");
      } else {
        await signIn.create({
          identifier: data.email,
          password: data.password,
        });
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Authentication failed. Check your credentials.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      if (isSignUp) {
        await signUp.authenticateWithRedirect({ strategy: "oauth_google" });
      } else {
        await signIn.authenticateWithRedirect({ strategy: "oauth_google" });
      }
    } catch (err) {
      setError("Google authentication failed. Try again.");
    }
  };

  if (user) return <p>You are already signed in.</p>;

  return (
    
      <DialogContent className="max-w-md w-full p-8 bg-gray-900 text-white rounded-lg">
        <DialogTitle>hello</DialogTitle>
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <h2 className="text-xl font-semibold text-center mt-4">
          {isSignUp ? "Sign up for BynaTablet.in" : "Sign in to BynaTablet.in"}
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Welcome back! Please {isSignUp ? "sign up" : "sign in"} to continue
        </p>
        <button
          className="w-full bg-gray-800 text-white py-2 rounded flex items-center justify-center mb-4"
          onClick={handleGoogleAuth}
        >
          <Image src="/icons/Google.png" alt="Google" width={20} height={20} className="mr-2" />
          Continue with Google
        </button>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-gray-700" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-700" />
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => <Input {...field} placeholder="Enter your email address" type="email" />}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              }}
              render={({ field }) => <Input {...field} placeholder="Enter your password" type="password" />}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
           


            <button type="submit" className="w-full bg-purple-600 py-2 rounded">
              {isSignUp ? "Sign Up" : "Continue"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </CardContent>
        <p className="text-center text-gray-400 mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"} 
          <span className="text-purple-500 cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign in" : "Sign up"}
          </span>
        </p>
      </DialogContent>
    
  );
}
