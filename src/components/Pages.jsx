import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import Popup from './Popup'

export default function Pages({
  pageNumbers,
  currentPage,
  handlePageClick,
  setCurrentPage,
  totalPages,
  itemsNumber,
  itemsPerPage,
  country,
}) {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, itemsNumber.length)

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers
    }

    if (currentPage <= 4) {
      return [
        ...pageNumbers.slice(0, 7),
        <span
          key="ellipsis"
          className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer"
          onClick={() => handlePageClick(8)}
        >
          ...
        </span>,
      ]
    }

    if (currentPage >= totalPages - 3) {
      return [
        <span
          key="ellipsis"
          className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer"
          onClick={() => handlePageClick(totalPages - 6)}
        >
          ...
        </span>,
        ...pageNumbers.slice(totalPages - 7),
      ]
    }

    return [
      <span
        key="ellipsis1"
        className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer"
        onClick={() => handlePageClick(currentPage - 2)}
      >
        ...
      </span>,
      ...pageNumbers.slice(currentPage - 4, currentPage + 1),
      <span
        key="ellipsis2"
        className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer"
        onClick={() => handlePageClick(currentPage + 3)}
      >
        ...
      </span>,
    ]
  }
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setIsVisible(scrollTop > 300) // Show the button when scrolling down 300px or more
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Enable smooth scrolling
    })
  }

  // Add event listener to handle scrolling and show/hide the button
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Popup />
      <button
        onClick={scrollToTop}
        id="scrollButton"
        title="Go to top"
        style={{ display: isVisible ? 'block' : 'none' }}
        className="fixed bottom-28 right-4 z-10 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition-all"
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex justify-center items-center mb-3 sm:mb-0">
            <p className="text-sm text-gray-900">
              {country === 'IL' ? ' מעמוד ' : 'Showing '}
              <span className="font-medium">{startIndex}</span>{' '}
              {country === 'IL' ? ' עד ' : 'to  '}
              <span className="font-medium">{endIndex}</span>
              {country === 'IL' ? ' מתוך ' : ' of '}
              <span className="font-medium">{itemsNumber.length}</span>{' '}
              {country === 'IL' ? 'עמודים' : 'results'}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {currentPage === 1 ? (
                <></>
              ) : (
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={handlePreviousClick}
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              )}

              {getPageNumbers().map((pageNumber, index) =>
                typeof pageNumber === 'number' ? (
                  <a
                    key={index}
                    aria-current="page"
                    className={` scroll-to-top-button relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      pageNumber === currentPage ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                ) : (
                  pageNumber
                )
              )}

              {currentPage === totalPages ? (
                <></>
              ) : (
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={handleNextClick}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
