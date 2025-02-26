import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <div className=' d-flex flex-column h-100 justify-content-between'>
   <Navbar />
   <Outlet />
   <Footer />
    </div>
  )
}
