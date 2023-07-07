import './App.css'
import { Navbar } from './components/Navbar'
import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './routes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVisible } from './store/actions'
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

  return (
    <div className="App">
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
