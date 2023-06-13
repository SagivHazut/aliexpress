import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar'
import Item from './Item'
import Pages from './Pages'
import { SearchItems } from './SearchItems'
import { useNavigate } from 'react-router-dom'

export const Newest = ({ country, setCountry }) => {
  const name = 'Search in SuperDeals...'
  const { page } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [parsedDataFilter, setParsedDataFilter] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [showFilter, setShowFilter] = useState(false)
  const [fetchedPages, setFetchedPages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem('parsedData')
    setParsedData(JSON.parse(storedData))
    fetchData(currentPage, currentPage + 6)
  }, [currentPage, country])

  async function fetchData(startPage, endPage) {
    const storedCountry = localStorage.getItem('country')

    // Check if all the pages have already been fetched
    if (fetchedPages.includes(startPage) && fetchedPages.includes(endPage)) {
      setIsLoading(false)
      return
    }

    try {
      const pageRequests = []
      for (let i = startPage; i <= endPage; i++) {
        // Push the axios request promises for each page
        pageRequests.push(
          axios.get(
            'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
            {
              params: {
                language: storedCountry === 'IL' ? 'he' : 'en',
                currency: 'EUR',
                category_ids: '200000410',
                page_size: '25',
                page_no: i.toString(),
              },
              mode: 'no-cors',
            }
          )
        )
      }

      // Fetch all pages concurrently
      const responses = await Promise.all(pageRequests)

      // Extract the data from each response
      const pageData = responses.map((res) => res.data)

      // Merge the fetched data with the existing data, excluding items with duplicate IDs
      const updatedData = [
        ...parsedData,
        ...pageData.flatMap((newData) =>
          newData.filter(
            (item) =>
              !parsedData.some(
                (existingItem) => existingItem.product_id === item.product_id
              )
          )
        ),
      ]

      setParsedData(updatedData)
      setIsLoading(false)

      // Save the updated data to the local storage
      localStorage.setItem('parsedData', JSON.stringify(updatedData))

      // Add the fetched pages to the fetchedPages array
      const newFetchedPages = []
      for (let i = startPage; i <= endPage; i++) {
        newFetchedPages.push(i)
      }
      setFetchedPages([...fetchedPages, ...newFetchedPages])
    } catch (error) {
      console.log(error)
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.product_title)
  }

  const [itemsPerPage, setItemsPerPage] = useState(25)

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  let filteredItems = []

  if (parsedData) {
    filteredItems = parsedData.filter((item) => {
      return (
        !searchQuery ||
        (item.product_title &&
          item.product_title.toLowerCase &&
          item.product_title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const visibleItems =
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter.slice(firstItemIndex, lastItemIndex)
      : parsedData.slice(firstItemIndex, lastItemIndex)

  const totalPages = 600

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )
  const handlePageClick = (pageNumber) => {
    const startPage = (pageNumber - 1) * 7 + 1
    const endPage = startPage + 6
    setCurrentPage(pageNumber)
    fetchData(startPage, endPage)
    navigate(`/top-products/page/${pageNumber}`)
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1
      setCurrentPage(newPageNumber)
      fetchData()
      navigate(`/top-products/page/${newPageNumber}`)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const newPageNumber = currentPage + 1
      setCurrentPage(newPageNumber)
      fetchData()
      navigate(`/top-products/page/${newPageNumber}`)
    }
  }
  return (
    <>
      <div
        className={`fixed ${
          showFilter ? 'z-50 bg-black opacity-50 inset-0 ' : ''
        }`}
        style={{
          boxShadow: showFilter ? '0px 0px 10px 5px rgba(0, 0, 0, 0.5)' : '',
        }}
      ></div>

      <div>
        <SearchBar
          handleInputChange={handleInputChange}
          items={filteredItems}
          searchQuery={searchQuery}
          handleSuggestionSelect={handleSuggestionSelect}
          name={country === 'IL' ? ' ...חיפוש מבצעים הנבחרים שלנו' : name}
        />
        {filteredItems.length > 0 && searchQuery ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <div>
            <Item
              isLoading={isLoading}
              key={visibleItems.product_id}
              post={visibleItems}
              filteredProducts={parsedData}
              setItemsPerPage={setItemsPerPage}
              itemsPerPage={itemsPerPage}
              parsedData={parsedData}
              setParsedDataFilter={setParsedDataFilter}
              originalData={originalData}
              country={country}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              setCountry={setCountry}
            />
            {filteredItems.length > 10 && (
              <Pages
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
                itemsNumber={
                  parsedDataFilter && parsedDataFilter.length > 0
                    ? parsedDataFilter
                    : parsedData
                }
                firstItemIndex={firstItemIndex}
                itemsPerPage={itemsPerPage}
                country={country}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}
