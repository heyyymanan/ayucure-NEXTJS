import React from 'react'
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
    const textRef = useRef(null);
    const pngRef = useRef(null);
  
    useEffect(() => {
      const tl = gsap.timeline();
      
  
      tl.fromTo(
        pngRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      ).fromTo(
        textRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "-=0.5" // Starts second animation slightly before the first finishes
      );
  
      return () => {
        tl.kill();
      };
    }, []);
  
      return (
        <div className="hero flex justify-around md:p-5 lg:p-10 lg:pt-10 md:gap-y-10 items-center ">
  
          <div ref={textRef} className="hero-text md:text-center flex-col justify-start">
  
            <h1 id='hero-text' className="lg:text-4xl xl:text-7xl md:text-3xl md:text-center text-white font-bold">Meet Our Heros !</h1>
  
            <h3 className="text-white text-2xl md:mt-1 ">& Say Goodbye To Joint Pains.</h3>
  
            
  
              <button className="bg-lime-400 lg:text-5xl md:text-2xl md:px-5 text-xl p-3 font-serif rounded-3xl lg:mt-16 md:mt-8 transition-transform duration-200 hover:scale-105 hover:bg-lime-300  ">Shop Now</button>
  
            
          </div>
  
  
          <div className="heri-img-byna-medicine">
            <Image
              src="/Heros-white.png"
              alt="byna medicine"
              width={1029}
              height={492}
              className="hero-img md:h-[250px] md:w-[600px] lg:w-[800px] lg:h-[380px] xl:w-[960px] xl:h-[440px]  "
              ref={pngRef}
            />
          </div>
        
        </div>
        
  
  
      );
}

export default Hero
