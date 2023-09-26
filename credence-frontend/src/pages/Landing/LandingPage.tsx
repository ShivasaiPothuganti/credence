import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import AboutSection from './About/AboutSection';

function LandingPage() {
  return (
    <div>
      <HeroSection main />
      <AboutSection />
    </div>
  )
}

export default LandingPage;