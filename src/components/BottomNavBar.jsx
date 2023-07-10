import React from 'react'
import { FaVideo, FaImages } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import '../App.css'

const BottomNavBar = () => {
  const location = useLocation()

  const isCurrent = (href) => {
    return location.pathname === href
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-200 flex justify-around p-4">
      <NavLink
        to="/VideoScroll"
        className={`${
          isCurrent('/VideoScroll')
            ? 'rounded-s border border-orange-500 p-1 '
            : 'text-gray-100 hover:bg-gray-100 hover:text-white animated-youtube-icon'
        } text-gray-600`}
      >
        <FaVideo className="h-6 w-6" />
      </NavLink>

      <NavLink
        to="/UnordinaryPicsComponent"
        className={`${
          isCurrent('/UnordinaryPicsComponent')
            ? 'rounded-s border border-orange-500 p-1 '
            : 'text-gray-100 hover:bg-gray-100 hover:text-white animated-youtube-icon'
        } text-gray-600`}
      >
        <FaImages className="h-6 w-6" />
      </NavLink>
    </nav>
  )
}

export default BottomNavBar
