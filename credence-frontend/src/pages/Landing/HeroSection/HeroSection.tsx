import React from 'react';
import Player from "react-lottie-player";
import HeroAnimation from '@/assets/lottie_animations/HeroSectionAnimation.json';
import { Button } from '@/components/ui/button';

function HeroSection() {



  return (
    <section id="hero" className='bg-primaryWhite h-screen w-screen flex justify-items-end p-7' >
        <div className="hero-section-left h-full flex-[0.5] items-center flex justify-start">
            <div className="hero-section-container w-[35rem] flex flex-col gap-14 ">
				
				<div className="hero-section-infocontainer relative z-[2] ">
				<div className="absolute h-10 w-48 z-[-1] opacity-80 bg-primaryPurple rounded-lg top-0 left-0 "></div>
				<div className="absolute h-24 w-24 rotate-12 z-[-1] rounded-lg bg-primaryPurple bottom-[-1rem] right-[-1rem] "></div>
					<h1 className='text-9xl font-medium font-primary mb-[3rem] text-primaryBlack ' >Credence</h1>
					<h3 className='text-4xl font-primary text-gray-800 mb-[2rem] text-primaryBlack ' >Your personal expense manager</h3>
					<p className='font-primary leading-7 text-secondaryText ' > Introducing Credence – the epitome of effortless expense management, 
						transparent group transactions, 
						and sophisticated financial analytics. 
						Seamlessly oversee your expenses, divide bills, and receive timely reminders 
						for upcoming commitments. Our refined platform prioritizes your financial 
						security, catering to individuals and groups alike. 
						Elevate your financial management experience with Credence . 
					</p>
				</div>
				<div className="hero-section-btngroup flex gap-10 ">
					<Button size={'lg'} >Get started</Button>
					<Button size={'lg'} >Explore</Button>
				</div>
			</div>
        </div>
        <div className="hero-section-right h-full flex-[0.5] flex justify-center items-center">
            <Player animationData={HeroAnimation} style={{
                height:'40rem'
            }} loop play />  
        </div>
    </section>
  )
}

export default HeroSection;