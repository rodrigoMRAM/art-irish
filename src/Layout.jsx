import React from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Footer } from './components/layout/Footer'
import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <div className=' d-flex flex-column h-100 justify-content-between'>
   <Sidebar />
   <Outlet />
   <Footer />
    </div>
  )
}
