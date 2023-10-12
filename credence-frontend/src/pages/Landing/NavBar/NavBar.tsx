import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { Button } from '@/components/ui/button';
import { createSearchParams } from 'react-router-dom';


function NavBar() {

  const navigate = useNavigate();

  return (
    <nav className='h-[8vh] w-[100%] p-3 flex '  >
        <div className="brand-text flex-[0.3] ">
            <h1 className='font-logo text-[2rem] text-primaryBlack ' >Credence</h1>
        </div>
        <div className="nav-links flex-[0.4] flex justify-center gap-16 items-center ">
            <a className='nav-link'  href="#hero" >Overview</a>
            <a className='nav-link' href="#about">About</a>
            <a className='nav-link' href="#services">Services</a>
            <a className='nav-link' href="#developerinfo">Developers</a>
        </div>
        <div className=" justify-end items-center authorization-links flex flex-[0.3] gap-6 ">
            <Button onClick={()=>{
              navigate({
				pathname:'/authenticate',
				search:`${createSearchParams({
					mode:'login'
				})}`
			  })
            }} >Login</Button>
            <Button onClick={()=>{navigate({
				pathname:'/authenticate',
				search:`${createSearchParams({
					mode:'register'
				})}`
			})}} >Register</Button>
        </div>
    </nav>
  )
}


export default NavBar