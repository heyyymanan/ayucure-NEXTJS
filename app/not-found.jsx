"use client";
import { Button } from "@/components/ui/button.jsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-screen h-[650px]">
      <div className="body my-56 flex justify-center items-center flex-col">
        <Image src={'/404.svg'} width={200} height={200} alt="404" className="mb-10" />
        <h1 className="font-serif text-4xl text-red-500 font-bold text-center mb-2">Oops!</h1>
        <h1 className="font-serif mb-10 text-2xl text-center font-semibold">
          Page Not Found!
        </h1>
        <Button className="bg-lime-500 text-bold text-lg font-serif text-white" onClick={() => router.push('/')}>Go to Home</Button>
      </div>
    </div>
  );
}
