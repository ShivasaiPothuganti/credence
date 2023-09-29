import React from 'react'

function FooterSection() {
  return (
    <section className='h-[30vh] w-full bg-primaryBlack mt-10 p-6 ' >
        <h1 className='text-center font-md text-primaryWhite text-[3rem] ' >Credence</h1>
        <div className="footer-container mt-5 flex justify-between">

            <div className="footer-left w-[40%] text-primaryWhite flex gap-5 text-lg ">
                <a className='  hover:border-t-2 border-primaryPurple' href="#hero">Overview</a>
                <a className='  hover:border-t-2 border-primaryPurple' href="#about">About</a>
                <a className='  hover:border-t-2 border-primaryPurple' href="#services">Services</a>
                <a className='  hover:border-t-2 border-primaryPurple' href="#developerinfo">Developers</a>
            </div>

            <div className="footer-right w-[40%]">
                <h1 className='text-primaryWhite text-lg' >
                    For inquiries, support, or to learn more about our product, please contact us.
                    Thank you for choosing Credence.
                </h1>
            </div>

        </div>
    </section>
  )
}

export default FooterSection