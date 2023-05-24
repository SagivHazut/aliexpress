import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Dropdown = ({ options, onSelect, isNavbarOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  const isCurrent = (href) => {
    return location.pathname === href
  }

  return (
    <div className="relative inline-block">
      <button
        className={`text-gray-400 hover:bg-gray-700 hover:text-white py-2 px-4 rounded flex items-center focus:outline-none ${
          isOpen ? 'bg-gray-600 text-white' : ''
        }`}
        onClick={toggleDropdown}
      >
        <span className="mr-2 text-white">Dropdown</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-gray-900 border border-gray-900 rounded shadow-lg z-10 ">
          <ul className="py-1">
            {options.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => handleOptionSelect(item.value)}
                  to={item.href}
                  className={`${
                    isCurrent(item.href)
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
