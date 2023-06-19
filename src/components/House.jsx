import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar'
import Item from './Item'
import { SearchItems } from './SearchItems'
import LoadingSpinner from './LoadingSpinner'

export const House = ({ country, setCountry, setSearchRes, searchRes }) => {
  const name = 'Search in Home section......'
  const { page } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const itemsPerPage = 48
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [maxPrice1, setMaxPrice1] = useState('')
  const [prevNumber, setPrevNumber] = useState(0)
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false)
  const [reachedBottom, setReachedBottom] = useState(false)

  useEffect(() => {
    if (!initialFetchCompleted) {
      fetchData(currentPage)
      setInitialFetchCompleted(true)
    } else {
      if (maxPrice1 !== prevNumber) {
        setOriginalData([])
        fetchData(currentPage)
      }
    }
    setPrevNumber(maxPrice1)
  }, [currentPage, maxPrice1, initialFetchCompleted])

  async function fetchData(page) {
    const storedCountry = localStorage.getItem('country')
    try {
      setIsLoadingMore(true)

      let finalMaxPrice = maxPrice1.toString()

      if (!isNaN(maxPrice1) && maxPrice1) {
        finalMaxPrice = maxPrice1.padEnd(maxPrice1.length + 2, '0')
      }
      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: '',
            page_size: 50,
            page_no: page ? page : 1,
            max_sale_price: finalMaxPrice ? finalMaxPrice : '70',
            min_sale_price: '300',
            sort: 'SALE_PRICE_DESC',
            keywords: 'phone',
          },
          mode: 'no-cors',
        }
      )

      const newData = response.data
      if (response.status === 500) {
        fetchData(page)
      }
      if (maxPrice1) {
        setOriginalData((prevData) => [
          ...prevData,
          ...originalData,
          ...newData,
        ])
      } else {
        setParsedData((prevData) => [...prevData, ...newData])
      }

      setIsLoading(false)
      setIsLoadingMore(false)
    } catch (error) {
      setIsLoading(true)
      setIsLoadingMore(true)
    }
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [maxPrice1])

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    if (scrollTop + clientHeight >= scrollHeight && !reachedBottom) {
      setReachedBottom(true)
      if (maxPrice1) {
        setMaxPrice1((prevMaxPrice1) => {
          const updatedMaxPrice1 = String(parseInt(prevMaxPrice1) - 1)
          fetchData()
          return updatedMaxPrice1
        })
      } else {
        setCurrentPage((prevPage) => {
          const nextPage = prevPage + 1
          fetchData(nextPage)
          return nextPage
        })
      }
      setReachedBottom(false)
    }
  }

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
          setSearchRes={setSearchRes}
          searchQuery={searchQuery}
          country={country}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          name={country === 'IL' ? ' ...חיפוש בקטגוריית בית' : name}
        />
        {searchRes.length > 0 && searchRes ? (
          <div>
            <SearchItems key={searchRes.id} post={searchRes} />
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
              originalData={originalData}
              country={country}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              setCountry={setCountry}
              setMaxPrice1={setMaxPrice1}
              isLoadingMore={isLoadingMore}
              handleInputChange={handleInputChange}
              searchQuery={searchQuery}
              name={country === 'IL' ? ' ...חיפוש בקטגוריית בית' : name}
              searchRes={searchRes}
              setSearchRes={setSearchRes}
            />
          </div>
        )}
      </div>
    </>
  )
}
