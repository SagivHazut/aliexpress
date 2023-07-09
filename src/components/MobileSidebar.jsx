import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from './Navbar'

const MobileSidebar = () => {
  const [sideBar, setSideBar] = useState(false)

  const toggleSidebar = () => {
    setSideBar(!sideBar)
  }

  return (
    <div className="relative flex h-20 items-center justify-between bg-red-500">
      <button
        className="fixed top-7 left-4 z-50 text-2xl text-white"
        onClick={toggleSidebar}
      >
        {sideBar ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-red-500 text-white transition-transform transform ${
          sideBar ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <nav className="py-8">
          {/* Your navigation links */}
          <ul className="space-y-4">
            <li>
              <a className="block px-4 py-2" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="block px-4 py-2" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="block px-4 py-2" href="#services">
                Services
              </a>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

const useMobileSidebar = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust the breakpoint as needed
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  console.log(isMobile)

  return isMobile
}
export default () => {
  const isMobile = useMobileSidebar()

  return isMobile ? <MobileSidebar /> : <Navbar />
}
