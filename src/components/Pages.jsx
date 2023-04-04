import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pages({
  pageNumbers,
  currentPage,
  handlePageClick,
  setCurrentPage,
  totalPages,
  itemsNumber,
  firstItemIndex,
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
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {/* <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a> */}
        <div></div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstItemIndex}</span> to{' '}
            <span className="font-medium">
              {Math.floor(itemsNumber.length / currentPage)}
            </span>{' '}
            of <span className="font-medium">{itemsNumber.length}</span> results
          </p>
        </div>
        <div>
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
              >
                <ChevronLeftIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  onClick={handlePreviousClick}
                  disabled={currentPage === 1}
                ></ChevronLeftIcon>
              </a>
            )}

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumbers.map((pageNumber) => (
              <a
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </a>
            ))}
            {currentPage === totalPages ? (
              <></>
            ) : (
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                ></ChevronRightIcon>
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
