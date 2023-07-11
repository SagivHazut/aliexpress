<<<<<<< HEAD
import axios from 'axios'
import React, { useState } from 'react'
import ErrorPopup from './ErrorPopup'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function SearchBar() {
  const name = 'Search...'
  const [showFilter, setShowFilter] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('LAST_VOLUME_DESC')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function fetchProductDetails(value) {
    const storedCountry = localStorage.getItem('country')

    try {
      setLoading(true) // Start loading

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

        if (window.location.pathname !== '/SearchItems') {
          navigate('/SearchItems')
        }

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

  const handleButtonClick = () => {
    fetchProductDetails(value)
      .then((data) => {})
      .catch((error) => {
        console.error(error)
      })
  }

  const handleInputChange = (event) => {
    localStorage.setItem('value', event.target.value)

    setValue(event.target.value)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchProductDetails(value)
        .then((data) => {})
        .catch((error) => {
          console.error(error)
        })
    }
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
      <>
        {error && <ErrorPopup message={error} onClose={handleCloseError} />}
        <div style={{ alignItems: 'center' }}>
          <input
            type="text"
            placeholder={name}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
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
            {loading ? 'Searching' : 'Search'}
          </button>
        </div>
      </>
    </>
  )
}

export default SearchBar
=======
import React, { useEffect, useState } from "react";

function SearchBar(props) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const filteredSuggestions = props.items.filter((item) =>
      item.title.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 7)); // Slice the suggestions to a maximum of 7
  }, [props.items, props.searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    props.handleSuggestionSelect(suggestion);
  };
  return (
    <>
      <input
        type="text"
        placeholder={props.name}
        value={props.searchQuery}
        onChange={props.handleInputChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.2s ease-in-out",
          outline: "none",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      />

      {props.searchQuery &&
        suggestions.length > 0 &&
        !props.showSearchQuery && (
          <ul
            style={{
              listStyle: "none",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.2s ease-in-out",
              fontSize: "16px",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              marginTop: "10px",
              backgroundColor: "#fff",
            }}
          >
            {suggestions.map((item) => (
              <>
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                  {props.searchQuery && suggestions.length > 1 && (
                    <div class="flex justify-center">
                      <hr class="border-1 border-gray-300 my-2 w-40 mx-auto" />
                    </div>
                  )}
                </li>
              </>
            ))}
          </ul>
        )}
      <button onClick={props.handleClick}>search</button>
    </>
  );
}

export default SearchBar;
>>>>>>> 4ba7360d73367df0777a54ff2e481520bb6eaef9
