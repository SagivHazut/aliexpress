import './App.css'
import { Navbar } from './components/Navbar'
import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './routes'
import { useEffect } from 'react'

function App() {
  const [country, setCountry] = useState(
    localStorage.getItem('country') || 'USA'
  )
  useEffect(() => {
    const storedCountry = localStorage.getItem('country')
    if (storedCountry) {
      setCountry(storedCountry)
    }
  }, [])
  const [searchRes, setSearchRes] = useState(false)

  return (
    <div className="App">
      <Navbar setCountry={setCountry} country={country} />

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
                  setSearchRes,
                  searchRes,
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
