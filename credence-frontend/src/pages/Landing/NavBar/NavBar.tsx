import React from 'react';
import './NavBar.css';
import { Button } from '@/components/ui/button';

function NavBar() {
  return (
    <nav className='h-[8vh] w-[100vw] p-3 flex '  >
        <div className="brand-text flex-[0.3] ">
            <h1 className='font-logo text-[2rem] ' >Credence</h1>
        </div>
        <div className="nav-links flex-[0.4] flex justify-center gap-16 items-center ">
            <a className='nav-link'  href="" >overview</a>
            <a className='nav-link' href="">about</a>
            <a className='nav-link' href="">services</a>
            <a className='nav-link' href="">developer</a>
        </div>
        <div className=" justify-end items-center authorization-links flex flex-[0.3] gap-5 ">
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