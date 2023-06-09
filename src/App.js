import './App.css'
import { Navbar } from './components/Navbar'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

function App() {
  const [country, setCountry] = useState('USA')

  return (
    <div className="App">
      <Navbar setCountry={setCountry} country={country} />

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact
            element={React.cloneElement(route.component, {
              country,
              setCountry,
            })} // Pass the country as a prop
            path={route.path}
          />
        ))}
      </Routes>
    </div>
  )
}

export default App
