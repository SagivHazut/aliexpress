import '../App.css'
import React, { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom'
import logonobackground from '../image/logonobackground.png'
import { LiaYoutube } from 'react-icons/lia'
import { useDispatch } from 'react-redux'
import SearchBar from './SearchBar'
import '../css/button.css'
import LoadingSpinner from './LoadingSpinner'

export const Navbar = ({ country, isVisible }) => {
  const dispatch = useDispatch()

  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [sideBar, setSideBar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showInput, setShowInput] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const isVideoScrollPage = location.pathname === '/VideoScroll'
  const [isToggled, setIsToggled] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem('isToggled'))
    return storedValue !== null ? storedValue : {}
  })

  const [navigation, setNavigation] = useState([
    {
      name: 'Hot Deals',
      href: '/top-products',
      state: 'isToggled',
      onClick: () => handleToggle('isToggled', '6,30,34', 'top-products'),
    },

    {
      name: 'SuperDeals',
      href: '/SuperDeals',
      state: 'isToggled1',
      onClick: () =>
        handleToggle('isToggled1', '320,3,100001205', 'SuperDeals'),
    },
    {
      name: 'Featured Products',
      href: '/Featured',
      state: 'isToggled3',
      onClick: () =>
        handleToggle(
          'isToggled3',
          '200048142,200000920,200003782,100000041',
          'Featured Products'
        ),
    },
    {
      name: 'Our Recommendation',
      href: '/Recommendation',
      state: 'isToggled4',
      onClick: () => handleToggle('isToggled4'),
    },
    {
      name: 'Banggood',
      href: '/Banggood',
      state: 'isToggled5',
      onClick: () => handleToggle('isToggle5'),
    },
    {
      name: 'Check for discount',
      href: '/LinkChecker',
      state: 'isToggled6',
      onClick: () => handleToggle('isToggled6'),
    },
  ])
  const [dropdownNav, setDropdownNav] = useState([
    {
      name: 'Sport',
      href: '/Sport',
      state: 'isToggled5',
      onClick: () =>
        handleOptionSelect(
          '201768104,200003274,200004217,200004217,200297143',
          'Sport'
        ),
    },
    {
      name: 'Kids',
      href: '/Kids',
      state: 'isToggled1',
      onClick: () => handleOptionSelect('1501,26,21', 'Kids'),
    },
    {
      name: 'Women',
      href: '/Women',
      state: 'isToggled3',
      onClick: () =>
        handleOptionSelect(
          '200133142,200000854,200003494,200000345,201336907,201169002',
          'Women'
        ),
    },
    {
      name: 'Men',
      href: '/Men',
      state: 'isToggled4',
      onClick: () =>
        handleOptionSelect(
          '200131145,142003,200003955,12503,200003495,200000343',
          'Men'
        ),
    },
    {
      name: 'House',
      href: '/House',
      state: 'isToggled4',
      onClick: () =>
        handleOptionSelect(
          '200294142,6,628,100000039,100000308,405,1541',
          'House'
        ),
    },
  ])

  const toggleSearch = () => {
    setShowInput((prevShowInput) => !prevShowInput)
  }
  const toggleSidebar = () => {
    setSideBar(!sideBar)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    let isIL = country === 'IL'

    if (isIL) {
      setNavigation((prevNavigation) => {
        const updatedNavigation = prevNavigation.map((item) => {
          if (item.name === 'Hot Deals') {
            return { ...item, name: 'מבצעים חמים' }
          } else if (item.name === 'SuperDeals') {
            return { ...item, name: 'הנבחרים' }
          } else if (item.name === 'Featured Products') {
            return { ...item, name: 'מוצרים מומלצים' }
          } else if (item.name === 'Our Recommendation') {
            return { ...item, name: 'המלצתנו' }
          }
          return item
        })
        return updatedNavigation
      })

      setDropdownNav((prevDropdownNav) => {
        const updatedDropdownNav = prevDropdownNav.map((item) => {
          if (item.name === 'Sport') {
            return { ...item, name: 'ספורט' }
          } else if (item.name === 'Kids') {
            return { ...item, name: 'ילדים' }
          } else if (item.name === 'Women') {
            return { ...item, name: 'נשים' }
          } else if (item.name === 'Men') {
            return { ...item, name: 'גברים' }
          } else if (item.name === 'House') {
            return { ...item, name: 'בית' }
          }
          return item
        })
        return updatedDropdownNav
      })
    } else {
      setNavigation((prevNavigation) => {
        const updatedNavigation = prevNavigation.map((item) => {
          if (item.name === 'מבצעים חמים') {
            return { ...item, name: 'Hot Deals' }
          } else if (item.name === 'הנבחרים') {
            return { ...item, name: 'SuperDeals' }
          } else if (item.name === 'מוצרים מומלצים') {
            return { ...item, name: 'Featured Products' }
          } else if (item.name === 'המלצתנו') {
            return { ...item, name: 'Our Recommendation' }
          }
          return item
        })
        return updatedNavigation
      })

      setDropdownNav((prevDropdownNav) => {
        const updatedDropdownNav = prevDropdownNav.map((item) => {
          if (item.name === 'ספורט') {
            return { ...item, name: 'Sport' }
          } else if (item.name === 'ילדים') {
            return { ...item, name: 'Kids' }
          } else if (item.name === 'נשים') {
            return { ...item, name: 'Women' }
          } else if (item.name === 'גברים') {
            return { ...item, name: 'Men' }
          } else if (item.name === 'בית') {
            return { ...item, name: 'House' }
          }
          return item
        })
        return updatedDropdownNav
      })
    }
  }, [country, setNavigation, setDropdownNav])

  useEffect(() => {
    localStorage.setItem('isToggled', JSON.stringify(isToggled))
  }, [isToggled])

  const handleToggle = (state, category_ids, name) => {
    setIsToggled((prevState) => ({
      ...prevState,
      [state]: !prevState[state],
    }))
    setSideBar(false)
    setIsOpen(false)
    dispatch({
      type: 'UPDATE_PARAMS',
      payload: {
        category_ids: category_ids,
        name: name,
      },
    })
  }

  const clearOtherStates = (currentState) => {
    Object.keys(isToggled).forEach((key) => {
      if (key !== currentState) {
        setIsToggled((prevState) => ({ ...prevState, [key]: false }))
      }
    })
  }
  const handleOptionSelect = (categoryIds, name) => {
    setIsOpen(false)
    handleDropdownSelect(categoryIds, name)
  }

  const handleDropdownSelect = (categoryIds, name) => {
    setIsToggled((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }))
    dispatch({
      type: 'UPDATE_PARAMS',
      payload: {
        category_ids: categoryIds,
        name: name,
      },
    })
  }

  const isCurrent = (href) => {
    return location.pathname === href
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div>
        {loading && (
          <div className="loading-overlay">
            <LoadingSpinner />
          </div>
        )}
      </div>

      <Disclosure
        as="nav"
        className={`navbar ${
          isVideoScrollPage
            ? ' '
            : isVisible
            ? 'slide-in bg-gray-900 semicircle'
            : 'slide-out bg-gray-900 semicircle'
        } `}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
              <div className=" relative flex h-20 items-center justify-center">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button
                    className=" top-5 left-4 z-50 text-2xl text-white  hover:text-white focus:outline-none ring-2 focus:ring-inset ring-white inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 "
                    onClick={toggleDropdown}
                  >
                    {open ? (
                      <XMarkIcon className="h-6 w-6 " />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>

                <div
                  className={
                    !isDesktop
                      ? 'flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'
                      : 'flex  items-center justify-center sm:items-stretch sm:justify-start'
                  }
                >
                  <div className="flex flex-shrink-1 items-center z-50 mx-auto">
                    <div className="relative right-16 flex items-center">
                      <NavLink
                        onClick={() => clearOtherStates()}
                        to="/VideoScroll"
                      >
                        {!isDesktop && !isCurrent('/VideoScroll') ? (
                          <div className="text-gray-100 hover:bg-gray-900 hover:text-white animated-youtube-icon rounded-md px-1 py-1 text-sm font-medium top-2">
                            <LiaYoutube className="h-auto w-10 text-gray-200" />
                          </div>
                        ) : (
                          <div className=" relative right-12 w-12"></div>
                        )}
                      </NavLink>
                    </div>

                    <div
                      className={
                        isVideoScrollPage
                          ? 'relative right-6 top-0'
                          : !isDesktop
                          ? 'relative right-6 top-14'
                          : 'absolute flex items-center justify-center inset-0 top-24'
                      }
                    >
                      <NavLink onClick={() => clearOtherStates()} to="/">
                        <img
                          className="block h-12 w-auto lg:hidden z-50"
                          src={logonobackground}
                          alt="Your Company"
                        />
                        <img
                          className="hidden h-14 w-18 lg:block z-50"
                          src={logonobackground}
                          alt="Your Company"
                        />
                      </NavLink>
                    </div>
                  </div>

                  <div className="relative hidden sm:ml-10 sm:block right-4 ">
                    <div className="flex space-x-9 ">
                      {navigation.map((item) => (
                        <NavLink
                          onClick={item.onClick}
                          key={item.name}
                          to={item.href}
                          className={`navbar-font-bold ${
                            isCurrent(item.href)
                              ? 'bg-orange-500 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          } rounded-md px-3 py-2 text-sm font-medium `}
                          aria-current={
                            isCurrent(item.href) ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <div className="relative">
                        <div className="relative inline-block">
                          <button
                            className={`text-gray-400 hover:bg-gray-700 hover:text-white py-2 px-4 rounded flex items-center focus:outline-none ${
                              isOpen ? 'bg-gray-600 text-white' : ''
                            }`}
                            onClick={toggleDropdown}
                          >
                            <span className="mr-2 text-white">
                              {country === 'IL' ? 'קטגוריות' : 'Categories'}
                            </span>
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
                            <div className="absolute mt-2 w-48 bg-red-500 border border-gray-900 rounded shadow-lg z-10 ">
                              <ul className="py-1">
                                {dropdownNav.map((item) => (
                                  <li key={item.name}>
                                    <NavLink
                                      onClick={item.onClick}
                                      to={item.href}
                                      className={`${
                                        isCurrent(item.href)
                                          ? 'bg-orange-500 text-white'
                                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                      } block rounded-md px-3 py-2 text-base font-medium`}
                                      aria-current={
                                        isCurrent(item.href)
                                          ? 'page'
                                          : undefined
                                      }
                                    >
                                      {item.name}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel>
              <aside
                className={`fixed top-0 left-0 h-screen w-52 bg-red-500 text-white transition-transform transform ${
                  isOpen ? 'translate-x-0' : '-translate-x-full'
                } z-40`}
              >
                <nav className="py-8">
                  <ul className="space-y-4">
                    <div className="relative">
                      {isOpen && (
                        <div className="absolute mt-10 left-2/4 transform -translate-x-1/2 w-22 bg-red-500 border border-red-500 rounded shadow-lg z-10">
                          {navigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as={NavLink}
                              to={item.href}
                              onClick={item.onClick}
                              className={`${
                                isCurrent(item.href)
                                  ? 'bg-orange-500 text-white '
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              } block rounded-md px-3 py-2 text-base font-medium rounded shadow-lg`}
                              aria-current={
                                isCurrent(item.href) ? 'page' : undefined
                              }
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                          <div className="relative">
                            <div className="relative inline-block">
                              <button
                                className={`text-gray-400 hover:bg-gray-700 hover:text-white py-2 px-4 rounded flex items-end focus:outline-none ${
                                  sideBar ? 'bg-gray-600 text-white' : ''
                                }`}
                                onClick={toggleSidebar}
                              >
                                <span className="block rounded-md px-3 py-2 text-base font-medium focus:outline-none text-white ">
                                  {country === 'IL' ? 'קטגוריות' : 'Categories'}
                                </span>
                                <svg
                                  className={`w-4 h-4 transition-transform duration-100 transform ${
                                    sideBar ? 'rotate-180' : ''
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
                          {sideBar && (
                            <ul className="py-1">
                              {dropdownNav.map((item) => (
                                <li key={item.name}>
                                  <Disclosure.Button
                                    key={item.name}
                                    as={NavLink}
                                    to={item.href}
                                    onClick={item.onClick}
                                    className={`${
                                      isCurrent(item.href)
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } block rounded-md px-10 py-2 text-base font-medium rounded shadow`}
                                    aria-current={
                                      isCurrent(item.href) ? 'page' : undefined
                                    }
                                  >
                                    {item.name}
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </ul>
                </nav>
              </aside>
            </Disclosure.Panel>

            <div className="fixed top-2 right-24 z-50">
              <div className="relative inline-block">
                <div className="search-box items-center px-5 rounded flex text-white font-bold py-2">
                  <label htmlFor="searchInput">
                    <button className="btn-search" onClick={toggleSearch}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </label>
                  <div
                    className={`left-7 flex relative ${
                      showInput ? 'show-input' : ''
                    }`}
                  >
                    <SearchBar
                      setLoading={setLoading}
                      setError={setError}
                      error={error}
                      showInput={showInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar
