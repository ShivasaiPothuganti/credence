import React from 'react';
import './NavBar.css';
import { Button } from '@/components/ui/button';

function NavBar() {
  return (
    <nav className='h-[8vh] w-[100vw] p-3 flex '  >
        <div className="brand-text flex-[0.3] ">
            <h1 className='font-logo text-[2rem] text-primaryBlack ' >Credence</h1>
        </div>
        <div className="nav-links flex-[0.4] flex justify-center gap-16 items-center ">
            <a className='nav-link'  href="#hero" >Overview</a>
            <a className='nav-link' href="#about">About</a>
            <a className='nav-link' href="">Services</a>
            <a className='nav-link' href="">Developer</a>
        </div>
        <div className=" justify-end items-center authorization-links flex flex-[0.3] gap-6 ">
            <Button>Login</Button>
            <Button>Register</Button>
        </div>
    </nav>
  )
}

/**
 * overview
 * about
 * services
 * developer
 */

export default NavBar