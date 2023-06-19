import React, { useState } from 'react'
import Item from './Item'
import Pages from './Pages'
import SearchBar from './SearchBar'
import { SearchItems } from './SearchItems'
import Papa from 'papaparse'
import csvData from '../csv/Recommendation.csv'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Recommendation = ({ country, setCountry }) => {
  const location = useLocation()
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])

  const data2 = parsedData.map((item) => ({
    original_price_currency: item['Origin Price'],
    product_main_image_url: item['Image Url'],
    original_price: item['Origin Price'],
    sale_price: item['Discount Price'],
    lastest_volume: item['Sales180Day'],
    product_title: item['Product Desc'],
    discount: item['Discount'],
    product_id: item['ProductId'],
    promotion_link: item['Promotion Url'],
  }))

  useEffect(() => {
    setOriginalData(data2)
  }, [data2])

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

  const itemsPerPage = 'as'
  const [showFilter, setShowFilter] = useState(false)
  return (
    <>
      <div>
        <>
          <Item
            key={data2.id}
            post={data2}
            filteredProducts={parsedData}
            parsedData={parsedData}
            originalData={originalData}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            itemsPerPage={itemsPerPage}
          />
        </>
      </div>
    </>
  )
}
