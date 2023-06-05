import React, { useState, useEffect } from 'react'
import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

export const Filters = ({
  setLayout,
  setItemsPerPage,
  itemsPerPage,
  setParsedDataFilter,
  originalData,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')
  const [selectedFilter2, setSelectedFilter2] = useState('')
  const [layoutShape, setLayoutShape] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    let products = [...originalData]

    if (selectedFilter === 'highToLow') {
      products.sort((a, b) => {
        const priceA = parseFloat(a['Discount Price'].replace(/[^0-9.-]+/g, ''))
        const priceB = parseFloat(b['Discount Price'].replace(/[^0-9.-]+/g, ''))
        return priceB - priceA
      })
    } else if (selectedFilter === 'lowToHigh') {
      products.sort((a, b) => {
        const priceA = parseFloat(a['Discount Price'].replace(/[^0-9.-]+/g, ''))
        const priceB = parseFloat(b['Discount Price'].replace(/[^0-9.-]+/g, ''))
        return priceA - priceB
      })
    }

    const filtered = products.filter((item) => {
      const price = extractPriceValue(item['Discount Price'])
      if (minPrice === '' && maxPrice === '') {
        return true // No filter applied, return all items
      } else if (minPrice === '') {
        return price <= parseFloat(maxPrice) // Only maximum price filter applied
      } else if (maxPrice === '') {
        return price >= parseFloat(minPrice) // Only minimum price filter applied
      } else {
        return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice) // Both minimum and maximum price filters applied
      }
    })

    setFilteredProducts(filtered)
  }, [minPrice, maxPrice, selectedFilter])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  const extractPriceValue = (price) => {
    const numericValue = parseFloat(price.replace(/[^\d.]+/g, ''))
    return isNaN(numericValue) ? 0 : numericValue
  }

  const handleFilter = (sortOrder) => {
    setSelectedFilter(sortOrder)
  }

  const handleMaxMin = () => {
    setIsOpen(false)
    setLayout(layoutShape)
    setParsedDataFilter(filteredProducts)
  }

  return (
    <div className="fixed top-5 right-4 z-50">
      <div className="relative inline-block">
        <button
          className="bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={toggleDropdown}
        >
          Filter
        </button>
        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white border border-gray-300 rounded shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter</h2>
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
              </div>
              <div className="product-display ml-0">
                <div className="md:hidden">
                  <div className="flex justify-start mt-4">
                    <button
                      onClick={() => {
                        setLayoutShape(false)
                        setSelectedFilter2('layoutSquare')
                      }}
                      className={`${
                        selectedFilter2 === 'layoutSquare'
                          ? 'bg-gray-800 text-white rounded'
                          : ''
                      }`}
                    >
                      <Squares2X2Icon className="h-10 w-10 mr-1" />
                    </button>
                    <button
                      onClick={() => {
                        setLayoutShape(true)
                        setSelectedFilter2('layoutFunnel')
                      }}
                      className={`${
                        selectedFilter2 === 'layoutFunnel'
                          ? 'bg-gray-800 text-white rounded'
                          : ''
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-10 w-10 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex justify-end mt-4">
                  {/* Render the desktop layout here */}
                </div>
              </div>
              <div className="py-1">
                <button
                  className={`block w-full text-left px-2 py-2 text-gray-800   ${
                    selectedFilter === 'highToLow'
                      ? 'bg-gray-800 text-white rounded'
                      : ''
                  }`}
                  onClick={() => handleFilter('highToLow')}
                >
                  High to Low
                </button>
                <button
                  className={`block w-full text-left px-2 py-2 text-gray-800  ${
                    selectedFilter === 'lowToHigh'
                      ? 'bg-gray-800 text-white rounded'
                      : ''
                  }`}
                  onClick={() => handleFilter('lowToHigh')}
                >
                  Low to High
                </button>
                <div className="flex items-center px-2 py-2">
                  <label htmlFor="items-per-page" className="text-left mr-2">
                    Items per page:
                  </label>
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-gray-800 hover:text-blue"
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                    <option value={60}>60</option>
                  </select>
                </div>
                <div className="flex items-center px-2 py-2">
                  <label htmlFor="min-price" className="text-left mr-2">
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
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleMaxMin}
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
