import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Fire = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/a2f1e5a3-771d-442d-b7f6-a4984058bd63/VJEc3kxTbG.lottie"
      loop
      autoplay
      style={{
        width: window.innerWidth > 768 ? "50px" : "25px",
        height: window.innerWidth > 768 ? "50px" : "25px",
      }}
      
    />
  );
};