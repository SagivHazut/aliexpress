import React, { useState } from 'react'
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

export const Filters = ({
  filterProducts,
  setLayout,
  setItemsPerPage,
  itemsPerPage,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleFilter = (sortOrder) => {
    filterProducts(sortOrder)
    setIsOpen(false)
  }
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  return (
    <div className="fixed top-5 right-4 z-50">
      <div className="relative inline-block">
        <button
          className="bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={toggleDropdown}
        >
          <ChevronDownIcon className="w-4 h-4 mr-2" />
          Filter
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <div className="product-display ml-3">
              <div className="md:hidden ">
                <div className="flex justify-start mt-4 ">
                  <button onClick={() => setLayout(false)}>
                    <Squares2X2Icon className="h-10 w-10" aria-hidden="true" />
                  </button>
                  <button onClick={() => setLayout(true)}>
                    <FunnelIcon className="h-10 w-10" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="hidden md:flex justify-end mt-4">
                {/* Render the desktop layout here */}
              </div>
            </div>
            <div className="py-1">
              <button
                className="block w-full text-left px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                onClick={() => handleFilter('highToLow')}
              >
                High to Low
              </button>
              <button
                className="block w-full text-left px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                onClick={() => handleFilter('lowToHigh')}
              >
                Low to High
              </button>
              <div>
                <label
                  htmlFor="items-per-page"
                  className="w-full text-left px-2 py-2 "
                >
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
