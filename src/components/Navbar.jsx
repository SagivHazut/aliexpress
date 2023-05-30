import React, { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom'
import logonobackground from '../image/logonobackground.png'
import Dropdown from './Dropdown'

export const Navbar = () => {
  const [isToggled, setIsToggled] = useState(() =>
    JSON.parse(localStorage.getItem('isToggled'))
  )
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (DropdownNav) => {
    handleDropdownSelect(DropdownNav)
    setIsOpen(false)
  }

  const navigation = [
    {
      name: 'Hot Deals',
      href: '/',
      state: 'isToggled',
      onClick: () => handleToggle('isToggled'),
    },
    {
      name: 'Higher Commission',
      href: '/HigherCommission',
      state: 'isToggled1',
      onClick: () => handleToggle('isToggled1'),
    },
    {
      name: 'Featured Products',
      href: '/Featured',
      state: 'isToggled3',
      onClick: () => handleToggle('isToggled3'),
    },
    {
      name: 'Our Recommendation',
      href: '/Recommendation',
      state: 'isToggled4',
      onClick: () => handleToggle('isToggled4'),
    },
  ]

  const DropdownNav = [
    {
      name: 'Sport',
      href: '/Sport',
      state: 'isToggled',
      onClick: () => handleToggle('isToggled5'),
    },
    {
      name: 'Kids',
      href: '/Kids',
      state: 'isToggled1',
      onClick: () => handleToggle('isToggled6 '),
    },
    {
      name: 'Women',
      href: '/Women',
      state: 'isToggled3',
      onClick: () => handleToggle('isToggled7'),
    },
    {
      name: 'Men',
      href: '/Men',
      state: 'isToggled4',
      onClick: () => handleToggle('isToggled8'),
    },
    {
      name: 'House',
      href: '/House',
      state: 'isToggled4',
      onClick: () => handleToggle('isToggled9'),
    },
  ]

  useEffect(() => {
    localStorage.setItem('isToggled', JSON.stringify(isToggled))
  }, [isToggled])

  const handleToggle = (state) => {
    setIsToggled(state)
    clearOtherStates(state)
  }

  const clearOtherStates = (currentState) => {
    Object.keys(isToggled).forEach((key) => {
      if (key !== currentState) {
        setIsToggled((prevState) => ({ ...prevState, [key]: false }))
      }
    })
  }

  const isCurrent = (href) => {
    return location.pathname === href
  }

  const handleDropdownSelect = (selectedOption) => {
    handleToggle(selectedOption) // Set the selected option as the current state
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <NavLink onClick={() => clearOtherStates()} to="/homepage">
                    <div className="flex flex-shrink-1 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={logonobackground}
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-12 w-19 lg:block"
                        src={logonobackground}
                        alt="Your Company"
                      />
                    </div>
                  </NavLink>

                  <div className="hidden sm:ml-10 sm:block">
                    <div className="flex space-x-9">
                      {navigation.map((item) => (
                        <NavLink
                          onClick={item.onClick}
                          key={item.name}
                          to={item.href}
                          className={`${
                            isCurrent(item.href)
                              ? 'bg-gray-600 text-white'
                              : 'text-gray-100 hover:bg-gray-100 hover:text-white'
                          } rounded-md px-3 py-2 text-sm font-medium`}
                          aria-current={
                            isCurrent(item.href) ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <div className="relative">
                        <Dropdown
                          options={DropdownNav}
                          onSelect={handleDropdownSelect}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.href}
                    onClick={item.onClick}
                    className={`${
                      isCurrent(item.href)
                        ? 'bg-gray-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } block rounded-md px-3 py-2 text-base font-medium`}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="relative">
                  {isOpen && (
                    <div className="absolute mt-10 left-2/3 transform -translate-x-1/2 w-32 bg-gray-900 border border-gray-900 rounded shadow-lg z-10">
                      <ul className="py-1">
                        {DropdownNav.map((item) => (
                          <li key={item.name}>
                            <Disclosure.Button
                              onClick={() => handleOptionSelect(item.value)}
                              to={item.href}
                              className={`${
                                isCurrent(item.href)
                                  ? 'bg-gray-600 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              } block rounded-md px-10 py-2 text-base font-medium`}
                              aria-current={
                                isCurrent(item.href) ? 'page' : undefined
                              }
                            >
                              {item.name}
                            </Disclosure.Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="relative inline-block">
                    <button
                      className={`text-gray-400 hover:bg-gray-700 hover:text-white py-2 px-4 rounded flex items-end focus:outline-none ${
                        isOpen ? 'bg-gray-600 text-white' : ''
                      }`}
                      onClick={toggleDropdown}
                    >
                      <span className="mr-2 text-white">Categories</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-100 transform ${
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
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar
