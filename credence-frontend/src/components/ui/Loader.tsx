import React from 'react'
import Player from "react-lottie-player";
import LoaderAnimation from "@/assets/lottie_animations/LoaderAnimation.json";
function Loader() {
  return (
    <section className='h-full w-full flex justify-center items-center' >
        <Player 
            play
            loop
            animationData={LoaderAnimation}
            style={
                {
                    height:'30%',
                    width:'30%'
                }
            }
        />
    </section>
  )
}

export default Loader