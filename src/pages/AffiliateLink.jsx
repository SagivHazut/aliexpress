import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ErrorPopup from '../components/ErrorPopup'
import _ from 'lodash'
import Item from '../components/Item'

export const AffiliateLink = ({ setSearchRes, searchRes }) => {
  const [productUrl, setProductUrl] = useState('')
  const [discountInfo, setDiscountInfo] = useState(null)
  const [items, setItems] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [parsedData, setParsedData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const checkDiscount = () => {
    fetch(`YOUR_API_ENDPOINT?url=${encodeURIComponent(productUrl)}`)
      .then((response) => response.json())
      .then((data) => {
        setDiscountInfo(data)
      })
      .catch((error) => {
        console.error('Error checking discount:', error)
      })
  }
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-5">Check for Discount</h1>
      <div className="mb-3 AffiliateLink">
        <p>
          To check if there's any discount for an AliExpress item, follow these
          steps:
        </p>
        <ol className="list-decimal list-inside ml-6 space-y-2">
          <li>
            Open your web browser and go to the AliExpress website
            (www.aliexpress.com).
          </li>
          <li>
            Search for the product you are interested in by entering relevant
            keywords in the search bar on the AliExpress website. Browse through
            the search results and find the specific product you want to check
            for discounts.
          </li>
          <li>
            Once you find the product you want to check, click on the product's
            title or image to access its detailed product page.
          </li>
          <li>
            Now, you should see the product's URL in the address bar of your web
            browser. Select the entire URL and copy it to your clipboard.
          </li>
          <li>
            After copying the product URL, come back to this page and paste the
            URL into the input box below.
          </li>
          <li>
            Click on the "Check" button to start checking if there are any
            discounts available for the product.
          </li>
        </ol>
      </div>
      <input
        type="text"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
        placeholder="Paste product URL here"
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={checkDiscount}
        className="px-6 py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Check
      </button>
      {discountInfo && (
        <div className="mt-5">
          <p>Discount: {discountInfo.discount * 100}%</p>
          <p>Discounted Price: {discountInfo.discountedPrice} USD</p>
        </div>
      )}
      {items && (
        <Item
          isLoading={isLoading}
          post={parsedData}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          isLoadingMore={isLoadingMore}
          handleInputChange={handleInputChange}
          searchQuery={searchQuery}
          searchRes={searchRes}
          setSearchRes={setSearchRes}
        />
      )}
    </div>
  )
}
