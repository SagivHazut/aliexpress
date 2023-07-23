import React, { useState } from 'react'
import LanguageDropdown from './CustomOption'
import { useSelector } from 'react-redux'

export const Filters = ({ showFilter, setShowFilter, setMaxPrice1 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [maxPrice, setMaxPrice] = useState('')
  const [applyCountry, setApplyCountry] = useState('')
  const visible = useSelector((state) => state.visible)
  const [country, setCountry] = useState(
    localStorage.getItem('country') || 'USA'
  )
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    setShowFilter(!showFilter)
  }
  const handleMaxMin = () => {
    localStorage.setItem('country', applyCountry)
    setShowFilter(false)
    setIsOpen(false)
    setMaxPrice1(maxPrice)
    window.location.reload()
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white border border-gray-300 rounded shadow-lg p-4 mx-auto">
            <div className="flex justify-between items-center mb-4">
              {country === 'IL' ? (
                <>
                  {' '}
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleDropdown}
                  >
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
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>{' '}
                  </button>{' '}
                  <h2 className="text-lg font-bold md:flex justify-center  ">
                    {country === 'IL' ? 'סינון' : 'Filter'}
                  </h2>
                </>
              ) : (
                <>
                  {' '}
                  <h2 className="text-lg font-bold md:flex justify-center  ">
                    {country === 'IL' ? 'סינון' : 'Filter'}
                  </h2>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleDropdown}
                  >
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
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>{' '}
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center px-2 py-2">
              <label htmlFor="max-price" className="text-left mr-2">
                Max Price:
              </label>
              <input
                type="number"
                id="max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-gray-800"
              />
            </div>

            <LanguageDropdown
              setCountry={setCountry}
              country={country}
              setApplyCountry={setApplyCountry}
              applyCountry={applyCountry}
            />

            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMaxMin}
              >
                {country === 'IL' ? 'שמור' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`navbar ${
          visible ? 'slide-in' : 'slide-out'
        } fixed top-5 right-4 flex items-center `}
        style={{ zIndex: '9000' }}
      >
        {window.location.pathname === '/Recommendation' ? (
          <div className="relative inline-block py-20"></div>
        ) : (
          <div className="relative inline-block">
            <button
              className="bg-red-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={toggleDropdown}
            >
              {country === 'IL' ? 'סינון' : 'Filter'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
