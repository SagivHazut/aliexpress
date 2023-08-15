import React, { useState } from 'react'
import Item from '../components/Item'
import Papa from 'papaparse'
import csvData from '../csv/Recommendation.csv'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Recommendation = () => {
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const itemsPerPage = 'as'
  const [showFilter, setShowFilter] = useState(false)

  const data2 = parsedData.map((item) => ({
    original_price_currency: item['Origin Price'].replace('USD', ''),
    product_main_image_url: item['Image Url'],
    original_price: item['Origin Price'].replace('USD', ''),
    sale_price: item['Discount Price'].replace('USD', ''),
    lastest_volume: item['Sales180Day'],
    product_title: item['Product Desc'],
    discount: item['Discount'],
    product_id: item['ProductId'],
    promotion_link: item['Promotion Url'],
    evaluate_rate: item['Positive Feedback'],
    name: 'aliexpress',
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
