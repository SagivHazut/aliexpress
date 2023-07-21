import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import ErrorPopup from './ErrorPopup'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../css/button.css'

function SearchBar({ setLoading, showInput }) {
  const name = 'Search...'
  const [showFilter, setShowFilter] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [sorting, setSorting] = useState('LAST_VOLUME_DESC')
  const inputRef = useRef(null)

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

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

      const response = await axios.get(
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

      const newData = response.data.map((item) => ({
        ...item,
        name: 'aliexpress',
      }))
      setLoading(false)

      if (response.status === 200) {
        dispatch({ type: 'UPDATE_SEARCH_RES', payload: { searchRes: newData } })

        localStorage.setItem('searchQuery', value)

        return newData
      } else {
        setSorting('SALE_PRICE_ASC')
        setError(
          !storedCountry === 'IL'
            ? 'No results found, please try again'
            : `לא נמצאו תוצאות נסה שנית`
        )
      }
    } catch (error) {
      setLoading(false)
      setSorting('SALE_PRICE_ASC')

      setError(
        storedCountry === 'IL'
          ? `לא נמצאו תוצאות נסה שנית`
          : 'No results found, please try again'
      )
    }
  }

  const handleInputChange = (event) => {
    setValue(event.target.value)
  }

  // const handleButtonClick = () => {
  //   fetchProductDetails(value)
  //     .then((data) => {})
  //     .catch((error) => {
  //       console.error(error)
  //     })

  //   navigate('/SearchItems?=' + encodeURIComponent(value))
  // }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchProductDetails(value)
        .then((data) => {})
        .catch((error) => {
          console.error(error)
        })

      navigate('/SearchItems?=' + encodeURIComponent(value))
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
      {/* <button onClick={handleButtonClick}>
        <span>Search</span>
      </button> */}
    </>
  )
}

export default SearchBar
