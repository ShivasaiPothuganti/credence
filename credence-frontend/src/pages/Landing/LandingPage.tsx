import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import AboutSection from './About/AboutSection';
import NavBar from './NavBar/NavBar';
import ServicesSection from './ServicesSection/ServicesSection';

function LandingPage() {
  return (
    <>
      <NavBar />
      <HeroSection /> 
      <AboutSection />
      <ServicesSection  />
    </>
  )
}

export default LandingPage;