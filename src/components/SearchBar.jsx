import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import ErrorPopup from './ErrorPopup'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../css/button.css'
import Papa from 'papaparse'
import csvData from '../csv/Banggood.csv'
import { updateSearchResults } from '../store/actions'

function SearchBar({ setLoading, showInput }) {
  const name = 'Search...'
  const [showFilter, setShowFilter] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [sorting, setSorting] = useState('LAST_VOLUME_DESC')
  const [banggood, setBanggood] = useState([])
  const [filteredBanggood, setFilteredBanggood] = useState([])
  const [aliexpressData, setAliexpressData] = useState([])
  const [combinedData, setCombinedData] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const data2 = filteredBanggood.map((item) => {
    const discountedPrice = Math.floor(item.oldprice * (1 - item.price / 100))

    return {
      product_main_image_url: item.picture,
      original_price: item.oldprice,
      sale_price: item.price,
      product_title: item.name,
      product_id: item.id,
      promotion_link: item.url,
      discount: `$${discountedPrice}`,
      name: 'Banggood',
    }
  })
  useEffect(() => {
    if (showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get('')
    if (queryValue) {
      setValue(queryValue)
      fetchProductDetails(queryValue)
    }
  }, [location])

  async function fetchProductDetails(value) {
    const storedCountry = localStorage.getItem('country')

    try {
      setLoading(true)

      const responseAliexpress = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: '',
            page_size: 50,
            page_no: 1,
            max_sale_price: '1000',
            min_sale_price: '',
            sort: sorting,
            keywords: value,
          },
          mode: 'no-cors',
        }
      )

      setLoading(false)

      if (responseAliexpress.status === 200) {
        const aliexpressData = responseAliexpress.data.map((item) => ({
          ...item,
          name: 'aliexpress',
        }))

        const responseBanggood = await fetch(csvData)
        const csvBanggood = await responseBanggood.text()
        const parsedCsvBanggood = Papa.parse(csvBanggood, {
          header: true,
          skipEmptyLines: true,
        })
        const filteredDataBanggood = parsedCsvBanggood.data.filter((item) =>
          Object.values(item).some((value) => value !== '')
        )

        setBanggood(filteredDataBanggood)
        setFilteredBanggood(filteredDataBanggood)

        const combinedData = [...aliexpressData, ...data2]
        setAliexpressData(aliexpressData)
        setCombinedData(combinedData)

        dispatch(updateSearchResults(combinedData))

        localStorage.setItem('searchQuery', value)
        return aliexpressData
      } else {
        setSorting('SALE_PRICE_ASC')
        setError(
          !storedCountry === 'IL'
            ? 'No results found, please try again'
            : `לא נמצאו תוצאות נסה שנית`
        )
        return null
      }
    } catch (error) {
      setLoading(false)
      setSorting('SALE_PRICE_ASC')

      setError(
        storedCountry === 'IL'
          ? `לא נמצאו תוצאות נסה שנית`
          : 'No results found, please try again'
      )
      return null
    }
  }

  const filterBanggood = (searchValue) => {
    const filteredData = banggood.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(searchValue)
      )
    )
    setFilteredBanggood(filteredData)
    dispatch(updateSearchResults(filteredData))
  }

  const handleInputChange = (event) => {
    setValue(event.target.value.toLowerCase())
  }

  const handleInputKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const searchValue = value.trim()
      setValue(searchValue)

      if (searchValue !== '') {
        try {
          await fetchProductDetails(searchValue)

          if (window.location.pathname.includes('SearchItems')) {
            const filteredData = filterBanggood(searchValue)
            dispatch(updateSearchResults(filteredData))
          }

          navigate('/SearchItems?=' + encodeURIComponent(searchValue))
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const handleCloseError = () => {
    setError(null)
    setShowFilter(!showFilter)
    fetchProductDetails(value)
  }

  useEffect(() => {
    if (error) {
      setShowFilter(!showFilter)
    }
  }, [error])

  const handleCloseButton = () => {
    setError(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData)
        const csv = await response.text()
        const parsedCsv = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        })
        const filteredData = parsedCsv.data.filter((item) =>
          Object.values(item).some((value) => value !== '')
        )
        setBanggood(filteredData)
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="errormsg">
        {error && (
          <ErrorPopup
            message={error}
            onClose={handleCloseError}
            handleCloseButton={handleCloseButton}
          />
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        className={`input-search ${
          showInput ? 'input-search-visible' : 'input-search-hidden'
        }`}
        placeholder={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </>
  )
}

export default SearchBar
