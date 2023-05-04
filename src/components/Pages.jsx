import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pages({
  pageNumbers,
  currentPage,
  handlePageClick,
  setCurrentPage,
  totalPages,
  itemsNumber,
  firstItemIndex,
  itemsPerPage,
}) {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, itemsNumber.length);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-900">
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span>
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

            {pageNumbers.map((pageNumber) => (
              <a
                aria-current="page"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
  );
}
