"use client"
import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Fire = () => {
  const [size, setSize] = useState({ width: 25, height: 25 });

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth > 768 ? 50 : 25;
      setSize({ width: newSize, height: newSize });
    };

    handleResize(); // set size on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DotLottieReact
      src="https://lottie.host/a2f1e5a3-771d-442d-b7f6-a4984058bd63/VJEc3kxTbG.lottie"
      loop
      autoplay
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    />
  );
};
