import React, { useState } from 'react'
import Item from '../components/Item'
import Papa from 'papaparse'
import csvData from '../csv/Banggood.csv'
import { useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

export const Banggood = () => {
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const itemsPerPage = 'as'
  const [showFilter, setShowFilter] = useState(false)

  const data2 = parsedData.map((item) => {
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
        {!parsedData && <LoadingSpinner />}
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
