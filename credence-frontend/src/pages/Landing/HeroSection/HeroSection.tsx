import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import HeroAnimation from '@/assets/lottie_animations/HeroSectionAnimation.json';

function HeroSection() {
  return (
    <div className='h-[100vh] w-[100vw] bg-primaryWhite flex justify-items-end' >
        <div className="hero-section-left h-full flex-[0.5] flex justify-center">
            
        </div>
        <div className="hero-section-right h-full flex-[0.5] flex justify-center items-center">
            <Player
            autoplay
            loop
            src={HeroAnimation}
            className='h-[40rem] w-[90%]'
            />
        </div>
    </div>
  )
}

export default HeroSection;