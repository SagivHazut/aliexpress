import React, { useState } from 'react'
import Item from './Item'
import Pages from './Pages'
import SearchBar from './SearchBar'
import { SearchItems } from './SearchItems'
import Papa from 'papaparse'
import csvData from '../csv/Women.csv'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Women = ({ country, setCountry }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const name = 'Search in Women section....'

  const navigate = useNavigate()
  const location = useLocation()
  const [parsedData, setParsedData] = useState([])
  const [parsedDataFilter, setParsedDataFilter] = useState([])
  const [originalData, setOriginalData] = useState([])

  useEffect(() => {
    // setParsedDataFilter(parsedData)
    setOriginalData(parsedData)
  }, [parsedData])

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
        setParsedData(filteredData)
        setOriginalData(filteredData)
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('search')
    setSearchQuery(query || '')
  }, [location.search])

  const [itemsPerPage, setItemsPerPage] = useState(20)

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredItems = parsedData.filter((item) => {
    return (
      !searchQuery ||
      (item['Product Desc'] &&
        item['Product Desc'].toLowerCase &&
        item['Product Desc'].toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const shuffledPost = [...parsedData]
  shuffledPost.sort(() => Math.random() - 0.5)

  const [currentPage, setCurrentPage] = useState(1)
  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const visibleItems =
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter.slice(firstItemIndex, lastItemIndex)
      : shuffledPost.slice(firstItemIndex, lastItemIndex)

  const totalPages = Math.ceil(
    parsedDataFilter && parsedDataFilter.length > 0
      ? parsedDataFilter.length
      : shuffledPost.length / itemsPerPage
  )
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handlePageClick = (pageNumber) => {
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

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion['Product Desc'])
    const queryParams = new URLSearchParams()
    queryParams.set('search', suggestion['Product Desc'])
    navigate(`?${queryParams.toString()}`)
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
          name={country === 'IL' ? ' ...חיפוש בקטגוריית נשים ' : name}
        />
        {filteredItems.length > 0 && searchQuery ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <>
            <Item
              key={visibleItems.id}
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
                    : shuffledPost
                }
                firstItemIndex={firstItemIndex}
                itemsPerPage={itemsPerPage}
                country={country}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
