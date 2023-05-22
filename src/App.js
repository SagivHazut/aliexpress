import './App.css'
import { Navbar } from './components/Navbar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact
            element={route.component}
            path={route.path}
          />
        ))}
      </Routes>{' '}
    </div>
  )
}

export default App


// amazon affiliate sport01e3-20