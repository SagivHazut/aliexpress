import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar'
import Item from './Item'
import { SearchItems } from './SearchItems'
import LoadingSpinner from './LoadingSpinner'

export const TopProducts = ({ country, setCountry }) => {
  const { page } = useParams()
  const name = 'Search in Hot Deals...'
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [parsedDataFilter, setParsedDataFilter] = useState('')
  const [parsedDataFilterChanger, setParsedDataFilterChanger] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const itemsPerPage = 48
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [maxPrice1, setMaxPrice1] = useState('')
  const [prevNumber, setPrevNumber] = useState(0)

  useEffect(() => {
    fetchData()
    if (
      maxPrice1 !== prevNumber ||
      parsedDataFilter !== parsedDataFilterChanger
    ) {
      setOriginalData('')
      fetchData()
    }
    setPrevNumber(maxPrice1)
    setParsedDataFilterChanger(parsedDataFilter)
  }, [currentPage, parsedDataFilter, maxPrice1])

  async function fetchData() {
    const storedCountry = localStorage.getItem('country')
    try {
      setIsLoadingMore(true)

      let finalMaxPrice = maxPrice1.toString()

      if (maxPrice1) {
        finalMaxPrice = maxPrice1.padEnd(maxPrice1.length + 2, '0')
      }

      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            currency: 'EUR',
            category_ids:
              '34,1509,201161809,200003494,200000345,201336907,200003892,5090301,4099,201084002,4003,100001205',
            page_size: 50,
            page_no: currentPage,
            max_sale_price: finalMaxPrice ? finalMaxPrice : '70',
            min_sale_price: '300',
            sort: parsedDataFilter ? parsedDataFilter : 'None',
          },
          mode: 'no-cors',
        }
      )
      const newData = response.data
      if (parsedDataFilter || maxPrice1) {
        setOriginalData((prevData) => [...prevData, ...newData])
      } else {
        setParsedData((prevData) => [...prevData, ...newData])
      }
      setIsLoading(false)
      setIsLoadingMore(false)
    } catch (error) {
      setIsLoading(false)
      setIsLoadingMore(false)
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
    originalData && originalData.length > 0 ? originalData : parsedData

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
              itemsPerPage={itemsPerPage}
              parsedData={parsedData}
              setParsedDataFilter={setParsedDataFilter}
              originalData={originalData}
              country={country}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              setCountry={setCountry}
              setMaxPrice1={setMaxPrice1}
            />
            {isLoadingMore && <LoadingSpinner />}
          </div>
        )}
      </div>
    </>
  )
}
