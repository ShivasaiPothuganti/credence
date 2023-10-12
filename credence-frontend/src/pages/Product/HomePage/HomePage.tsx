import { Outlet } from 'react-router-dom'
import NavigationPanel from '../NavigationPanel/NavigationPanel'

function HomePage() {
  return (
    <section className='h-screen w-full flex' >
        <div className="navpanel-section flex-[0.15]">
          <NavigationPanel/>
        </div>
        <div className="product-router-outlet flex-[0.85]">
          <Outlet />
        </div>
    </section>
  )
}

export default HomePage