import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import AboutSection from './About/AboutSection';
import NavBar from './NavBar/NavBar';
import ServicesSection from './ServicesSection/ServicesSection';
import DeveloperSection from './DeveloperSection/DeveloperSection';
import FooterSection from './FooterSection/FooterSection';

function LandingPage() {

  console.log(import.meta.env)
  return (
    <>
      <NavBar />
      <HeroSection /> 
      <AboutSection />
      <ServicesSection  />
      <DeveloperSection/>
      <FooterSection />
    </>
  )
}

export default LandingPage;