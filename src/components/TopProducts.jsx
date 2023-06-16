import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar'
import Item from './Item'
import { SearchItems } from './SearchItems'
import LoadingSpinner from './LoadingSpinner' // Replace 'LoadingSpinner' with the actual component name

export const TopProducts = ({ country, setCountry }) => {
  const { page } = useParams()
  const name = 'Search in Hot Deals...'
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [parsedDataFilter, setParsedDataFilter] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false) // New state variable
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const itemsPerPage = 48
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)

  useEffect(() => {
    console.log('Current Page:', currentPage) // Log the current page number
    fetchData()
  }, [currentPage])

  async function fetchData() {
    const storedCountry = localStorage.getItem('country')
    try {
      setIsLoadingMore(true) // Set isLoadingMore to true before making the request
      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            currency: 'EUR',
            category_ids:
              '34,1509,201161809,200003494,200000345,201336907,200003892,5090301,4099,201084002,4003,100001205',
            page_size: 50,
            page_no: currentPage, // Pass the current page number to the API request
            max_sale_price: '70',
          },
        }
      )
      const newData = response.data
      setParsedData((prevData) => [...prevData, ...newData]) // Append new data to the existing data
      setOriginalData((prevData) => [...prevData, ...newData])
      setIsLoading(false)
      setIsLoadingMore(false) // Set isLoadingMore to false after the request is completed
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsLoadingMore(false) // Set isLoadingMore to false in case of an error
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.product_title)
  }

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

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight && !isLoadingMore) {
      // User has scrolled to the bottom and isLoadingMore is false, fetch more data
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const visibleItems =
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter
      : originalData

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
              post={parsedData}
              filteredProducts={parsedData}
              itemsPerPage={itemsPerPage}
              parsedData={parsedData}
              setParsedDataFilter={setParsedDataFilter}
              originalData={originalData}
              country={country}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              setCountry={setCountry}
            />
            {isLoadingMore && <LoadingSpinner />}
          </div>
        )}
      </div>
    </>
  )
}
