import React from 'react'
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
  
    useEffect(() => {
      const tl = gsap.timeline();
      
  
      tl.fromTo(
        textRef1.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      ).fromTo(
        textRef2.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5" // Starts second animation slightly before the first finishes
      );
  
      return () => {
        tl.kill();
      };
    }, []);
  
      return (
        <div className="hero flex justify-evenly  pt-10 items-center    ">
  
          <div ref={textRef1} className="hero-text flex-col justify-start">
  
            <h1 id='hero-text' className="text-7xl text-white font-bold">Meet Our Heros !</h1>
  
            <h3 className="text-white text-2xl ">& Say Goodbye To Joint Pains.</h3>
  
            <div className="shop-now-btn ">
  
              <button className="bg-lime-400 text-5xl p-3 font-serif rounded-3xl mt-16 transition-transform duration-200 hover:scale-105 hover:bg-lime-300  ">Shop Now</button>
  
            </div>
          </div>
  
  
          <div className="heri-img-byna-medicine">
            <Image
              src="/Heros-white.png"
              alt="byna medicine"
              width={1029}
              height={492}
              className="hero-img"
              ref={textRef2}
            />
          </div>
        
        </div>
        
  
  
      );
}

export default Hero
