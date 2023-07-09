import React, { useState } from 'react'
import LanguageDropdown from './CustomOption'
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'

export const Filters = ({ showFilter, setShowFilter, setMaxPrice1 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
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

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
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
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="bg-white border border-gray-300 rounded shadow-lg p-4 relative">
              <div className="flex justify-between items-center mb-4">
                <SearchBar />
                <button
                  className="text-gray-600 hover:text-gray-800 absolute top-0 right-0"
                  onClick={toggleSearch}
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
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
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
        <div className="relative inline-block ">
          <button
            className="bg-red-500 hover:bg-orange-500 text-white font-bold py-2  rounded flex items-center fixed top-0 right-20 px-5"
            onClick={toggleSearch}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
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

{
  /* <div className="py-1 ">
                <span className="font-bold">
                  {' '}
                  {country === 'IL' ? 'מחיר' : '   Price'}
                </span>

                <button
                  className={`block w-full ${
                    country === 'IL' ? 'text-right' : ' text-left '
                  } px-2 py-2 text-gray-800  ${
                    selectedFilter === 'SALE_PRICE_ASC'
                      ? 'bg-gray-800 text-white rounded'
                      : ''
                  }`}
                  onClick={() => setSelectedFilter('SALE_PRICE_ASC')}
                >
                  {country === 'IL' ? 'מנמוך לגבוה' : ' Low to High'}
                </button>
                <button
                  className={`block w-full ${
                    country === 'IL' ? 'text-right' : ' text-left '
                  } px-2 py-2 text-gray-800   ${
                    selectedFilter === 'SALE_PRICE_DESC'
                      ? 'bg-gray-800 text-white rounded'
                      : ''
                  }`}
                  onClick={() => setSelectedFilter('SALE_PRICE_DESC')}
                >
                  {country === 'IL' ? 'מגבוה לנמוך' : '   High to Low'}
                </button>
                <div className="flex items-center  py-2">
                  {country === 'IL' ? (
                    <>
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-800 hover:text-blue  md:flex justify-end "
                        id="items-per-page"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                      </select>{' '}
                      <label
                        htmlFor="items-per-page"
                        className="text-right  w-full"
                      >
                        :כמות מוצרים בעמוד
                      </label>
                    </>
                  ) : (
                    <>
                      {' '}
                      <label
                        htmlFor="items-per-page"
                        className="text-left mr-2"
                      >
                        Items per page:
                      </label>
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-800 hover:text-blue"
                        id="items-per-page"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                      </select>
                    </>
                  )}
                </div> */
}
{
  /* {country === 'IL' ? (
                  <>
                    <div className="flex items-center py-2 ">
                      <input
                        type="number"
                        id="min-price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border border-gray-300 roundedpy-1 text-gray-800"
                      />
                      <label
                        htmlFor="min-price"
                        className={`text-${
                          country === 'IL' ? 'right' : 'left'
                        } `}
                      >
                        :החל מ
                      </label>
                    </div>
                    <div className="flex items-center py-2 md:flex justify-end">
                      <input
                        type="number"
                        id="max-price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border border-gray-300 rounded  py-1 text-gray-800"
                      />
                      <label htmlFor="max-price" className="w-full ">
                        :עד
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    {' '}
                    <div className="flex items-center px-2 py-2">
                      <label
                        htmlFor="min-price"
                        className={`text-${
                          country === 'IL' ? 'right' : 'left'
                        } mr-2`}
                      >
                        Min Price:
                      </label>
                      <input
                        type="number"
                        id="min-price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-gray-800"
                      />
                    </div>
                         </>
                )} */
}
// </div>
