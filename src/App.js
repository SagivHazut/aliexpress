import './App.css'
import { Navbar } from './components/Navbar'
import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './routes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVisible } from './store/actions'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

function App() {
  const [country, setCountry] = useState(
    localStorage.getItem('country') || 'USA'
  )
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)
  const dispatch = useDispatch()

  const visible = useSelector((state) => state.visible)

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    const isVisible = prevScrollPos > currentScrollPos

    setPrevScrollPos(currentScrollPos)
    dispatch(updateVisible(isVisible))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])
  useEffect(() => {
    const storedCountry = localStorage.getItem('country')
    if (storedCountry) {
      setCountry(storedCountry)
    }
  }, [])

  const [isVisible, setIsVisible] = useState(false)
  const handleScroll2 = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setIsVisible(scrollTop > 300)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll2)
    return () => window.removeEventListener('scroll', handleScroll2)
  }, [])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="App">
      <button
        onClick={scrollToTop}
        id="scrollButton"
        title="Go to top"
        style={{ display: isVisible ? 'block' : 'none' }}
        className="fixed bottom-16 right-4 z-50 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition-all"
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
      <Navbar setCountry={setCountry} country={country} isVisible={visible} />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact
            element={
              route.redirect ? (
                <Navigate to={route.redirect} />
              ) : (
                React.cloneElement(route.component, {
                  country,
                  setCountry,
                })
              )
            }
            path={route.path}
          />
        ))}
      </Routes>
    </div>
  )
}

export default App
