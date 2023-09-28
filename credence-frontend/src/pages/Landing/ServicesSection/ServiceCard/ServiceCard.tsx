import React from 'react';
import Player from 'react-lottie-player';

type Services = {
    lottieFile:object,
    title:string,
    description:string,
}

function ServiceCard({lottieFile,title,description}:Services) {
  return (
    <div className='h-[32rem] w-80 p-5 rounded-lg bg-primaryBlack shadow-2xl' >
        <div className="servicecard-top h-[45%] w-full  flex items-center justify-center ">
            <Player 
            play 
            loop 
            style={
                {
                    height:'220px',
                    width:'300px',
                }
            }
            
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            animationData={lottieFile} />
        </div>
        <div className="servicecard-bottom mt-10  pl-2 pr-2 pb-2 ">
            <div className="servicecard-bottom">
            <h1 className=' font-bold text-center text-2xl text-primaryWhite mb-5 ' >{title}</h1>
            <p className='text-md text-primaryWhite' > {description} </p>
        </div>
        </div>
    </div>
  )
}

export default ServiceCard