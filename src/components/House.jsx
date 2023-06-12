import React, { useState } from 'react'
import Item from './Item'
import Pages from './Pages'
import SearchBar from './SearchBar'
import { SearchItems } from './SearchItems'
import { useEffect } from 'react'
import axios from 'axios'

export const House = ({ country, setCountry }) => {
  const name = 'Search in Hot Deals....'
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [parsedDataFilter, setParsedDataFilter] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCountry = localStorage.getItem('country')

    async function fetchData() {
      try {
        const res = await axios.get(
          'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
          {
            params: {
              language: storedCountry === 'IL' ? 'he' : 'en',
              currency: 'EUR',
              category_ids: '5090301',
            },
          }
        )
        const data = res.data
        setParsedData(data)
        setOriginalData(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [country])

  useEffect(() => {
    setOriginalData(parsedData)
  }, [parsedData])

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.product_title)
  }

  const [itemsPerPage, setItemsPerPage] = useState(20)

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
  } else {
  }

  const [currentPage, setCurrentPage] = useState(1)
  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const visibleItems =
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter.slice(firstItemIndex, lastItemIndex)
      : parsedData.slice(firstItemIndex, lastItemIndex)

  const totalPages = Math.ceil(
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter.length / itemsPerPage
      : parsedData.length / itemsPerPage
  )
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handlePageClick = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setCurrentPage(pageNumber)
  }

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
  const [showFilter, setShowFilter] = useState(false)

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
          name={country === 'IL' ? ' ...חיפוש מבצעים החמים שלנו' : name}
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
