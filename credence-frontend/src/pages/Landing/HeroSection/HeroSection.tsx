import React from 'react';
import Player from "react-lottie-player";
import HeroAnimation from '@/assets/lottie_animations/HeroSectionAnimation.json';

function HeroSection() {



  return (
    <div className='h-screen w-[50vw] bg-primaryPurple flex justify-items-end' >
        <div className="hero-section-left h-full flex-[0.5] flex justify-center">
                <h1></h1>
        </div>
        <div className="hero-section-right h-full flex-[0.5] flex justify-center items-center">
            <Player animationData={HeroAnimation} style={{
                height:'0rem'
            }} loop play />  
        </div>
    </div>
  )
}

export default HeroSection;