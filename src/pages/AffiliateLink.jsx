import React, { useState } from 'react'
import axios from 'axios'

export const AffiliateLink = () => {
  const [productUrl, setProductUrl] = useState('')
  const [error, setError] = useState(null)

  const [parsedData, setParsedData] = useState([])

  async function fetchData() {
    const storedCountry = localStorage.getItem('country')
    try {
      const response = await axios.get(
        'https://3nbe6jbrg0.execute-api.us-east-1.amazonaws.com/promo-link-shop',
        {
          params: {
            link: productUrl,
          },
          mode: 'no-cors',
        }
      )

      const newData = response.data
      if (response.status !== 200) {
        setParsedData('No discount available')
      } else {
        setParsedData(newData)
      }
    } catch (error) {
      setError(
        storedCountry === 'IL'
          ? 'לפעמים צריך רק רענון קטן בשביל שזה יעבוד '
          : " Often, a slight refresh is all that's needed to optimize its performance"
      )
    }
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
        onClick={fetchData}
        className="px-6 py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Check
      </button>

      {parsedData && (
        <div className="mt-4">
          <p className="text-blue-500 font-bold">Discount Link:</p>
          <a
            href={parsedData}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {parsedData}
          </a>
        </div>
      )}
    </div>
  )
}
