import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Item from '../components/Item'
import { useSelector } from 'react-redux'
import ErrorPopup from '../components/ErrorPopup'
import _ from 'lodash'

export const Products = ({ setSearchRes, searchRes }) => {
  const { category_ids } = useSelector((state) => state)
  const { page } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [maxPrice1, setMaxPrice1] = useState('')
  const [prevNumber, setPrevNumber] = useState(0)
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false)
  const [reachedBottom, setReachedBottom] = useState(false)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    if (parsedData) {
      setError(false)
    }
  }, [parsedData])

  async function fetchData(page) {
    const storedCountry = localStorage.getItem('country')

    const generateRandomNumber = () => {
      const min = 1000
      const max = 10000
      const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min
      return newRandomNumber.toString()
    }

    let finalMaxPrice = maxPrice1.toString()

    if (!finalMaxPrice) {
      finalMaxPrice = generateRandomNumber()
    } else if (!isNaN(maxPrice1)) {
      finalMaxPrice = maxPrice1.padEnd(maxPrice1.length + 2, '0')
    }

    try {
      setIsLoadingMore(true)

      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: category_ids ? category_ids : '6',
            page_size: 50,
            page_no: page ? page : 1,
            max_sale_price: finalMaxPrice,
            sort: 'LAST_VOLUME_DESC',
          },
          mode: 'no-cors',
        }
      )

      const newData = response.data.map((item) => ({
        ...item,
        name: 'aliexpress',
      }))

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
      setError(
        storedCountry === 'IL'
          ? 'לפעמים צריך רק רענון קטן בשביל שזה יעבוד'
          : "Often, a slight refresh is all that's needed to optimize its performance"
      )
      setIsLoading(true)
      setIsLoadingMore(true)
    }
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const handleCloseError = () => {
    setError(null)
    setShowFilter(false)
    fetchData()
  }

  const handleCloseButton = () => {
    setError(null)
  }

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
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
    }
    setReachedBottom(false)
  }
  const throttledHandleScroll = _.throttle(handleScroll, 3000)

  const visibleItems =
    originalData && originalData.length > 0 ? originalData : parsedData

  return (
    <>
      <div>
        {error && (
          <ErrorPopup
            message={error}
            onClose={handleCloseError}
            handleCloseButton={handleCloseButton}
          />
        )}
      </div>

      <div
        className={`fixed ${
          showFilter ? 'z-50 bg-black opacity-50 inset-0 ' : ''
        }`}
        style={{
          boxShadow: showFilter ? '0px 0px 10px 5px rgba(0, 0, 0, 0.5)' : '',
        }}
      ></div>
      <div>
        <Item
          isLoading={isLoading}
          post={visibleItems}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          setMaxPrice1={setMaxPrice1}
          isLoadingMore={isLoadingMore}
          handleInputChange={handleInputChange}
          searchQuery={searchQuery}
          searchRes={searchRes}
          setSearchRes={setSearchRes}
        />
      </div>
    </>
  )
}
