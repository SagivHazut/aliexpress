import React, { useState, useEffect } from 'react'
import Item from '../components/Item'
import Papa from 'papaparse'
import csvData from '../csv/Banggood.csv'
import '../css/button.css'

export const Banggood = () => {
  const [parsedData, setParsedData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const itemsPerPage = 'as'
  const [showFilter, setShowFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error)
      }
    }
    fetchData()
  }, [])

  const Loading = () => {
    return (
      <div className="lg:col-span-3">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-100 rounded-2xl h-64"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
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
      {isLoading && <Loading />}
    </>
  )
}
