import { Outlet } from 'react-router-dom'
import NavigationPanel from '../NavigationPanel/NavigationPanel'

function HomePage() {
  return (
    <section className='h-screen w-screen flex bg-primaryWhite' >
        <NavigationPanel/>
        <Outlet />
    </section>
  )
}

export default HomePage