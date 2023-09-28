import React from 'react';
import ServiceCard from './ServiceCard/ServiceCard';
import CollaborativeRoomsAnimation from '@/assets/lottie_animations/CollaborativeRoomsAnimation.json';
import TransactionListAnimation from '@/assets/lottie_animations/transactionListAnimation.json';
import SplitBillAnimation from '@/assets/lottie_animations/SplitBillAnimation.json';
function ServicesSection() {
  return (
    <section id="services" className='h-screen w-screen p-10' >

        

        <div className="services-section-info text-center">
            <h1 className='font-medium text-6xl mb-10' >Our Services</h1>
            <p className='text-lg' >Foster financial mastery with our suite of premium solutions: Seamlessly manage expenses, ensure transparent bill sharing, and access advanced financial analytics. Elevate your financial acumen with our regal platform, meticulously crafted to guide your journey to fiscal triumph.</p>
        </div>

        <div className="services-section-cards w-full flex mt-10 relative ">
            <div className="backgroundbox h-[21rem] w-[21rem] top-[-4rem] left-0 z-[-1] absolute rounded-full bg-primaryPurple "></div>
            <div className="backgroundbox rounded-2xl h-[5rem] w-[5rem] -rotate-12 z-[-1] bottom-0 right-0 absolute bg-primaryPurple "></div>
            <div className="services-section-cards-container flex-wrap flex justify-evenly w-full">
                <ServiceCard 
                    lottieFile={TransactionListAnimation} 
                    title="Track expenses" 
                    description="Effortlessly monitor your expenditures with precision and clarity. Our expense tracking service simplifies financial record-keeping, ensuring you stay in control of your finances." 
                />
                <ServiceCard 
                    lottieFile={SplitBillAnimation} 
                    title="Split Bills" 
                    description="Experience seamless collaboration with our transparent bill splitting service. Whether among friends or colleagues, easily distribute expenses and settle bills equitably, enhancing financial harmony"
                />
                <ServiceCard 
                    lottieFile={CollaborativeRoomsAnimation} 
                    title="Collaborative rooms" 
                    description="Streamline financial collaboration in a shared virtual space with transparent group transactions, simplifying expense management and bill splitting for a transparent record-keeping experience"
                />
            </div>
        </div>

    </section>
  )
}

export default ServicesSection