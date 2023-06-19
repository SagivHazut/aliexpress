import axios from 'axios'
import React, { useState } from 'react'
import ErrorPopup from './ErrorPopup'
import { useEffect } from 'react'

function SearchBar({ setSearchRes, name, showFilter, setShowFilter }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  async function fetchProductDetails(value) {
    const storedCountry = localStorage.getItem('country')

    try {
      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: '',
            page_size: 50,
            page_no: 1,
            max_sale_price: '7000',
            min_sale_price: '300',
            sort: 'SALE_PRICE_DESC',
            keywords: value,
          },
          mode: 'no-cors',
        }
      )
      if (response.status !== 200) {
        fetchProductDetails()
      } else if (response.status === 200) {
        setSearchRes(response.data)
        return response.data
      } else {
        setError(
          !storedCountry === 'IL'
            ? 'No results found, please try again'
            : `לא נמצאו תוצאות נסה שנית`
        )
      }
    } catch (error) {
      setError(
        storedCountry === 'IL'
          ? `לא נמצאו תוצאות נסה שנית`
          : 'No results found, please try again'
      )
    }
  }
  const handleButtonClick = () => {
    fetchProductDetails(value, [])
      .then((data) => {})
      .catch((error) => {
        console.error(error)
      })
  }

  const handleInputChange = (event) => {
    setValue(event.target.value)
  }
  const handleCloseError = () => {
    setError(null)
    setShowFilter(!showFilter)
  }
  useEffect(() => {
    if (error) {
      setShowFilter(!showFilter)
    }
  }, [error])

  return (
    <>
      {' '}
      {error && <ErrorPopup message={error} onClose={handleCloseError} />}
      <div style={{ alignItems: 'center' }}>
        <input
          type="text"
          placeholder={name}
          value={value}
          onChange={handleInputChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.2s ease-in-out',
            outline: 'none',
            fontSize: '16px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            marginTop: '10px',
          }}
        />
        <button
          onClick={handleButtonClick}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            marginLeft: '8px',
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          Search
        </button>
      </div>
    </>
  )
}

export default SearchBar
